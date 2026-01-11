import { StoreEntity } from '../entities/store.entity';

export abstract class StoreRepository {
  public abstract findAll(): Promise<StoreEntity[]>;
  public abstract findById(id: string): Promise<StoreEntity | null>;
}
