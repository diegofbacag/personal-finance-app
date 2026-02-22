import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum CashFlowDirection {
  INFLOW = 'inflow',
  OUTFLOW = 'outflow',
}

@Entity({ name: 'cash-flow-scenarios' })
export class CashFlowScenario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', default: 0, nullable: true })
  amount: number;

  @Column({ type: 'enum', enum: CashFlowDirection, nullable: false })
  direction: CashFlowDirection;

  @Column({ type: 'varchar', length: 100, nullable: false })
  category: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  subcategory: string;

  @OneToOne(() => User, (user) => user.cashFlowScenario, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
