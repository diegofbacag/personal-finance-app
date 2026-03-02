import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  height: number
  width: number
}

export const Logo = ({ height, width }: LogoProps) => {
  return (
    <Link href={'/'}>
      <Image src="/svg/k.svg" alt="kuntur logo" height={height} width={width} />
    </Link>
  )
}
