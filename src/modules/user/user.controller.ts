import { Controller, Get } from '@nestjs/common';
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
}
