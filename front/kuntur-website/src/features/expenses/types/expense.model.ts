import { TransactionType } from './expense.dto'

export interface Expense {
  id?: string
  amount: number
  category?: string
  subcategory?: string
  description?: string
  date: string
  type: TransactionType
}
