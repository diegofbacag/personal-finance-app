import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  height: number
  width: number
}

export const LogoIcon = ({ height, width }: LogoProps) => {
  return (
    <Link href={'/'}>
      <Image
        src="/brand/logo-icon-blue.png"
        alt="flou icon"
        height={height}
        width={width}
      />
    </Link>
  )
}
