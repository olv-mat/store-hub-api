import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsUUID()
  readonly store: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly name: string;

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
