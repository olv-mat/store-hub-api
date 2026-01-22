import { ProductEntity } from '../entities/product.entity';

export abstract class ProductRepository {
  public abstract find(): Promise<ProductEntity[]>;
  public abstract findOneById(id: string): Promise<ProductEntity | null>;
  public abstract findOneByStoreId(
    storeId: string,
    productId: string,
  ): Promise<ProductEntity | null>;
  public abstract save(partial: Partial<ProductEntity>): Promise<ProductEntity>;
  public abstract update(
    id: string,
    partial: Partial<ProductEntity>,
  ): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
