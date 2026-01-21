import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from '../store/store.module';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductFacade } from './product.facade';
import { ProductService } from './product.service';
import { ProductTypeOrmRepository } from './repositories/product-typeorm.repository';
import { PRODUCT_REPOSITORY } from './repositories/product.repository.token';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), StoreModule],
  controllers: [ProductController],
  providers: [
    ProductFacade,
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductTypeOrmRepository,
    },
  ],
})
export class ProductModule {}
