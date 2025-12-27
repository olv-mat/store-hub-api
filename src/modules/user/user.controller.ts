import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { IdParam } from 'src/common/decorators/id-param.decorator';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserResponseDto } from './dtos/UserResponse.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return UserResponseDto.fromEntities(users);
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
