import axios from 'axios'
import { Credentials } from '../components/SignUpForm'

export const emailSignUp = async (newUser: Credentials) => {
  const payload = newUser
  const { data } = await axios.post(
    'http://localhost:8080/auth/signup',
    payload,
  )
  console.log('emailSignUp service', data)
  return data
}

export const emailSignIn = async (credentials: Credentials) => {
  const payload = credentials
  const { data } = await axios.post(
    'http://localhost:8080/auth/signin',
    payload,
  )
  console.log('emailSignUp service', data)
  return data
}
