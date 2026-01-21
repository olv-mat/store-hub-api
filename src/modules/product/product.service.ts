import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { assertHasUpdatableFields } from 'src/common/utils/assert-has-updatable-fields';
import { StoreEntity } from '../store/entities/store.entity';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { PRODUCT_REPOSITORY } from './repositories/product.repository.token';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  public findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  public findOne(id: string): Promise<ProductEntity> {
    return this.getProductById(id);
  }

  public create(
    dto: CreateProductDto,
    storeEntity: StoreEntity,
  ): Promise<ProductEntity> {
    return this.productRepository.save({
      ...dto,
      store: storeEntity,
    });
  }

  public async update(
    id: string,
    dto: UpdateProductDto,
    storeEntity?: StoreEntity,
  ): Promise<void> {
    assertHasUpdatableFields(dto);
    const productEntity = storeEntity
      ? await this.getProductById(id, storeEntity)
      : await this.getProductById(id);
    await this.productRepository.update(productEntity.id, dto);
  }

  public async delete(id: string, storeEntity?: StoreEntity): Promise<void> {
    const productEntity = storeEntity
      ? await this.getProductById(id, storeEntity)
      : await this.getProductById(id);
    await this.productRepository.delete(productEntity.id);
  }

  private async getProductById(
    id: string,
    storeEntity?: StoreEntity,
  ): Promise<ProductEntity> {
    const productEntity = storeEntity
      ? storeEntity.products.find((productEntity) => productEntity.id === id)
      : await this.productRepository.findById(id);
    if (!productEntity) {
      throw new NotFoundException(
        storeEntity ? 'Product not found in your store' : 'Product not found',
      );
    }
    return productEntity;
  }
}
