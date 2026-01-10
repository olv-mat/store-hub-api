import { AbstractRepository } from 'src/common/repositories/abstract.repository';
import { StoreEntity } from '../entities/store.entity';

export abstract class StoreRepository extends AbstractRepository<StoreEntity> {}
