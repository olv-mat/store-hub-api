import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { assertHasUpdatableFields } from 'src/common/utils/assert-has-updatable-fields';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateStoreDto } from './dtos/CreateStore.dto';
import { UpdateStoreDto } from './dtos/UpdateStore.dto';
import { StoreEntity } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
  ) {}

  public findAll(): Promise<StoreEntity[]> {
    return this.storeRepository.find();
  }

  public findOne(id: string, relations: string[] = []): Promise<StoreEntity> {
    return this.getById(id, relations);
  }

  public create(dto: CreateStoreDto): Promise<StoreEntity> {
    return this.storeRepository.save({
      ...dto,
      owner: { id: dto.owner } as UserEntity,
    });
  }

  public async update(id: string, dto: UpdateStoreDto): Promise<void> {
    assertHasUpdatableFields(dto);
    await this.storeRepository.update(id, dto);
  }

  public hasAvailableSlots(
    storeEntity: StoreEntity,
    currentUsage: number,
  ): void {
    if (currentUsage >= storeEntity.productSlots) {
      throw new BadRequestException('No available product slots');
    }
  }

  private async getById(
    id: string,
    relations: string[] = [],
  ): Promise<StoreEntity> {
    const storeEntity = await this.storeRepository.findOne({
      where: { id: id },
      relations,
    });
    if (!storeEntity) throw new NotFoundException('Store not found');
    return storeEntity;
  }
}
