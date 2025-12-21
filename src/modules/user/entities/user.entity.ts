import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../enums/user-roles.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
