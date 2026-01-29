import {
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import { StoreCategories } from '../enums/store-categories.enum';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsUUID()
  public readonly ownerId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly name: string;

  @IsEnum(StoreCategories)
  public readonly category: StoreCategories;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  public readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly street: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  public readonly number: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly neighborhood: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  public readonly city: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  public readonly state: string;
}
