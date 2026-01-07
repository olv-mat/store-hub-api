import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

@Entity('stores')
@Index(['city', 'state'])
export class StoreEntity extends AbstractEntity {
  @OneToOne(() => UserEntity, (user) => user.store, {
    nullable: false,
  })
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 15, nullable: false })
  phone: string;

  @Column({ length: 100, nullable: false })
  street: string;

  @Column({ length: 20, nullable: false })
  number: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  complement?: string;

  @Column({ length: 100, nullable: false })
  neighborhood: string;

  @Column({ length: 50, nullable: false })
  city: string;

  @Column({ length: 2, nullable: false })
  state: string;

  @Column({ type: 'varchar', name: 'postal_code', length: 20, nullable: true })
  postalCode?: string;

  @Column({ length: 2, nullable: false })
  country: string;
}
