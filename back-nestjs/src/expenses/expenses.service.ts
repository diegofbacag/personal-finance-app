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

  async createExpense(expenseData: CreateExpenseDto) {
    const newExpense = this.expensesRepository.create(expenseData);
    await this.expensesRepository.save(newExpense);

    return 'usuario Creado';
  }
}
