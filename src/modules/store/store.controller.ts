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
import { IdParam } from 'src/common/decorators/id-param.decorator';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
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

  @Delete(':id')
  @Roles(UserRoles.ADMIN)
  public async delete(@IdParam() id: string): Promise<MessageResponseDto> {
    await this.storeService.delete(id);
    return MessageResponseDto.create('Store deleted successfully');
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
