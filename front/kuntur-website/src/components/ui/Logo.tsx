import Image from 'next/image'

interface LogoProps {
  height: number
  width: number
}

export const Logo = ({ height, width }: LogoProps) => {
  return (
    <Image src="/svg/k.svg" alt="kuntur logo" height={height} width={width} />
  )
}
