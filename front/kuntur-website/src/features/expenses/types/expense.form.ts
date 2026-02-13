import { TransactionType } from './expense.dto'

export interface ExpenseForm {
  amount: string
  category?: string
  subcategory?: string
  description?: string
  date: string
  type: TransactionType
}
