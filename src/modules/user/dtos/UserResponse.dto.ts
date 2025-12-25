import { UserRoles } from '../enums/user-roles.enum';

export class UserResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly role: UserRoles;

  constructor(id: string, name: string, email: string, role: UserRoles) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
