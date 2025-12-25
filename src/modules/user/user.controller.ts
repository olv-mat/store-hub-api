import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
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

  @Get(':uuid')
  public async findOne(
    @Param('uuid') { uuid }: UuidDto,
  ): Promise<UserResponseDto> {
    const userEntity = await this.userService.findOne(uuid);
    return UserResponseMapper.toResponseOne(userEntity);
  }

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<DefaultResponseDto> {
    const { id } = await this.userService.create(dto);
    return DefaultResponseDto.create(id, 'User created successfully');
  }
}
