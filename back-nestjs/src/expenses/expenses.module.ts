import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, User])],
  providers: [ExpensesService],
  controllers: [ExpensesController],
})
export class ExpensesModule {}
