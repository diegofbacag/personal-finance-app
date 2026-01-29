import axios from 'axios'

export const createExpense = async (newExpense) => {
  const payload = newExpense
  const { data } = await axios.post('http://localhost:8080/expenses', payload)
  console.log('create expense', data)
  return data
}
