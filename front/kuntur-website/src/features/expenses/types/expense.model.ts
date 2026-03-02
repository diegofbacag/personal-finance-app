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

export interface TransactionTest {
  id: string
  amount: number
  date: string
  created_at: Date
  description?: string
  subcategory_code: string
  subcategory_name: string
  category_code: string
  category_name: string
  tag?: string
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
