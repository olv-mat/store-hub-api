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
import { AssignProductDto } from './dtos/AssignProductDto.dto';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { ProductResponseDto } from './dtos/ProductResponse.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { ProductFacade } from './product.facade';

@Controller('products')
export class ProductController {
  constructor(private readonly productFacade: ProductFacade) {}

  @Get()
  public findAll(): Promise<ProductResponseDto[]> {
    return this.productFacade.findAll();
  }

  @Get(':id')
  public async findOne(@IdParam() id: string): Promise<ProductResponseDto> {
    return this.productFacade.findOne(id);
  }

  @Post('/me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.OWNER)
  public createMyProduct(
    @Body() dto: CreateProductDto,
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<DefaultResponseDto> {
    return this.productFacade.create(dto, user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public create(@Body() dto: AssignProductDto): Promise<DefaultResponseDto> {
    return this.productFacade.create(dto);
  }

  @Patch(':id/me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.OWNER)
  public updateMyProduct(
    @IdParam() id: string,
    @Body() dto: UpdateProductDto,
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    return this.productFacade.update(id, dto, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public update(
    @IdParam() id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<MessageResponseDto> {
    return this.productFacade.update(id, dto);
  }

  @Delete(':id/me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.OWNER)
  public deleteMyProduct(
    @IdParam() id: string,
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    return this.productFacade.delete(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public delete(@IdParam() id: string): Promise<MessageResponseDto> {
    return this.productFacade.delete(id);
  }
}
