import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ProductCategories } from '../enums/product-categories.enum';

export class ProductQueryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  public readonly state: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  public readonly city: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly neighborhood: string;

  @IsOptional()
  @IsEnum(ProductCategories)
  public readonly category?: ProductCategories;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  public readonly inStock?: boolean;
}
