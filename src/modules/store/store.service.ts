import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/common/modules/email/email.service';
import { assertHasUpdatableFields } from 'src/common/utils/assert-has-updatable-fields';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateStoreDto } from './dtos/CreateStore.dto';
import { RequestStoreDto } from './dtos/RequestStore.dto';
import { UpdateStoreDto } from './dtos/UpdateStore.dto';
import { StoreEntity } from './entities/store.entity';
import { MailTemplateHelper } from './helpers/email-temaplate.helper';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    private readonly emailService: EmailService,
  ) {}

  public findAll(): Promise<StoreEntity[]> {
    return this.storeRepository.find();
  }

  public findOne(id: string, relations: string[] = []): Promise<StoreEntity> {
    return this.getById(id, relations);
  }

  public create(dto: CreateStoreDto): Promise<StoreEntity> {
    return this.storeRepository.save({
      ...dto,
      owner: { id: dto.ownerId } as UserEntity,
    });
  }

  public async request(dto: RequestStoreDto): Promise<void> {
    const subject = `[New Store] ${dto.store} | ${dto.category} - ${dto.city}/${dto.state}`;
    const html = MailTemplateHelper.buildStoreRequestHtml(dto);
    await this.emailService.send(subject, html);
  }

  public async update(id: string, dto: UpdateStoreDto): Promise<void> {
    assertHasUpdatableFields(dto);
    await this.storeRepository.update(id, dto);
  }

  public hasAvailableSlots(
    storeEntity: StoreEntity,
    currentUsage: number,
  ): void {
    if (currentUsage >= storeEntity.slots) {
      throw new BadRequestException('No available product slots');
    }
  }

  private async getById(
    id: string,
    relations: string[] = [],
  ): Promise<StoreEntity> {
    const storeEntity = await this.storeRepository.findOne({
      where: { id: id },
      relations,
    });
    if (!storeEntity) throw new NotFoundException('Store not found');
    return storeEntity;
  }
}
