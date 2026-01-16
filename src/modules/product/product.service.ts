import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { CreateProductDto } from './dtos/CreateProduct.dto';
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

  public async create(dto: CreateProductDto): Promise<ProductEntity> {
    const storeEntity = await this.storeService.findOne(dto.storeId);
    return this.productRepository.save({
      ...dto,
      store: storeEntity,
    });
  }

  private async getProductById(id: string): Promise<ProductEntity> {
    const productEntity = await this.productRepository.findById(id);
    if (!productEntity) throw new NotFoundException('Product not found');
    return productEntity;
  }
}
