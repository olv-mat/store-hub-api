import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from '../store/store.module';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductFacade } from './product.facade';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), StoreModule],
  controllers: [ProductController],
  providers: [ProductFacade, ProductService],
})
export class ProductModule {}
