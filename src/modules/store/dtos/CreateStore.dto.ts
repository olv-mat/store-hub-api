import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsUUID()
  public readonly owner: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @IsPhoneNumber()
  public readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly street: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  public readonly number: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public readonly complement?: string;

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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  public readonly postalCode?: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  public readonly country: string;
}
