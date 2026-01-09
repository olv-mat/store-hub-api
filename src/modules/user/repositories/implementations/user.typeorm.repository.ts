import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserTypeOrmRepository extends UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
    super();
  }

  public findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  public findById(id: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ id: id });
  }

  public findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ email: email });
  }

  public save(data: Partial<UserEntity>): Promise<UserEntity> {
    return this.repository.save(data);
  }

  public async update(id: string, data: Partial<UserEntity>): Promise<void> {
    await this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
