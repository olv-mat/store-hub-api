import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { IdParam } from 'src/common/decorators/id-param.decorator';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { ProductResponseDto } from './dtos/ProductResponse.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async findAll(): Promise<ProductResponseDto[]> {
    const productEntities = await this.productService.findAll();
    return ProductResponseDto.fromEntities(productEntities);
  }

  @Get(':id')
  public async findOne(@IdParam() id: string): Promise<ProductResponseDto> {
    const productEntity = await this.productService.findOne(id);
    return ProductResponseDto.fromEntity(productEntity);
  }

  @Post()
  public async create(
    @Body() dto: CreateProductDto,
  ): Promise<DefaultResponseDto> {
    const { id } = await this.productService.create(dto);
    return DefaultResponseDto.create(id, 'Product created successfully');
  }

  @Patch(':id')
  public async update(
    @IdParam() id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<MessageResponseDto> {
    await this.productService.update(id, dto);
    return MessageResponseDto.create('Product updated successfully');
  }
}
