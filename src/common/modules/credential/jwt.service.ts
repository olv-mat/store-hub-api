import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialService } from './credential.service';

@Injectable()
export class JwtServiceImplementation implements CredentialService {
  constructor(private readonly jwtService: JwtService) {}

  public sign(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  public verify<T extends object>(token: string): Promise<T> {
    try {
      return this.jwtService.verifyAsync<T>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
