import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { StoreEntity } from 'src/modules/store/entities/store.entity';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { UserRoles } from '../enums/user-roles.enum';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ length: 100, nullable: false })
  name: string;

  @Index()
  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.OWNER })
  role: UserRoles;

  @OneToOne(() => StoreEntity, (store) => store.owner, {
    eager: true,
    nullable: true,
  })
  store?: StoreEntity;
}
