import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { assertHasUpdatableFields } from 'src/common/utils/assert-has-updatable-fields';
import { UserEntity } from '../user/entities/user.entity';
import { CreateStoreDto } from './dtos/CreateStore.dto';
import { UpdateStoreDto } from './dtos/UpdateStore.dto';
import { StoreEntity } from './entities/store.entity';
import { StoreRepository } from './repositories/store.repository';
import { STORE_REPOSITORY } from './repositories/store.repository.token';

@Injectable()
export class StoreService {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: StoreRepository,
  ) {}

  public findAll(): Promise<StoreEntity[]> {
    return this.storeRepository.find();
  }

  public findMyStore(sub: string): Promise<StoreEntity> {
    return this.getStoreByUserId(sub);
  }

  public findOne(id: string): Promise<StoreEntity> {
    return this.getStoreById(id);
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

  private async getStoreByUserId(sub: string): Promise<StoreEntity> {
    const storeEntity = await this.storeRepository.findOneByUserId(sub);
    if (!storeEntity) {
      throw new NotFoundException('Store not found for this user');
    }
    return storeEntity;
  }

  private async getStoreById(id: string): Promise<StoreEntity> {
    const storeEntity = await this.storeRepository.findOneById(id);
    if (!storeEntity) throw new NotFoundException('Store not found');
    return storeEntity;
  }
}
