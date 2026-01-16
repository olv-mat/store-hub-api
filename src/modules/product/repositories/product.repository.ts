import { ProductEntity } from '../entities/product.entity';

export abstract class ProductRepository {
  public abstract find(): Promise<ProductEntity[]>;
  public abstract findById(id: string): Promise<ProductEntity | null>;
  public abstract save(partial: Partial<ProductEntity>): Promise<ProductEntity>;
}
