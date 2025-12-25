import { Body, Controller, Get, Post } from '@nestjs/common';
import { IdParam } from 'src/common/decorators/id-param.decorator';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserResponseDto } from './dtos/UserResponse.dto';
import { UserResponseMapper } from './mappers/user-response.mapper';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<UserResponseDto[]> {
    const userEntities = await this.userService.findAll();
    return UserResponseMapper.toResponseMany(userEntities);
  }

  @Get(':id')
  public async findOne(@IdParam() id: string): Promise<UserResponseDto> {
    const userEntity = await this.userService.findOne(id);
    return UserResponseMapper.toResponseOne(userEntity);
  }

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<DefaultResponseDto> {
    const { id } = await this.userService.create(dto);
    return DefaultResponseDto.create(id, 'User created successfully');
  }
}
