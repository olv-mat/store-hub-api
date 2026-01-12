import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreEntity } from '../entities/store.entity';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreTypeOrmRepository extends StoreRepository {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly repository: Repository<StoreEntity>,
  ) {
    super();
  }

  public find(): Promise<StoreEntity[]> {
    return this.repository.find();
  }

  public findById(id: string): Promise<StoreEntity | null> {
    return this.repository.findOneBy({ id: id });
  }

  public save(partial: Partial<StoreEntity>): Promise<StoreEntity> {
    return this.repository.save(partial);
  }
}
