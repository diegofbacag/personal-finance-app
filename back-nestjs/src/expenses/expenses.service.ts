import { Injectable, NotFoundException } from '@nestjs/common';

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
    const expenses = await this.expensesRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return expenses.map((e) => ({
      ...e,
      amount: Number(e.amount),
    }));
  }

  async createExpense(expenseData: CreateExpenseDto, userId: string) {
    const newExpense = this.expensesRepository.create({
      ...expenseData,
      amount: expenseData.amount,
      user: { id: userId },
    });

    return await this.expensesRepository.save(newExpense);
  }

  async deleteExpense(expenseId: number, userId: string) {
    const expense = await this.expensesRepository.findOne({
      where: {
        id: expenseId,
        user: { id: userId },
      },
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    await this.expensesRepository.softDelete(expenseId);
  }
}
