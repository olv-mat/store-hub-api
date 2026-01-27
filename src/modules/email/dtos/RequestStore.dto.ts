import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class RequestStoreDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  store: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @IsPhoneNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
