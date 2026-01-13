import { StoreEntity } from '../entities/store.entity';

export abstract class StoreRepository {
  public abstract find(): Promise<StoreEntity[]>;
  public abstract findById(id: string): Promise<StoreEntity | null>;
  public abstract save(partial: Partial<StoreEntity>): Promise<StoreEntity>;
  public abstract delete(id: string): Promise<void>;
  public abstract update(
    id: string,
    partial: Partial<StoreEntity>,
  ): Promise<void>;
}
