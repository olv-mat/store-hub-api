import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CredentialService } from './credential.service';
import { JwtServiceImplementation } from './jwt.service';

// npm i @nestjs/jwt

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.getOrThrow('JWT_TTL')),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: CredentialService,
      useClass: JwtServiceImplementation,
    },
  ],
  exports: [CredentialService],
})
export class CredentialModule {}
