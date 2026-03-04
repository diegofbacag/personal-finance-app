import axios from 'axios'

import { CreateTransactionDto, TransactionDto } from '../types/transaction.dto'
import { mapTransactionDtoToTransaction } from '../mappers/transaction.mapper'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const getExpenses = async () => {
  const { data } = await axios.get(`${apiUrl}/transactions`)
  console.log('getExpenses service: ', data)
  return data
}

export const createExpense = async (dto: CreateTransactionDto) => {
  const { data } = await axios.post(`${apiUrl}/transactions`, dto)
  const transaction: TransactionDto = data.transaction
  return mapTransactionDtoToTransaction(transaction)
}

export const deleteExpense = async (id: string) => {
  const accessToken = localStorage.getItem('accessToken')
  await axios.delete(`${apiUrl}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}
