import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptographyService } from 'src/common/modules/cryptography/cryptography.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
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

  public findOne(uuid: string): Promise<UserEntity> {
    return this.getUserById(uuid);
  }

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    await this.assertEmailNotUsed(dto.email);
    return this.userRepository.save({
      ...dto,
      password: await this.cryptographyService.hash(dto.password),
    });
  }

  private async getUserById(uuid: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOneBy({ id: uuid });
    if (!userEntity) throw new NotFoundException('User not found');
    return userEntity;
  }

  private async assertEmailNotUsed(email: string): Promise<void> {
    const userEntity = await this.userRepository.findOneBy({ email: email });
    if (userEntity) throw new ConflictException('Email already in use');
  }
}
