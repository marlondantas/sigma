import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  cnpj!: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  contact!: string | null;
}
