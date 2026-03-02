export interface TransactionDto {
  amount: number
  date: string
  created_at: Date
  description?: string
  id: string
  subcategory_code: string
  subcategory_name: string
  category_code: string
  category_name: string
  tag?: string
}
