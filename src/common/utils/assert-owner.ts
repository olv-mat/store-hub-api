import { ForbiddenException } from '@nestjs/common';
import { UserRoles } from 'src/modules/user/enums/user-roles.enum';
import { AccessTokenPayload } from '../modules/credential/contracts/access-token-payload';

export function assertOwner(user: AccessTokenPayload, ownerId: string): void {
  if (user.role !== UserRoles.ADMIN && user.sub !== ownerId) {
    throw new ForbiddenException('You cannot access this resource');
  }
}
