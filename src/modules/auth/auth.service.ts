import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CryptographyService } from 'src/common/modules/cryptography/cryptography.service';
import { TokenService } from 'src/common/modules/token/token.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/Login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptographyService: CryptographyService,
    private readonly tokenService: TokenService,
  ) {}

  public async login(dto: LoginDto): Promise<string> {
    const user = await this.userService.getUserByEmail(dto.email);
    const isValid =
      user &&
      (await this.cryptographyService.compare(dto.password, user.password));
    if (!isValid) throw new UnauthorizedException('Invalid credentials');
    return this.tokenService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
