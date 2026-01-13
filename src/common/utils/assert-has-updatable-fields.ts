import { BadRequestException } from '@nestjs/common';

export function assertHasUpdatableFields(dto: object): void {
  if (!dto || Object.keys(dto).length === 0) {
    throw new BadRequestException('At least one field must be provided');
  }
}
