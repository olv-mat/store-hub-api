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
import { StoreResponseDto } from './dtos/StoreResponse.dto';
import { UpdateStoreDto } from './dtos/UpdateStore.dto';
import { StoreFacade } from './store.facade';

@Controller('stores')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreController {
  constructor(private readonly storeFacade: StoreFacade) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  public findAll(): Promise<StoreResponseDto[]> {
    return this.storeFacade.findAll();
  }

  @Get('/me')
  @Roles(UserRoles.OWNER)
  public findMyStore(
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<StoreResponseDto> {
    return this.storeFacade.findMyStore(user);
  }

  @Get(':id')
  @Roles(UserRoles.ADMIN)
  public findOne(@IdParam() id: string): Promise<StoreResponseDto> {
    return this.storeFacade.findOne(id);
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  public create(@Body() dto: CreateStoreDto): Promise<DefaultResponseDto> {
    return this.storeFacade.create(dto);
  }

  @Patch('/me')
  @Roles(UserRoles.OWNER)
  public async updateMyStore(
    @FromRequest('user') user: AccessTokenPayload,
    @Body() dto: UpdateStoreDto,
  ): Promise<MessageResponseDto> {
    return this.storeFacade.updateMyStore(user, dto);
  }

  @Patch(':id')
  @Roles(UserRoles.ADMIN)
  public async update(
    @IdParam() id: string,
    @Body() dto: UpdateStoreDto,
  ): Promise<MessageResponseDto> {
    return this.storeFacade.update(id, dto);
  }
}
