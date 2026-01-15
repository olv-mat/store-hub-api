import { ProductEntity } from '../entities/product.entity';

export abstract class ProductRepository {
  public abstract find(): Promise<ProductEntity[]>;
}
