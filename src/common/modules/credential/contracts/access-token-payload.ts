import { UserRoles } from 'src/modules/user/enums/user-roles.enum';

export class AccessTokenPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRoles;
}
