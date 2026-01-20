import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FromRequest } from 'src/common/decorators/from-request.decorator';
import { IdParam } from 'src/common/decorators/id-param.decorator';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { AccessTokenPayload } from 'src/common/modules/credential/contracts/access-token-payload';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoles } from '../user/enums/user-roles.enum';
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

  @Post('/me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(...Object.values(UserRoles))
  public async createProductForMyStore(
    @FromRequest('user') user: AccessTokenPayload,
    @Body() dto: CreateProductDto,
  ): Promise<DefaultResponseDto> {
    const storeEntity = await this.productService.createForMyStore(
      user.sub,
      dto,
    );
    return DefaultResponseDto.create(
      storeEntity.id,
      'Product created successfully for your store',
    );
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public async create(
    @IdParam() id: string,
    @Body() dto: CreateProductDto,
  ): Promise<DefaultResponseDto> {
    const storeEntity = await this.productService.createForAnyStore(id, dto);
    return DefaultResponseDto.create(
      storeEntity.id,
      'Product created successfully',
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public async update(
    @IdParam() id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<MessageResponseDto> {
    await this.productService.update(id, dto);
    return MessageResponseDto.create('Product updated successfully');
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public async delete(@IdParam() id: string): Promise<MessageResponseDto> {
    await this.productService.delete(id);
    return MessageResponseDto.create('Product deleted successfully');
  }
}
