import Image from 'next/image'
import { ContinueWithGoogleButton } from './ContinueWithGoogleButton'
import { Button } from '@/src/components/ui/Button'
import { Logo } from '@/src/components/ui/Logo'
import Link from 'next/link'
import { LogoIcon } from '@/src/components/ui/LogoIcon'

interface AuthHomeProps {
  onSignIn?: () => void
  onSignUp?: () => void
}

export const AuthHome = ({ onSignIn, onSignUp }: AuthHomeProps) => {
  return (
    <>
      <div className="flex flex-col items-center h-34">
        <LogoIcon height={50} width={50} />
        <Logo height={50} width={100} />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {/* <p className="text-primary font-sans text-4xl leading-none font-bold">
          Kuntur
        </p> */}
        <p className="text-[#5c5c5c] font-alfa text-md">
          Organiza tu dinero. Diseña tu futuro.
        </p>
      </div>

      <div className="flex flex-col items-center w-full gap-2">
        {/* <ContinueWithGoogleButton />

        <div className="w-full flex items-center gap-4">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-500 text-sm font-medium">o</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div> */}

        <Button
          text="Iniciar sesión con correo"
          variant="dark"
          onClick={onSignIn}
          className="w-full"
        />
        <Button
          text="Crear cuenta con correo"
          variant="light"
          onClick={onSignUp}
          className="w-full"
        />
      </div>
    </>
  )
}
