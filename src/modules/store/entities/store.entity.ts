import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { StoreCategories } from '../enums/store-categories.enum';

@Entity('stores')
@Index(['state', 'city', 'neighborhood'])
export class StoreEntity extends AbstractEntity {
  @OneToOne(() => UserEntity, (user) => user.store, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ type: 'enum', enum: StoreCategories })
  category: StoreCategories;

  @Column({ length: 15, nullable: false })
  phone: string;

  @Column({ length: 100, nullable: false })
  street: string;

  @Column({ length: 20, nullable: false })
  number: string;

  @Column({ length: 100, nullable: false })
  neighborhood: string;

  @Column({ length: 50, nullable: false })
  city: string;

  @Column({ length: 2, nullable: false })
  state: string;

  @Column({ default: 10 })
  slots: number;

  @OneToMany(() => ProductEntity, (product) => product.store)
  products: ProductEntity[];
}
