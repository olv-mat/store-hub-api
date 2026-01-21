import { UserEntity } from '../entities/user.entity';
import { UserRoles } from '../enums/user-roles.enum';

export class UserResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly role: UserRoles;

  private constructor(
    id: string,
    name: string,
    email: string,
    role: UserRoles,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  public static fromEntities(entities: UserEntity[]): UserResponseDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }

  public static fromEntity(entity: UserEntity): UserResponseDto {
    const { id, name, email, role } = entity;
    return new UserResponseDto(id, name, email, role);
  }
}
