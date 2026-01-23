import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './CreateProduct.dto';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['store'] as const),
) {}
