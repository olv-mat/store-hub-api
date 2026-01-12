import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialModule } from './common/modules/credential/credential.module';
import { CryptographyModule } from './common/modules/cryptography/cryptography.module';
import { AuthModule } from './modules/auth/auth.module';
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
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        entities: [UserEntity, StoreEntity],
        autoLoadEntities: false,
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    CredentialModule,
    CryptographyModule,
    UserModule,
    AuthModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
