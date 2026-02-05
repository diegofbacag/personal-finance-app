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
import { JwtSecretRequestType } from '@nestjs/jwt';

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
  create(@Body() expenseData: CreateExpenseDto) {
    return this.expensesService.createExpense(expenseData);
  }

  @Delete(':id')
  async deleteExpense(@Param('id') id: string) {
    await this.expensesService.deleteExpense(id);
    return { success: true };
  }
}
