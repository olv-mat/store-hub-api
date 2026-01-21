import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  public abstract findOneByEmail(email: string): Promise<UserEntity | null>;
  public abstract find(): Promise<UserEntity[]>;
  public abstract findOneById(id: string): Promise<UserEntity | null>;
  public abstract save(partial: Partial<UserEntity>): Promise<UserEntity>;
  public abstract update(
    id: string,
    partial: Partial<UserEntity>,
  ): Promise<void>;
  public abstract delete(id: string): Promise<void>;
}
