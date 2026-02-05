import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Expense } from './expense.entity';
import { CreateExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
  ) {}

  async getExpenses(userId: string) {
    const expenses = this.expensesRepository.find({
      where: { user: { id_user: userId } },
      relations: ['user'],
    });
    return expenses;
  }

  async createExpense(expenseData: CreateExpenseDto) {
    const newExpense = this.expensesRepository.create({
      ...expenseData,
      amount: expenseData.amount.toString(),
    });

    return await this.expensesRepository.save(newExpense);
  }

  async deleteExpense(id: string) {
    await this.expensesRepository.softDelete(id);
  }
}
