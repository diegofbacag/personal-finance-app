import { Body, Controller, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() expenseData: CreateExpenseDto) {
    return this.expensesService.createExpense(expenseData);
  }
}
