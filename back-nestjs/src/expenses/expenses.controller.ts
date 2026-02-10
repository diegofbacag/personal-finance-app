import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/expense.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('expenses')
@UseGuards(AuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getExpenses(@Req() req) {
    const userId: string = req.user.sub;
    return this.expensesService.getExpenses(userId);
  }

  @Post()
  create(@Req() req, @Body() expenseData: CreateExpenseDto) {
    const userId: string = req.user.sub;
    return this.expensesService.createExpense(expenseData, userId);
  }

  @Delete(':id')
  async deleteExpense(@Req() req, @Param('id') expenseId: string) {
    const userId: string = req.user.sub;
    await this.expensesService.deleteExpense(Number(expenseId), userId);
    return { success: true };
  }
}
