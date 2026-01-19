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
import { StoreService } from './store.service';

@Controller('stores')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  public async findAll(): Promise<StoreResponseDto[]> {
    const storeEntities = await this.storeService.findAll();
    return StoreResponseDto.fromEntities(storeEntities);
  }

  @Get('/me')
  @Roles(...Object.values(UserRoles))
  public async findMyStore(
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<StoreResponseDto> {
    const storeEntity = await this.storeService.findMyStore(user.sub);
    return StoreResponseDto.fromEntity(storeEntity);
  }

  @Get(':id')
  @Roles(UserRoles.ADMIN)
  public async findOne(@IdParam() id: string): Promise<StoreResponseDto> {
    const storeEntity = await this.storeService.findOne(id);
    return StoreResponseDto.fromEntity(storeEntity);
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  public async create(
    @Body() dto: CreateStoreDto,
  ): Promise<DefaultResponseDto> {
    const { id } = await this.storeService.create(dto);
    return DefaultResponseDto.create(id, 'Store created successfully');
  }

  @Patch('/me')
  @Roles(...Object.values(UserRoles))
  public async updateMyStore(
    @FromRequest('user') user: AccessTokenPayload,
    @Body() dto: UpdateStoreDto,
  ): Promise<MessageResponseDto> {
    await this.storeService.updateMyStore(user.sub, dto);
    return MessageResponseDto.create(
      'Your store has been updated successfully',
    );
  }

  @Patch(':id')
  @Roles(UserRoles.ADMIN)
  public async update(
    @IdParam() id: string,
    @Body() dto: UpdateStoreDto,
  ): Promise<MessageResponseDto> {
    await this.storeService.update(id, dto);
    return MessageResponseDto.create('Store updated successfully');
  }
}
