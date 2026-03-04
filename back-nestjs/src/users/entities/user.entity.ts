import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Credential } from './credential.entity';
import { Expense } from 'src/expenses/expense.entity';
import { CashFlowScenario } from 'src/cash-flow-scenario/entities/cash-flow-scenario.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Credential, (credentials) => credentials.user, {
    cascade: true,
  })
  credentials: Credential;

  @OneToOne(() => CashFlowScenario, (scenario) => scenario.user)
  cashFlowScenario: CashFlowScenario;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];
}
