import Image from 'next/image'

export const AuthHome = () => {
  return (
    <>
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

      <div className="flex flex-col items-center w-full gap-2">
        <button className="bg-[#dbf2d9] h-10 w-40 rounded-xl cursor-pointer w-full">
          <p className="text-[#0a7242] font-medium text-sm">Login</p>
        </button>
        <div className="w-full flex items-center gap-4">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-500 text-sm font-medium">o</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        <button className="bg-[#04644f] h-10 w-40 rounded-xl cursor-pointer w-full">
          <p className="text-white font-medium text-sm">Login with google</p>
        </button>
      </div>
    </>
  )
}
