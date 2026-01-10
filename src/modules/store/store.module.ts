import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './entities/store.entity';
import { StoreTypeOrmRepository } from './repositories/implementatios/store.typeorm.repository';
import { STORE_REPOSITORY } from './repositories/store.repository.token';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  controllers: [StoreController],
  providers: [
    StoreService,
    {
      provide: STORE_REPOSITORY,
      useClass: StoreTypeOrmRepository,
    },
  ],
})
export class StoreModule {}
