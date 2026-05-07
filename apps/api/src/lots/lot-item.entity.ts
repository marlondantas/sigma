import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Lot } from './lot.entity';

@Entity('lot_items')
export class LotItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Lot, (lot) => lot.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lotId' })
  lot!: Lot;

  @Column()
  lotId!: number;

  @ManyToOne(() => Product, { eager: true, nullable: false })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @Column()
  productId!: number;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  volume_m3!: number;
}
