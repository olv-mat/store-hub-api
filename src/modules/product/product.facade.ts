import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { AccessTokenPayload } from 'src/common/modules/credential/contracts/access-token-payload';
import { assertOwner } from 'src/common/utils/assert-owner';
import { StoreService } from '../store/store.service';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { ProductResponseDto } from './dtos/ProductResponse.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { ProductService } from './product.service';

@Injectable()
export class ProductFacade {
  constructor(
    private readonly productService: ProductService,
    private readonly storeService: StoreService,
  ) {}

  public async findAll(inStock?: boolean): Promise<ProductResponseDto[]> {
    const productEntities = await this.productService.findAll(inStock);
    return ProductResponseDto.fromEntities(productEntities);
  }

  public async findOne(id: string): Promise<ProductResponseDto> {
    const productEntity = await this.productService.findOne(id, ['store']);
    return ProductResponseDto.fromEntity(productEntity);
  }

  public async create(
    dto: CreateProductDto,
    user: AccessTokenPayload,
  ): Promise<DefaultResponseDto> {
    const storeEntity = await this.storeService.findOne(dto.storeId, ['owner']);
    assertOwner(user, storeEntity.owner.id);
    const occupiedSlots = await this.productService.countByStoreId(
      storeEntity.id,
    );
    this.storeService.hasAvailableSlots(storeEntity, occupiedSlots);
    const { id } = await this.productService.create(dto);
    return DefaultResponseDto.create(id, 'Product created successfully');
  }

  public async update(
    id: string,
    dto: UpdateProductDto,
    user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    const productEntity = await this.productService.findOne(id, [
      'store',
      'store.owner',
    ]);
    assertOwner(user, productEntity.store.owner.id);
    await this.productService.update(productEntity.id, dto);
    return MessageResponseDto.create('Product updated successfully');
  }

  public async delete(
    id: string,
    user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    const productEntity = await this.productService.findOne(id, [
      'store',
      'store.owner',
    ]);
    assertOwner(user, productEntity.store.owner.id);
    await this.productService.delete(productEntity.id);
    return MessageResponseDto.create('Product deleted successfully');
  }
}
