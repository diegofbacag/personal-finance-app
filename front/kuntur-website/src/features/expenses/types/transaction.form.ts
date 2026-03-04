import { CategoryId, SubcategoryId } from '../constants/categories'

export interface TransactionForm<C extends CategoryId = CategoryId> {
  amount: string
  description?: string
  category_id?: C | null
  subcategory_id?: SubcategoryId<C> | null
  date: string
}
