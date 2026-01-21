import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserTypeOrmRepository extends UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
    super();
  }

  public findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ email: email });
  }

  public find(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  public findOneById(id: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { id: id }, relations: ['store'] });
  }

  public save(partial: Partial<UserEntity>): Promise<UserEntity> {
    return this.repository.save(partial);
  }

  public async update(id: string, partial: Partial<UserEntity>): Promise<void> {
    await this.repository.update(id, partial);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
