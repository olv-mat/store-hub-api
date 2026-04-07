import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUser.dto';

// npm i @nestjs/mapped-types

export class UpdateUserDto extends PartialType(CreateUserDto) {}
