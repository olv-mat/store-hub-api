import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateProductDto } from './CreateProduct.dto';

export class AssignProductDto extends CreateProductDto {
  @IsNotEmpty()
  @IsUUID()
  readonly store: string;
}
