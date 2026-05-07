import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';
import { DismembermentItem } from './dismemberment-item.entity';

@Entity('dismemberments')
export class Dismemberment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, { eager: true, nullable: false })
  @JoinColumn({ name: 'originProductId' })
  originProduct!: Product;

  @Column()
  originProductId!: number;

  @Column({ type: 'int' })
  originQuantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  originVolume_m3!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'userId' })
  user!: User | null;

  @Column({ nullable: true })
  userId!: number | null;

  @OneToMany(() => DismembermentItem, (item) => item.dismemberment, {
    cascade: true,
  })
  items!: DismembermentItem[];
}
