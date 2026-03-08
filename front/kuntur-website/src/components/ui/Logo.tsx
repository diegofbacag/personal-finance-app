import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  height: number
  width: number
}

export const Logo = ({ height, width }: LogoProps) => {
  return (
    <Link href={'/'}>
      <Image
        src="/img/flou-logo2.png"
        alt="flou logo"
        height={height}
        width={width}
      />
    </Link>
  )
}
