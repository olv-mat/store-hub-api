import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialModule } from './common/modules/credential/credential.module';
import { CryptographyModule } from './common/modules/cryptography/cryptography.module';
import { EmailModule } from './common/modules/email/email.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductEntity } from './modules/product/entities/product.entity';
import { ProductModule } from './modules/product/product.module';
import { StoreEntity } from './modules/store/entities/store.entity';
import { StoreModule } from './modules/store/store.module';
import { UserEntity } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';

/*
  npm i @nestjs/config
  npm i @nestjs/typeorm typeorm
  npm i pg
*/

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // npm audit fix
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
          blockDuration: 5000,
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DATABASE_HOST'),
        port: configService.getOrThrow<number>('DATABASE_PORT'),
        username: configService.getOrThrow<string>('DATABASE_USERNAME'),
        password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
        database: configService.getOrThrow<string>('DATABASE_NAME'),
        entities: [UserEntity, StoreEntity, ProductEntity],
        autoLoadEntities: false,
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    CredentialModule,
    CryptographyModule,
    EmailModule,
    UserModule,
    AuthModule,
    StoreModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
