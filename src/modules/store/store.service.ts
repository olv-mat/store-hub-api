import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    return this.storeRepository.findAll();
  }

  public findOne(id: string): Promise<StoreEntity> {
    return this.getStoreById(id);
  }

  private async getStoreById(id: string): Promise<StoreEntity> {
    const storeEntity = await this.storeRepository.findById(id);
    if (!storeEntity) throw new NotFoundException('Store not found');
    return storeEntity;
  }
}
