export interface CreateExpenseDto {
  amount: number
  category?: string
  subcategory?: string
  description?: string
  date: string
}
