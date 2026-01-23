import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptographyService } from 'src/common/modules/cryptography/cryptography.service';
import { assertHasUpdatableFields } from 'src/common/utils/assert-has-updatable-fields';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cryptographyService: CryptographyService,
  ) {}

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email: email });
  }

  public findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public findOne(id: string): Promise<UserEntity> {
    return this.getById(id);
  }

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    await this.assertEmailNotUsed(dto.email);
    return this.userRepository.save({
      ...dto,
      password: await this.cryptographyService.hash(dto.password),
    });
  }

  public async update(id: string, dto: UpdateUserDto): Promise<void> {
    assertHasUpdatableFields(dto);
    const userEntity = await this.getById(id);
    if (dto.email && dto.email !== userEntity.email) {
      await this.assertEmailNotUsed(dto.email);
    }
    await this.userRepository.update(userEntity.id, {
      ...dto,
      ...(dto.password && {
        password: await this.cryptographyService.hash(dto.password),
      }),
    });
  }

  public async delete(id: string): Promise<void> {
    const userEntity = await this.getById(id);
    await this.userRepository.delete(userEntity.id);
  }

  private async getById(id: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOneBy({ id: id });
    if (!userEntity) throw new NotFoundException('User not found');
    return userEntity;
  }

  private async assertEmailNotUsed(email: string): Promise<void> {
    const userEntity = await this.userRepository.findOneBy({ email: email });
    if (userEntity) throw new ConflictException('Email already in use');
  }
}
