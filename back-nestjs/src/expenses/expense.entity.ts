import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 0 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    nullable: false,
  })
  type: TransactionType;

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

  @CreateDateColumn()
  createdAt: Date;

  ///poner nullable false
  @ManyToOne(() => User, (user) => user.expenses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
