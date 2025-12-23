import { Controller, Get, Param } from '@nestjs/common';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { UserResponseDto } from './dtos/UserResponseDto';
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
}
