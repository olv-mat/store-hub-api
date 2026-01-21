import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserTypeOrmRepository } from './repositories/user-typeorm.repository';
import { USER_REPOSITORY } from './repositories/user.repository.token';
import { UserController } from './user.controller';
import { UserFacade } from './user.facade';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserFacade,
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
