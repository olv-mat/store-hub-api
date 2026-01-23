import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { assertHasUpdatableFields } from 'src/common/utils/assert-has-updatable-fields';
import { Repository } from 'typeorm';
import { StoreEntity } from '../store/entities/store.entity';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  public findOne(id: string, relations: string[] = []): Promise<ProductEntity> {
    return this.getById(id, relations);
  }

  public create(dto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.save({
      ...dto,
      store: { id: dto.store } as StoreEntity,
    });
  }

  public async update(id: string, dto: UpdateProductDto): Promise<void> {
    assertHasUpdatableFields(dto);
    await this.productRepository.update(id, dto);
  }

  public async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
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
