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
  public readonly store: string;

  @IsNotEmpty()
  @IsString()
  public readonly owner: string;

  @IsNotEmpty()
  @MaxLength(15)
  @IsPhoneNumber()
  public readonly phone: string;

  @IsNotEmpty()
  @IsString()
  public readonly description: string;
}
