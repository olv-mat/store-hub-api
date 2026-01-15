import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { PRODUCT_REPOSITORY } from './repositories/product.repository.token';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  public find(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }
}
