import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  SwaggerInternalServerError,
  SwaggerUnauthorized,
} from 'src/common/swagger/responses.swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/Login.dto';
import { LoginResponseDto } from './dtos/LoginResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @SwaggerUnauthorized('Invalid credentials')
  @SwaggerInternalServerError()
  @ApiOperation({ summary: 'Authenticate user and return access token' })
  public async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    const token = await this.authService.login(dto);
    return LoginResponseDto.create(token);
  }
}
