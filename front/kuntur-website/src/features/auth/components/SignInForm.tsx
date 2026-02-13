import { Button } from '@/src/components/ui/Button'
import Image from 'next/image'
import { useState } from 'react'
import { emailSignIn } from '../services/auth.service'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface SignInFormProps {
  onBack: () => void
}

export const SignInForm = ({ onBack }: SignInFormProps) => {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitForm = async () => {
    if (isLoading) return

    try {
      setError(null)
      setIsLoading(true)

      const data = await emailSignIn(form)
      localStorage.setItem('accessToken', data.access_token)

      router.push('/expenses/my-expenses')
    } catch (error: unknown) {
      let message = 'Algo salió mal. Inténtalo de nuevo.'

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message ?? message
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
          onClick={!isLoading ? onBack : undefined}
          className={`cursor-pointer ${isLoading ? 'opacity-40' : ''}`}
        />
      </div>

      <div>
        <Image
          src="/img/kuntur-logo.jpeg"
          alt="logo image"
          height={40}
          width={40}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-[#5c5c5c] font-alfa text-xl leading-none">
          Bienvenido a tu espacio financiero
        </p>
        <p className="text-[#5c5c5c] font-alfa text-sm">
          Ingresa tu correo y contraseña
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-1 w-full">
          <p className="text-[#5c5c5c] text-sm">Correo electrónico</p>
          <input
            name="email"
            type="email"
            value={form.email}
            disabled={isLoading}
            className="p-2 text-[#5c5c5c] rounded-2xl h-12 text-sm border-2 border-[#eaeaea] w-full focus:border-[#5c5c5c] focus:outline-none disabled:opacity-50"
            placeholder="Ingresa tu correo electrónico"
            onChange={handleFormChange}
          />
        </div>

        <div>
          <p className="text-[#5c5c5c] text-sm">Contraseña</p>
          <input
            name="password"
            type="password"
            value={form.password}
            disabled={isLoading}
            className="p-2 text-[#5c5c5c] rounded-2xl h-12 text-sm border-2 border-[#eaeaea] w-full focus:border-[#5c5c5c] focus:outline-none disabled:opacity-50"
            placeholder="Ingresa tu contraseña"
            onChange={handleFormChange}
          />
        </div>
        <p className="text-xs text-[#c1121f]">{error}</p>
      </div>

      <div className="flex flex-col items-center w-full gap-2 disabled:bg-[#9ca3af] disabled:text-white disabled:cursor-not-allowed">
        <Button
          text={isLoading ? 'Ingresando…' : 'Iniciar sesión'}
          variant="dark"
          onClick={handleSubmitForm}
          className="w-full"
          disabled={isLoading}
        />
      </div>
    </>
  )
}
