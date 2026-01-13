import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
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
    private readonly userService: UserService,
  ) {}

  public findAll(): Promise<StoreEntity[]> {
    return this.storeRepository.find();
  }

  public findOne(id: string): Promise<StoreEntity> {
    return this.getStoreById(id);
  }

  public async create(dto: CreateStoreDto): Promise<StoreEntity> {
    const userEntity = await this.userService.findOne(dto.ownerId);
    return this.storeRepository.save({
      ...dto,
      owner: userEntity,
    });
  }

  public async delete(id: string): Promise<void> {
    const storeEntity = await this.getStoreById(id);
    await this.storeRepository.delete(storeEntity.id);
  }

  public async update(id: string, dto: UpdateStoreDto): Promise<void> {
    const storeEntity = await this.getStoreById(id);
    await this.storeRepository.update(storeEntity.id, dto);
  }

  private async getStoreById(id: string): Promise<StoreEntity> {
    const storeEntity = await this.storeRepository.findById(id);
    if (!storeEntity) throw new NotFoundException('Store not found');
    return storeEntity;
  }
}
