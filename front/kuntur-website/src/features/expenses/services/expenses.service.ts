import axios from 'axios'

import { CreateTransactionDto, TransactionDto } from '../types/transaction.dto'
import { mapTransactionDtoToTransaction } from '../mappers/transaction.mapper'
import { baseUrl } from '@/lib/config'

export const getExpenses = async () => {
  const { data } = await axios.get(`${baseUrl}/transactions`)
  console.log('getExpenses service: ', data)
  return data
}

export const createExpense = async (dto: CreateTransactionDto) => {
  const { data } = await axios.post(`${baseUrl}/transactions`, dto)
  const transaction: TransactionDto = data.transaction
  return mapTransactionDtoToTransaction(transaction)
}

export const deleteExpense = async (id: string) => {
  const accessToken = localStorage.getItem('accessToken')
  await axios.delete(`${baseUrl}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}
