import axios from 'axios'

export const getExpenses = async () => {
  const { data } = await axios.get('http://localhost:8080/expenses')
  console.log('getExpenses service: ', data)
  return data
}

export const createExpense = async (newExpense) => {
  const payload = newExpense
  const { data } = await axios.post('http://localhost:8080/expenses', payload)
  console.log('create expense', data)
  return data
}

export const deleteExpense = async (id: string) => {
  await axios.delete(`http://localhost:8080/expenses/${id}`)
}
