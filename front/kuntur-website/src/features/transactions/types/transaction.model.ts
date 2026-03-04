// export interface tempTransaction {
//   id: string
//   amount: number
//   description?: string
//   subcategory_id?: string
//   category_id?: string
//   date: string
//   tag?: string
// }

export interface Transaction {
  amount: number
  date: string
  created_at: Date
  description?: string
  id: string
  subcategory_id: string
  subcategory_label: string
  category_id: string
  category_label: string
  tag?: string
}

// export type Transaction<C extends CategoryCode = CategoryCode> = {
//   id?: string
//   amount: number
//   description?: string
//   category?: C
//   subcategory?: SubcategoryCode<C>
//   tag?: string
//   date: string
// }
