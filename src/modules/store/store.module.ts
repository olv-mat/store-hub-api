import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { StoreEntity } from './entities/store.entity';
import { StoreTypeOrmRepository } from './repositories/store-typeorm.repository';
import { STORE_REPOSITORY } from './repositories/store.repository.token';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [StoreController],
  providers: [
    StoreService,
    {
      provide: STORE_REPOSITORY,
      useClass: StoreTypeOrmRepository,
    },
  ],
  exports: [StoreService],
})
export class StoreModule {}
