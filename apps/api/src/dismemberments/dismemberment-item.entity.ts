import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Dismemberment } from './dismemberment.entity';

@Entity('dismemberment_items')
export class DismembermentItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Dismemberment, (dismemberment) => dismemberment.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dismembermentId' })
  dismemberment!: Dismemberment;

  @Column()
  dismembermentId!: number;

  @ManyToOne(() => Product, { eager: true, nullable: false })
  @JoinColumn({ name: 'destinationProductId' })
  destinationProduct!: Product;

  @Column()
  destinationProductId!: number;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  volume_m3!: number;
}
