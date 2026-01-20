import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { assertHasUpdatableFields } from 'src/common/utils/assert-has-updatable-fields';
import { StoreEntity } from '../store/entities/store.entity';
import { StoreService } from '../store/store.service';
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
    private readonly storeService: StoreService,
  ) {}

  public findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  public findOne(id: string): Promise<ProductEntity> {
    return this.getProductById(id);
  }

  public async createForMyStore(
    sub: string,
    dto: CreateProductDto,
  ): Promise<ProductEntity> {
    const storeEntity = await this.storeService.findMyStore(sub);
    return this.create(dto, storeEntity);
  }

  public async createForAnyStore(
    id: string,
    dto: CreateProductDto,
  ): Promise<ProductEntity> {
    const storeEntity = await this.storeService.findOne(id);
    return this.create(dto, storeEntity);
  }

  public async update(id: string, dto: UpdateProductDto): Promise<void> {
    assertHasUpdatableFields(dto);
    const productEntity = await this.getProductById(id);
    await this.productRepository.update(productEntity.id, dto);
  }

  public async delete(id: string): Promise<void> {
    const productEntity = await this.getProductById(id);
    await this.productRepository.delete(productEntity.id);
  }

  private async getProductById(id: string): Promise<ProductEntity> {
    const productEntity = await this.productRepository.findById(id);
    if (!productEntity) throw new NotFoundException('Product not found');
    return productEntity;
  }

  private create(
    dto: CreateProductDto,
    storeEntity: StoreEntity,
  ): Promise<ProductEntity> {
    return this.productRepository.save({
      ...dto,
      store: storeEntity,
    });
  }
}
