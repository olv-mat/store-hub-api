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
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserResponseDto } from './dtos/UserResponse.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return UserResponseDto.fromEntities(users);
  }

  @Get('/me')
  public async findMe(
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<UserResponseDto> {
    const userEntity = await this.userService.findOne(user.sub);
    return UserResponseDto.fromEntity(userEntity);
  }

  @Get(':id')
  public async findOne(@IdParam() id: string): Promise<UserResponseDto> {
    const user = await this.userService.findOne(id);
    return UserResponseDto.fromEntity(user);
  }

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<DefaultResponseDto> {
    const { id } = await this.userService.create(dto);
    return DefaultResponseDto.create(id, 'User created successfully');
  }

  @Delete('/me')
  public async deleteMe(
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    await this.userService.delete(user.sub);
    return MessageResponseDto.create('User deleted successfully');
  }

  @Delete(':id')
  public async delete(@IdParam() id: string): Promise<MessageResponseDto> {
    await this.userService.delete(id);
    return MessageResponseDto.create('User deleted successfully');
  }

  @Patch(':id')
  public async update(
    @IdParam() id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<MessageResponseDto> {
    await this.userService.update(id, dto);
    return MessageResponseDto.create('User updated successfully');
  }
}
