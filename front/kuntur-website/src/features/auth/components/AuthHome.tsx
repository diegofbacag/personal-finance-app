import Image from 'next/image'
import { ContinueWithGoogleButton } from './ContinueWithGoogleButton'

export const AuthHome = () => {
  return (
    <>
      <div>
        <Image src="/img/mail.png" alt="mail image" height={60} width={60} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-[#04644f] font-sans text-4xl leading-none font-bold">
          Kuntur
        </p>
        <p className="text-[#5c5c5c] font-alfa text-md">
          Organiza tu dinero. Diseña tu futuro.
        </p>
      </div>

      <div className="flex flex-col items-center w-full gap-2">
        <ContinueWithGoogleButton />

        <div className="w-full flex items-center gap-4">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-500 text-sm font-medium">o</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>
        <button className="bg-[#dbf2d9] h-10 w-40 rounded-xl cursor-pointer w-full">
          <p className="text-[#0a7242] font-medium text-sm">
            Iniciar sesión con correo
          </p>
        </button>
        <button className="bg-[#dbf2d9] h-10 w-40 rounded-xl cursor-pointer w-full">
          <p className="text-[#0a7242] font-medium text-sm">
            Crear cuenta con correo
          </p>
        </button>
      </div>
    </>
  )
}
