import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
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

  public async createAsOwner(
    dto: CreateProductDto,
    sub: string,
  ): Promise<DefaultResponseDto> {
    const storeEntity = await this.storeService.findMyStore(sub);
    const { id } = await this.productService.create(dto, storeEntity);
    return DefaultResponseDto.create(
      id,
      'Your product has been created successfully',
    );
  }

  public async createAsAdmin(
    dto: AssignProductDto,
  ): Promise<DefaultResponseDto> {
    const storeEntity = await this.storeService.findOne(dto.store);
    const { id } = await this.productService.create(dto, storeEntity);
    return DefaultResponseDto.create(id, 'Product created successfully');
  }

  public async updateAsOwner(
    id: string,
    dto: UpdateProductDto,
    sub: string,
  ): Promise<MessageResponseDto> {
    const storeEntity = await this.storeService.findMyStore(sub);
    await this.productService.update(id, dto, storeEntity);
    return MessageResponseDto.create(
      'Your product has been updated successfully',
    );
  }

  public async updateAsAdmin(
    id: string,
    dto: UpdateProductDto,
  ): Promise<MessageResponseDto> {
    await this.productService.update(id, dto);
    return MessageResponseDto.create('Product updated successfully');
  }

  public async deleteAsOwner(
    id: string,
    sub: string,
  ): Promise<MessageResponseDto> {
    const storeEntity = await this.storeService.findMyStore(sub);
    await this.productService.delete(id, storeEntity);
    return MessageResponseDto.create(
      'Your product has been deleted successfully',
    );
  }

  public async deleteAsAdmin(id: string): Promise<MessageResponseDto> {
    await this.productService.delete(id);
    return MessageResponseDto.create('Product deleted successfully');
  }
}
