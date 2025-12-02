interface ButtonProps {
  text: string
  variant?: 'light' | 'dark'
  onClick?: () => void
}

export const Button = ({ text, variant = 'dark', onClick }: ButtonProps) => {
  const base =
    'flex flex-row items-center justify-center h-10 w-40 rounded-xl cursor-pointer w-full font-medium text-sm'
  const styles =
    variant === 'light'
      ? 'bg-[#dbf2d9] text-[#0a7242]'
      : 'bg-[#04644f] text-white'
  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      <p>{text}</p>
    </button>
  )
}
