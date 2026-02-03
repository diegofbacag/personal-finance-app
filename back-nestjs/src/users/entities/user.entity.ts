import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Credential } from './credential.entity';
import { Expense } from 'src/expenses/expense.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id_user: string;

  @OneToOne(() => Credential, (credentials) => credentials.user)
  credentials: Credential;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];
}
