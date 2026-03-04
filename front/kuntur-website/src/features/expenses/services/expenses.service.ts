import axios from 'axios'

import { CreateTransactionDto } from '../types/transaction.dto'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const getExpenses = async () => {
  const { data } = await axios.get(`${apiUrl}/transactions`)
  console.log('getExpenses service: ', data)
  return data
}

export const createExpense = async (dto: CreateTransactionDto) => {
  const { data } = await axios.post(`${apiUrl}/transactions`, dto)
  return data
}

export const deleteExpense = async (id: string) => {
  const accessToken = localStorage.getItem('accessToken')
  await axios.delete(`${apiUrl}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}
