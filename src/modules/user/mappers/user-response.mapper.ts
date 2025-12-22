import { UserResponseDto } from '../dtos/UserResponseDto';
import { UserEntity } from '../entities/user.entity';

export class UserResponseMapper {
  public static toResponseMany = (userEntities: UserEntity[]) => {
    return this.toDtoList(userEntities);
  };

  public static toResponseOne = (userEntity: UserEntity) => {
    return this.toDto(userEntity);
  };

  private static toDtoList(userEntities: UserEntity[]): UserResponseDto[] {
    return userEntities.map((userEntity) => this.toDto(userEntity));
  }

  private static toDto(userEntity: UserEntity): UserResponseDto {
    const { id, name, email, role } = userEntity;
    return new UserResponseDto(id, name, email, role);
  }
}
