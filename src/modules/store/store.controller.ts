import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FromRequest } from 'src/common/decorators/from-request.decorator';
import { IdParam } from 'src/common/decorators/id-param.decorator';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { AccessTokenPayload } from 'src/common/modules/credential/contracts/access-token-payload';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoles } from '../user/enums/user-roles.enum';
import { CreateStoreDto } from './dtos/CreateStore.dto';
import { RequestStoreDto } from './dtos/RequestStore.dto';
import { StoreResponseDto } from './dtos/StoreResponse.dto';
import { UpdateStoreDto } from './dtos/UpdateStore.dto';
import { StoreFacade } from './store.facade';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeFacade: StoreFacade) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public findAll(): Promise<StoreResponseDto[]> {
    return this.storeFacade.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.OWNER)
  public findOne(
    @IdParam() id: string,
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<StoreResponseDto> {
    return this.storeFacade.findOne(id, user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN)
  public create(@Body() dto: CreateStoreDto): Promise<DefaultResponseDto> {
    return this.storeFacade.create(dto);
  }

  @Post('/request')
  public request(@Body() dto: RequestStoreDto): Promise<MessageResponseDto> {
    return this.storeFacade.request(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.OWNER)
  public async update(
    @IdParam() id: string,
    @Body() dto: UpdateStoreDto,
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    return this.storeFacade.update(id, dto, user);
  }
}
