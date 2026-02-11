export interface CreateExpenseDto {
  amount: number
  category?: string
  subcategory?: string
  description?: string
  date: string
}

export interface ResponseExpenseDto {
  id: string
  amount: number
  category?: string
  subcategory?: string
  description?: string
  date: string
}
