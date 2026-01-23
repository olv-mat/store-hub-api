import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { StoreEntity } from './entities/store.entity';
import { StoreController } from './store.controller';
import { StoreFacade } from './store.facade';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity]), UserModule],
  controllers: [StoreController],
  providers: [StoreFacade, StoreService],
  exports: [StoreService],
})
export class StoreModule {}
