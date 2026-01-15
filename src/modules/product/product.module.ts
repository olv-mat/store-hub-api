import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductTypeOrmRepository } from './repositories/product-typeorm.repository';
import { PRODUCT_REPOSITORY } from './repositories/product.repository.token';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductTypeOrmRepository,
    },
  ],
})
export class ProductModule {}
