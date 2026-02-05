import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { StoreEntity } from 'src/modules/store/entities/store.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ProductCategories } from '../enums/product-categories.enum';

@Entity('products')
export class ProductEntity extends AbstractEntity {
  @ManyToOne(() => StoreEntity, (store) => store.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ type: 'enum', enum: ProductCategories })
  category: ProductCategories;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: false })
  image: string;

  @Index()
  @Column({ name: 'in_stock', type: 'boolean', default: true })
  inStock: boolean;

  @Column({
    name: 'stock_updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  stockUpdatedAt: Date;
}
