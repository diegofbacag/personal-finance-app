export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface CreateExpenseDto {
  amount: number
  category?: string
  subcategory?: string
  description?: string
  date: string
  type: TransactionType
}

export interface ResponseExpenseDto {
  id: string
  amount: number
  category?: string
  subcategory?: string
  description?: string
  date: string
  type: TransactionType
}
