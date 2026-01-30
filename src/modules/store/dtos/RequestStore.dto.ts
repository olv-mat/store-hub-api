import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { StoreCategories } from '../enums/store-categories.enum';

export class RequestStoreDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly store: string;

  @IsNotEmpty()
  @IsString()
  public readonly owner: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  public readonly whatsapp: string;

  @IsEnum(StoreCategories)
  public readonly category: StoreCategories;

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

  @IsNotEmpty()
  @IsString()
  public readonly description: string;
}
