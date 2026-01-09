export abstract class AbstractRepository<T> {
  public abstract findAll(): Promise<T[]>;
  public abstract findById(id: string): Promise<T | null>;
  public abstract save(data: object): Promise<T>;
  public abstract update(id: string, data: object): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
