import { Controller, Get } from '@nestjs/common';
import { IdParam } from 'src/common/decorators/id-param.decorator';
import { ProductResponseDto } from './dtos/ProductResponse.dto';
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
}
