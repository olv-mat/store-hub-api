import { Controller, Get } from '@nestjs/common';
import { ProductResponseDto } from './dtos/ProductResponse.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async findAll(): Promise<ProductResponseDto[]> {
    const productEntities = await this.productService.find();
    return ProductResponseDto.fromEntities(productEntities);
  }
}
