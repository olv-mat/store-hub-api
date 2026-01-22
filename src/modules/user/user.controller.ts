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
import { UserFacade } from './user.facade';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  public findAll(): Promise<UserResponseDto[]> {
    return this.userFacade.findAll();
  }

  @Get('/me')
  @Roles(UserRoles.ADMIN, UserRoles.OWNER)
  public findMe(
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<UserResponseDto> {
    return this.userFacade.findMe(user);
  }

  @Get(':id')
  @Roles(UserRoles.ADMIN)
  public findOne(@IdParam() id: string): Promise<UserResponseDto> {
    return this.userFacade.findOne(id);
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  public create(@Body() dto: CreateUserDto): Promise<DefaultResponseDto> {
    return this.userFacade.create(dto);
  }

  @Patch('/me')
  @Roles(UserRoles.ADMIN, UserRoles.OWNER)
  public updateMe(
    @FromRequest('user') user: AccessTokenPayload,
    @Body() dto: UpdateUserDto,
  ): Promise<MessageResponseDto> {
    return this.userFacade.updateMe(user, dto);
  }

  @Patch(':id')
  @Roles(UserRoles.ADMIN)
  public update(
    @IdParam() id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<MessageResponseDto> {
    return this.userFacade.update(id, dto);
  }

  @Delete('/me')
  @Roles(UserRoles.ADMIN, UserRoles.OWNER)
  public deleteMe(
    @FromRequest('user') user: AccessTokenPayload,
  ): Promise<MessageResponseDto> {
    return this.userFacade.deleteMe(user);
  }

  @Delete(':id')
  @Roles(UserRoles.ADMIN)
  public delete(@IdParam() id: string): Promise<MessageResponseDto> {
    return this.userFacade.delete(id);
  }
}
