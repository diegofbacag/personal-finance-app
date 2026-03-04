import axios from 'axios'

import { baseUrl } from '@/lib/config'
import { Credentials } from '../components/SignUpForm'

export const emailSignUp = async (newUser: Credentials) => {
  const payload = newUser
  const { data } = await axios.post(`/api/auth/signup`, payload)
  console.log('emailSignUp service', data)
  return data
}

export const emailSignIn = async (credentials: Credentials) => {
  const payload = credentials
  const { data } = await axios.post(`/api/auth/signin`, payload)
  console.log('emailSignUp service', data)
  return data
}
