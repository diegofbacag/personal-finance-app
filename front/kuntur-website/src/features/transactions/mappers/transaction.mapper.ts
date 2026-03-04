import { TransactionDto } from '../types/transaction.dto'
import { Transaction } from '../types/transaction.model'

export function mapTransactionDtoToTransaction(
  dto: TransactionDto,
): Transaction {
  const {
    category_code,
    category_name,
    subcategory_code,
    subcategory_name,
    ...rest
  } = dto

  return {
    ...rest,
    category_id: category_code,
    category_label: category_name,
    subcategory_id: subcategory_code,
    subcategory_label: subcategory_name,
  }
}
