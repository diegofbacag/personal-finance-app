import { CategoryCode, SubcategoryCode } from './transactions.types'

export interface TransactionForm<C extends CategoryCode = CategoryCode> {
  amount: string
  description?: string
  category_code: C
  subcategory_code: SubcategoryCode<C> | 'Subcategoría'
  date: string
}
