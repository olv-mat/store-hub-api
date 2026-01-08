import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  public findOne(id: string): Promise<StoreEntity> {
    return this.getStoreById(id);
  }

  private async getStoreById(id: string): Promise<StoreEntity> {
    const storeEntity = await this.storeRepository.findOneBy({ id: id });
    if (!storeEntity) throw new NotFoundException('Store not found');
    return storeEntity;
  }
}
