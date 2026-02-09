import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { assertHasUpdatableFields } from 'src/common/utils/assert-has-updatable-fields';
import { Repository } from 'typeorm';
import { StoreEntity } from '../store/entities/store.entity';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { ProductQueryDto } from './dtos/ProductQueryDto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public findAll(query: ProductQueryDto): Promise<ProductEntity[]> {
    const { state, city, neighborhood, category, inStock } = query;
    const where = {
      store: {
        ...(state !== undefined && { state: state }),
        ...(city !== undefined && { city: city }),
        ...(neighborhood !== undefined && { neighborhood: neighborhood }),
      },
      ...(category !== undefined && { category: category }),
      ...(inStock !== undefined && { inStock: inStock }),
    };
    return this.productRepository.find({
      where,
      order: {
        inStock: 'DESC',
        stockUpdatedAt: 'DESC',
      },
    });
  }

  public findOne(id: string, relations: string[] = []): Promise<ProductEntity> {
    return this.getById(id, relations);
  }

  public create(dto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.save({
      ...dto,
      store: { id: dto.storeId } as StoreEntity,
    });
  }

  public async update(id: string, dto: UpdateProductDto): Promise<void> {
    assertHasUpdatableFields(dto);
    await this.productRepository.update(id, {
      ...dto,
      ...(dto.inStock !== undefined && {
        stockUpdatedAt: new Date(),
      }),
    });
  }

  public async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  public countByStoreId(storeId: string): Promise<number> {
    return this.productRepository.count({ where: { store: { id: storeId } } });
  }

  private async getById(
    id: string,
    relations: string[] = [],
  ): Promise<ProductEntity> {
    const productEntity = await this.productRepository.findOne({
      where: { id: id },
      relations,
    });
    if (!productEntity) throw new NotFoundException('Product not found');
    return productEntity;
  }
}
