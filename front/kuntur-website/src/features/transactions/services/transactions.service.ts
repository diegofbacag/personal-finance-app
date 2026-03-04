import axios from 'axios'

import { CreateTransactionDto, TransactionDto } from '../types/transaction.dto'
import { mapTransactionDtoToTransaction } from '../mappers/transaction.mapper'
import { baseUrl } from '@/lib/config'

export const getTransactions = async () => {
  const { data } = await axios.get(`/api/transactions`)
  console.log('getExpenses service: ', data)
  return data
}

export const createTransaction = async (dto: CreateTransactionDto) => {
  const { data } = await axios.post(`/api/transactions`, dto)
  const transaction: TransactionDto = data.transaction
  return mapTransactionDtoToTransaction(transaction)
}

export const deleteTransaction = async (id: string) => {
  await axios.delete(`/api/transactions/${id}`)
}
