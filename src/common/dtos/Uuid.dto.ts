/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsUUID } from 'class-validator';

// npm install class-validator class-transformer

export class UuidDto {
  @IsUUID()
  public readonly uuid: string;
}
