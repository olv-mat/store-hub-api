import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { AccessTokenPayload } from 'src/common/modules/credential/contracts/access-token-payload';
import { StoreService } from '../store/store.service';
import { AssignProductDto } from './dtos/AssignProductDto.dto';
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

  public async findAll(): Promise<ProductResponseDto[]> {
    const productEntities = await this.productService.findAll();
    return ProductResponseDto.fromEntities(productEntities);
  }

  public async findOne(id: string): Promise<ProductResponseDto> {
    const productEntity = await this.productService.findOne(id);
    return ProductResponseDto.fromEntity(productEntity);
  }

  public async create(
    dto: CreateProductDto | AssignProductDto,
    user?: AccessTokenPayload,
  ): Promise<DefaultResponseDto> {
    const storeEntity = user
      ? await this.storeService.findMyStore(user.sub)
      : await this.storeService.findOne((dto as AssignProductDto).store);
    const { id } = await this.productService.create(dto, storeEntity);
    return DefaultResponseDto.create(
      id,
      user
        ? 'Your product has been created successfully'
        : 'Product created successfully',
    );
  }

  public async update(
    id: string,
    dto: UpdateProductDto,
    user?: AccessTokenPayload,
  ) {
    const storeEntity = user
      ? await this.storeService.findMyStore(user.sub)
      : undefined;
    await this.productService.update(id, dto, storeEntity);
    return MessageResponseDto.create(
      user
        ? 'Your product has been updated successfully'
        : 'Product updated successfully',
    );
  }

  public async delete(
    id: string,
    user?: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    const storeEntity = user
      ? await this.storeService.findMyStore(user.sub)
      : undefined;
    await this.productService.delete(id, storeEntity);
    return MessageResponseDto.create(
      user
        ? 'Your product has been deleted successfully'
        : 'Product deleted successfully',
    );
  }
}
