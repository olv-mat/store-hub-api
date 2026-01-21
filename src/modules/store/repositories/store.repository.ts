import { StoreEntity } from '../entities/store.entity';

export abstract class StoreRepository {
  public abstract find(): Promise<StoreEntity[]>;
  public abstract findOneByUserId(userId: string): Promise<StoreEntity | null>;
  public abstract findOneById(id: string): Promise<StoreEntity | null>;
  public abstract save(partial: Partial<StoreEntity>): Promise<StoreEntity>;
  public abstract update(
    id: string,
    partial: Partial<StoreEntity>,
  ): Promise<void>;
}
