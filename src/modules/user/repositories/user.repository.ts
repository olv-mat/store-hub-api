import { AbstractRepository } from 'src/common/repositories/abstract.repository';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository extends AbstractRepository<UserEntity> {
  public abstract findByEmail(email: string): Promise<UserEntity | null>;
}
