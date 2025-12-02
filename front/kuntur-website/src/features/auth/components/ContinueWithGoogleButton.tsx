import { GoogleIcon } from '@/src/components/ui/icons/GoogleIcon'
///green colour #04644f
export const ContinueWithGoogleButton = () => {
  return (
    <button className="flex flex-row items-center justify-center gap-2 bg-white h-10 w-40 border rounded-xl cursor-pointer w-full">
      <GoogleIcon />
      <p className="text-black font-medium text-sm ">Continuar con google</p>
    </button>
  )
}
