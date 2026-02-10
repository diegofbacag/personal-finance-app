import axios from 'axios'
import { Credentials } from '../components/SignUpForm'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const emailSignUp = async (newUser: Credentials) => {
  const payload = newUser
  const { data } = await axios.post(`${apiUrl}/auth/signup`, payload)
  console.log('emailSignUp service', data)
  return data
}

export const emailSignIn = async (credentials: Credentials) => {
  const payload = credentials
  const { data } = await axios.post(`${apiUrl}/auth/signin`, payload)
  console.log('emailSignUp service', data)
  return data
}
