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
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserResponseDto } from './dtos/UserResponse.dto';
import { UserRoles } from './enums/user-roles.enum';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  public async findAll(): Promise<UserResponseDto[]> {
    const userEntities = await this.userService.findAll();
    return UserResponseDto.fromEntities(userEntities);
  }

  @Get('/me')
  @Roles(...Object.values(UserRoles))
  public async findMe(
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<UserResponseDto> {
    const userEntity = await this.userService.findOne(user.sub);
    return UserResponseDto.fromEntity(userEntity);
  }

  @Get(':id')
  @Roles(UserRoles.ADMIN)
  public async findOne(@IdParam() id: string): Promise<UserResponseDto> {
    const userEntity = await this.userService.findOne(id);
    return UserResponseDto.fromEntity(userEntity);
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  public async create(@Body() dto: CreateUserDto): Promise<DefaultResponseDto> {
    const { id } = await this.userService.create(dto);
    return DefaultResponseDto.create(id, 'User created successfully');
  }

  @Patch('/me')
  @Roles(...Object.values(UserRoles))
  public async updateMe(
    @FromRequest('user') user: AccessTokenPayload,
    @Body() dto: UpdateUserDto,
  ): Promise<MessageResponseDto> {
    await this.userService.update(user.sub, dto);
    return MessageResponseDto.create(
      'Your account has been updated successfully',
    );
  }

  @Patch(':id')
  @Roles(UserRoles.ADMIN)
  public async update(
    @IdParam() id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<MessageResponseDto> {
    await this.userService.update(id, dto);
    return MessageResponseDto.create('User updated successfully');
  }

  @Delete('/me')
  @Roles(...Object.values(UserRoles))
  public async deleteMe(
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    await this.userService.delete(user.sub);
    return MessageResponseDto.create(
      'Your account has been deleted successfully',
    );
  }

  @Delete(':id')
  @Roles(UserRoles.ADMIN)
  public async delete(@IdParam() id: string): Promise<MessageResponseDto> {
    await this.userService.delete(id);
    return MessageResponseDto.create('User deleted successfully');
  }
}
