import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateStoreDto } from './CreateStore.dto';

export class UpdateStoreDto extends PartialType(
  OmitType(CreateStoreDto, ['owner'] as const),
) {}
