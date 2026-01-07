import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, Index } from 'typeorm';
import { UserRoles } from '../enums/user-roles.enum';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ length: 100, nullable: false })
  name: string;

  @Index()
  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.OWNER })
  role: UserRoles;
}
