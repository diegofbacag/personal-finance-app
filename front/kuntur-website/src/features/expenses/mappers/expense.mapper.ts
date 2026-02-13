import { CreateExpenseDto, TransactionType } from '../types/expense.dto'

import { Expense } from '../types/expense.model'

export const mapFormToCreateExpenseDTO = (
  expense: Expense,
): CreateExpenseDto => ({
  amount: Number(expense.amount),
  category: expense.category || undefined,
  subcategory: expense.subcategory || undefined,
  description: expense.description || undefined,
  date: expense.date,
  type: TransactionType.EXPENSE,
})
