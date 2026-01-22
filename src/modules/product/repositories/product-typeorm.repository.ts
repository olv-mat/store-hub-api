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

  public findOneById(id: string): Promise<ProductEntity | null> {
    return this.repository.findOneBy({ id: id });
  }

  public findOneByStoreId(
    storeId: string,
    productId: string,
  ): Promise<ProductEntity | null> {
    return this.repository.findOne({
      where: { store: { id: storeId }, id: productId },
    });
  }

  public save(partial: Partial<ProductEntity>): Promise<ProductEntity> {
    return this.repository.save(partial);
  }

  public async update(
    id: string,
    partial: Partial<ProductEntity>,
  ): Promise<void> {
    await this.repository.update(id, partial);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
