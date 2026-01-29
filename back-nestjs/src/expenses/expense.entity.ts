import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  category: string;

  @Column()
  subcategory: string;

  @Column()
  description: string;

  @Column()
  date: string;
}
