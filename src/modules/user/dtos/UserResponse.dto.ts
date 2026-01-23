import { StoreResponseDto } from 'src/modules/store/dtos/StoreResponse.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRoles } from '../enums/user-roles.enum';

type UserResponseProperties = {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
  store?: StoreResponseDto;
};

export class UserResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly role: UserRoles;
  public readonly store?: StoreResponseDto;

  private constructor(properties: UserResponseProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.email = properties.email;
    this.role = properties.role;
    this.store = properties.store;
  }

  public static fromEntities(entities: UserEntity[]): UserResponseDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }

  public static fromEntity(entity: UserEntity): UserResponseDto {
    return new UserResponseDto({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      store: entity.store
        ? StoreResponseDto.fromEntity(entity.store)
        : undefined,
    });
  }
}
