import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  public abstract find(): Promise<UserEntity[]>;
  public abstract findById(id: string): Promise<UserEntity | null>;
  public abstract findByEmail(email: string): Promise<UserEntity | null>;
  public abstract save(partial: Partial<UserEntity>): Promise<UserEntity>;
  public abstract delete(id: string): Promise<void>;
  public abstract update(
    id: string,
    partial: Partial<UserEntity>,
  ): Promise<void>;
}
