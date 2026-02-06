import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ProductCategories } from '../enums/product-categories.enum';

export class ProductQueryDto {
  @IsEnum(ProductCategories)
  @IsOptional()
  public readonly category?: ProductCategories;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  public readonly inStock?: boolean;
}
