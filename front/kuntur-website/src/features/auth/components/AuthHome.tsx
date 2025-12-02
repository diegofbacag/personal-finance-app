import Image from 'next/image'

export const AuthHome = () => {
  return (
    <>
      <div className="flex justify-start w-full">
        <Image
          src="svg/icons/left-arrow.svg"
          alt="go back icon"
          height={20}
          width={20}
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
            className="p-2 text-[#5c5c5c] rounded-2xl h-12 text-sm border-2 border-[#eaeaea] w-full focus:border-[#5c5c5c] focus:outline-none"
            placeholder="mail@mail.com"
          />
        </div>
        <div>
          <p className="flex flex-col gap-1 text-[#5c5c5c] text-sm">
            Contraseña
          </p>
          <input
            className="p-2 text-[#5c5c5c] rounded-2xl h-12 text-sm border-2 border-[#eaeaea] w-full focus:border-[#5c5c5c] focus:outline-none"
            placeholder="mail@mail.com"
          ></input>
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <button className="bg-[#dbf2d9] h-10 w-40 rounded-xl cursor-pointer w-full">
          <p className="text-[#0a7242] font-medium text-sm">Login</p>
        </button>
        <div>
          <p className="text-[#5c5c5c]">o</p>
        </div>
        <button className="bg-[#04644f] h-10 w-40 rounded-xl cursor-pointer w-full">
          <p className="text-white font-medium text-sm">Login with google</p>
        </button>
      </div>
    </>
  )
}
