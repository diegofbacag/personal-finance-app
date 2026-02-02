import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount: string;

  @Column()
  category: string;

  @Column()
  subcategory: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  date: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
