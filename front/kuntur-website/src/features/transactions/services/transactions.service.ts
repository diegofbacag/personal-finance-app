import axios from 'axios'

import { CreateTransactionDto, TransactionDto } from '../types/transaction.dto'
import { mapTransactionDtoToTransaction } from '../mappers/transaction.mapper'

export const getTransactions = async () => {
  const { data } = await axios.get(`/api/transactions`)
  const transactions: TransactionDto[] = data.transactions

  return transactions.map(mapTransactionDtoToTransaction)
}

export const createTransaction = async (dto: CreateTransactionDto) => {
  const { data } = await axios.post(`/api/transactions`, dto)
  const transaction: TransactionDto = data.transaction
  return mapTransactionDtoToTransaction(transaction)
}

export const deleteTransaction = async (id: string) => {
  await axios.delete(`/api/transactions/${id}`)
}
