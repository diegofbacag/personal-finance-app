import { Button } from '@/src/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { emailSignIn } from '../services/auth.service'
import { useRouter } from 'next/navigation'

interface SignInFormProps {
  onBack: () => void
}

export const SignInForm = ({ onBack }: SignInFormProps) => {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleFormChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitForm = async () => {
    try {
      const data = await emailSignIn(form)

      localStorage.setItem('accessToken', data.access_token)

      router.push('/expenses/my-expenses')
    } catch (e) {}
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
        <Image src="/img/mail.png" alt="mail image" height={60} width={60} />
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
            className="p-2 text-[#5c5c5c] rounded-2xl h-12 text-sm border-2 border-[#eaeaea] w-full focus:border-[#5c5c5c] focus:outline-none"
            placeholder="mail@mail.com"
            onChange={handleFormChange}
          />
        </div>
        <div>
          <p className="flex flex-col gap-1 text-[#5c5c5c] text-sm">
            Contraseña
          </p>
          <input
            name="password"
            type="password"
            value={form.password}
            className="p-2 text-[#5c5c5c] rounded-2xl h-12 text-sm border-2 border-[#eaeaea] w-full focus:border-[#5c5c5c] focus:outline-none"
            placeholder="password"
            onChange={handleFormChange}
          ></input>
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <Button
          text="Iniciar sesión"
          variant="dark"
          onClick={handleSubmitForm}
        />
      </div>
    </>
  )
}
