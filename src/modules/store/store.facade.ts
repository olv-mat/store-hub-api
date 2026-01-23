import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { AccessTokenPayload } from 'src/common/modules/credential/contracts/access-token-payload';
import { assertOwner } from 'src/common/utils/assert-owner';
import { UserService } from '../user/user.service';
import { CreateStoreDto } from './dtos/CreateStore.dto';
import { StoreResponseDto } from './dtos/StoreResponse.dto';
import { UpdateStoreDto } from './dtos/UpdateStore.dto';
import { StoreService } from './store.service';

@Injectable()
export class StoreFacade {
  constructor(
    private readonly storeService: StoreService,
    private readonly userService: UserService,
  ) {}

  public async findAll(): Promise<StoreResponseDto[]> {
    const storeEntities = await this.storeService.findAll();
    return StoreResponseDto.fromEntities(storeEntities);
  }

  public async findOne(
    id: string,
    user: AccessTokenPayload,
  ): Promise<StoreResponseDto> {
    const storeEntity = await this.storeService.findOne(id, [
      'owner',
      'products',
    ]);
    assertOwner(user, storeEntity.owner.id);
    return StoreResponseDto.fromEntity(storeEntity);
  }

  public async create(dto: CreateStoreDto): Promise<DefaultResponseDto> {
    await this.userService.findOne(dto.owner);
    const { id } = await this.storeService.create(dto);
    return DefaultResponseDto.create(id, 'Store created successfully');
  }

  public async update(
    id: string,
    dto: UpdateStoreDto,
    user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    const storeEntity = await this.storeService.findOne(id, ['owner']);
    assertOwner(user, storeEntity.owner.id);
    await this.storeService.update(storeEntity.id, dto);
    return MessageResponseDto.create('Store updated successfully');
  }
}
