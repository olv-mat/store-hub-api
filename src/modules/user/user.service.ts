import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptographyService } from 'src/common/modules/cryptography/cryptography.service';
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

  public findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public findOne(id: string): Promise<UserEntity> {
    return this.getUserById(id);
  }

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    await this.assertEmailNotUsed(dto.email);
    return this.userRepository.save({
      ...dto,
      password: await this.cryptographyService.hash(dto.password),
    });
  }

  public async delete(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete(id);
  }

  public async update(id: string, dto: UpdateUserDto): Promise<void> {
    const userEntity = await this.getUserById(id);
    if (dto.email) await this.assertEmailNotUsed(dto.email);
    await this.userRepository.update(userEntity.id, {
      ...dto,
      ...(dto.password && {
        password: await this.cryptographyService.hash(dto.password),
      }),
    });
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ email: email });
  }

  private async getUserById(id: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOneBy({ id: id });
    if (!userEntity) throw new NotFoundException('User not found');
    return userEntity;
  }

  private async assertEmailNotUsed(email: string): Promise<void> {
    const userEntity = await this.userRepository.findOneBy({ email: email });
    if (userEntity) throw new ConflictException('Email already in use');
  }
}
