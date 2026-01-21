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
  public createAsOwner(
    @Body() dto: CreateProductDto,
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<DefaultResponseDto> {
    return this.productFacade.createAsOwner(dto, user.sub);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public createAsAdmin(
    @Body() dto: AssignProductDto,
  ): Promise<DefaultResponseDto> {
    return this.productFacade.createAsAdmin(dto);
  }

  @Patch(':id/me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.OWNER)
  public updateAsOwner(
    @IdParam() id: string,
    @Body() dto: UpdateProductDto,
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    return this.productFacade.updateAsOwner(id, dto, user.sub);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public updateAsAdmin(
    @IdParam() id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<MessageResponseDto> {
    return this.productFacade.updateAsAdmin(id, dto);
  }

  @Delete(':id/me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.OWNER)
  public deleteAsOwner(
    @IdParam() id: string,
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    return this.productFacade.deleteAsOwner(id, user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public deleteAsAdmin(@IdParam() id: string): Promise<MessageResponseDto> {
    return this.productFacade.deleteAsAdmin(id);
  }
}
