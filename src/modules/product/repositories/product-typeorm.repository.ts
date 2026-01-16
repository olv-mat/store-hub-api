import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductTypeOrmRepository extends ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {
    super();
  }

  public find(): Promise<ProductEntity[]> {
    return this.repository.find();
  }

  public findById(id: string): Promise<ProductEntity | null> {
    return this.repository.findOneBy({ id: id });
  }

  public save(partial: Partial<ProductEntity>): Promise<ProductEntity> {
    return this.repository.save(partial);
  }
}
