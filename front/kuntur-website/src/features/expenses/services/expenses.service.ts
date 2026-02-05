import axios from 'axios'

export const getExpenses = async () => {
  const accessToken = localStorage.getItem('accessToken')
  const { data } = await axios.get('http://localhost:8080/expenses', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  console.log('getExpenses service: ', data)
  return data
}

export const createExpense = async (newExpense) => {
  const accessToken = localStorage.getItem('accessToken')
  const payload = newExpense
  const { data } = await axios.post('http://localhost:8080/expenses', payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  console.log('create expense', data)
  return data
}

export const deleteExpense = async (id: string) => {
  const accessToken = localStorage.getItem('accessToken')
  await axios.delete(`http://localhost:8080/expenses/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}
