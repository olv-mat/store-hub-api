import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ProductCategories } from '../enums/product-categories.enum';

export class CreateProductDto {
  @IsNotEmpty()
  @IsUUID()
  public readonly storeId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly name: string;

  @IsEnum(ProductCategories)
  public readonly category: ProductCategories;

  @IsNotEmpty()
  @IsString()
  public readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public readonly price: number;

  @IsNotEmpty()
  @IsString()
  public readonly image: string;

  @IsBoolean()
  public readonly inStock: boolean;
}
