import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { AccessTokenPayload } from 'src/common/modules/credential/contracts/access-token-payload';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserResponseDto } from './dtos/UserResponse.dto';
import { UserService } from './user.service';

@Injectable()
export class UserFacade {
  constructor(private readonly userService: UserService) {}

  public async findAll(): Promise<UserResponseDto[]> {
    const userEntities = await this.userService.findAll();
    return UserResponseDto.fromEntities(userEntities);
  }

  public async findMe(user: AccessTokenPayload): Promise<UserResponseDto> {
    const userEntity = await this.userService.findOne(user.sub);
    return UserResponseDto.fromEntity(userEntity);
  }

  public async findOne(id: string): Promise<UserResponseDto> {
    const userEntity = await this.userService.findOne(id);
    return UserResponseDto.fromEntity(userEntity);
  }

  public async create(dto: CreateUserDto): Promise<DefaultResponseDto> {
    const { id } = await this.userService.create(dto);
    return DefaultResponseDto.create(id, 'User created successfully');
  }

  public async updateMe(
    user: AccessTokenPayload,
    dto: UpdateUserDto,
  ): Promise<MessageResponseDto> {
    await this.userService.update(user.sub, dto);
    return MessageResponseDto.create(
      'Your account has been updated successfully',
    );
  }

  public async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<MessageResponseDto> {
    await this.userService.update(id, dto);
    return MessageResponseDto.create('User updated successfully');
  }

  public async deleteMe(user: AccessTokenPayload): Promise<MessageResponseDto> {
    await this.userService.delete(user.sub);
    return MessageResponseDto.create(
      'Your account has been deleted successfully',
    );
  }

  public async delete(id: string): Promise<MessageResponseDto> {
    await this.userService.delete(id);
    return MessageResponseDto.create('User deleted successfully');
  }
}
