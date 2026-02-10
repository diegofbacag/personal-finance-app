import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const getExpenses = async () => {
  const accessToken = localStorage.getItem('accessToken')
  const { data } = await axios.get(`${apiUrl}/expenses`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  console.log('getExpenses service: ', data)
  return data
}

export const createExpense = async (newExpense) => {
  const accessToken = localStorage.getItem('accessToken')
  const payload = newExpense
  const { data } = await axios.post(`${apiUrl}/expenses`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  console.log('create expense', data)
  return data
}

export const deleteExpense = async (id: string) => {
  const accessToken = localStorage.getItem('accessToken')
  await axios.delete(`${apiUrl}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}
