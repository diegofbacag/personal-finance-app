import { Button } from '@/src/components/ui/Button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { emailSignUp } from '../services/auth.service'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { PassThrough } from 'stream'
import { Logo } from '@/src/components/ui/Logo'

interface SignUpFormProps {
  onBack: () => void
}

export interface Credentials {
  first_name: string
  email: string
  password: string
}

export const SignUpForm = ({ onBack }: SignUpFormProps) => {
  const router = useRouter()
  const [credentials, setCredentials] = useState<Credentials>({
    first_name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignUpFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!credentials.first_name.trim()) {
      return 'Ingresa tu nombre.'
    }

    if (!credentials.email.trim()) {
      return 'Ingresa tu correo electrónico.'
    }

    if (!/^\S+@\S+\.\S+$/.test(credentials.email)) {
      return 'Correo electrónico inválido.'
    }

    if (!credentials.password || credentials.password.length < 6) {
      return 'La contraseña debe tener mínimo 6 caracteres.'
    }

    return null
  }

  const handleSubmitForm = async () => {
    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setError(null)
      setIsLoading(true)

      await emailSignUp(credentials)

      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      console.log('Resultado sign up form:', result)

      if (!result?.ok) {
        setError('La cuenta fue creada, pero no se pudo iniciar sesión.')
        setIsLoading(false)
        return
      }

      console.log('Resultado sign up form:', result)

      router.push('/app/transactions')
    } catch (error: unknown) {
      let message = 'Algo salió mal. Inténtalo de nuevo.'

      if (axios.isAxiosError(error)) {
        const status = error.response?.status

        if (status === 409) {
          message = 'Este correo ya está registrado. Intenta iniciar sesión.'
        } else {
          message = error.response?.data?.message ?? message
        }
      }

      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-start w-full">
        <Image
          src="svg/icons/left-arrow.svg"
          alt="go back icon"
          height={20}
          width={20}
          onClick={onBack}
          className="cursor-pointer"
        />
      </div>
      <div>
        <Logo height={40} width={40} />
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-[#5c5c5c] font-alfa text-xl leading-none">
          Tu nuevo espacio financiero
        </p>
        <p className="text-[#5c5c5c] font-alfa text-sm">
          Crea tu cuenta con correo y contraseña
        </p>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col gap-1 w-full">
          <p className="text-[#5c5c5c] text-sm">Nombre</p>
          <input
            name="first_name"
            className="p-2 text-[#5c5c5c] rounded-2xl h-12 text-sm border-2 border-[#eaeaea] w-full focus:border-[#5c5c5c] focus:outline-none"
            placeholder="Ingresa tu nombre"
            onChange={handleSignUpFormChange}
            value={credentials.first_name}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <p className="text-[#5c5c5c] text-sm">Correo electrónico</p>
          <input
            name="email"
            className="p-2 text-[#5c5c5c] rounded-2xl h-12 text-sm border-2 border-[#eaeaea] w-full focus:border-[#5c5c5c] focus:outline-none"
            placeholder="Ingresa tu correo electrónico"
            onChange={handleSignUpFormChange}
            value={credentials.email}
          />
        </div>
        <div>
          <p className="flex flex-col gap-1 text-[#5c5c5c] text-sm">
            Contraseña
          </p>
          <input
            name="password"
            type="password"
            className="p-2 text-[#5c5c5c] rounded-2xl h-12 text-sm border-2 border-[#eaeaea] w-full focus:border-[#5c5c5c] focus:outline-none"
            placeholder="Ingresa tu contraseña"
            onChange={handleSignUpFormChange}
            value={credentials.password}
          ></input>
        </div>
        <p className="text-xs text-[#c1121f]">{error}</p>
      </div>

      <div className="flex flex-col items-center w-full gap-2">
        <Button
          text={isLoading ? 'Creando cuenta...' : 'Registrate'}
          variant="dark"
          onClick={handleSubmitForm}
          className="w-full"
          disabled={isLoading}
        />
        <p className="text-xs text-[#5c5c5c]">
          {isLoading && 'La primera carga puede tardar hasta 50 segundos.'}
        </p>
      </div>
    </>
  )
}
