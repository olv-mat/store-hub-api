import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUser.dto';

// pnpm add @nestjs/mapped-types

export class UpdateUserDto extends PartialType(CreateUserDto) {}
