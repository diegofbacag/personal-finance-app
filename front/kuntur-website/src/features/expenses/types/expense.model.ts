import { TransactionType } from './expense.dto'
import { CategoryCode, SubcategoryCode } from './transactions.types'

export interface Expense {
  id?: string
  amount: number
  category?: string
  subcategory?: string
  description?: string
  date: string
  type: TransactionType
}

export type Transaction<C extends CategoryCode = CategoryCode> = {
  id?: string
  amount: number
  description?: string
  category?: C
  subcategory?: SubcategoryCode<C>
  tag?: string
  date: string
}
