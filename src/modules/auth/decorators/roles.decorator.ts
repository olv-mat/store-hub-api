import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/modules/user/enums/user-roles.enum';

export const ROLES_KEY = 'ROLES';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
