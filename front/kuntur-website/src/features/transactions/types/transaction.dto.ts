export interface CreateTransactionDto {
  amount: number
  description?: string | null
  subcategory_id?: string | null
  category_id?: string | null
  date: string
  tag?: string | null
}

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
