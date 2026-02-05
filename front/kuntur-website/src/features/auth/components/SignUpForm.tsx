import { Button } from '@/src/components/ui/Button'

import Image from 'next/image'
import { useState } from 'react'
import { emailSignUp } from '../services/auth.service'
import { useRouter } from 'next/navigation'

interface SignUpFormProps {
  onBack: () => void
}

export interface Credentials {
  email: string
  password: string
}

export const SignUpForm = ({ onBack }: SignUpFormProps) => {
  const router = useRouter()
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  })

  const handleSignUpFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitForm = async () => {
    try {
      await emailSignUp(credentials)

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
          Tu nuevo espacio financiero
        </p>
        <p className="text-[#5c5c5c] font-alfa text-sm">
          Crea tu cuenta con correo y contraseña
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-1 w-full">
          <p className="text-[#5c5c5c] text-sm">Correo electrónico</p>
          <input
            name="email"
            className="p-2 text-[#5c5c5c] rounded-2xl h-12 text-sm border-2 border-[#eaeaea] w-full focus:border-[#5c5c5c] focus:outline-none"
            placeholder="mail@mail.com"
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
            placeholder="password"
            onChange={handleSignUpFormChange}
            value={credentials.password}
          ></input>
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <Button text="Registrate" variant="dark" onClick={handleSubmitForm} />
      </div>
    </>
  )
}
