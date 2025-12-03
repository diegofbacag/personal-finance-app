interface ButtonProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

export const Button = ({
  text,
  variant = 'dark',
  onClick,
  children,
  size = 'md',
  className,
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'h-8 px-1 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  const base =
    'flex flex-row items-center justify-center rounded-lg cursor-pointer font-sans font-medium text-sm'
  const styles =
    variant === 'light'
      ? 'bg-[#dbf2d9] text-[#0a7242]'
      : 'bg-[#04644f] text-white'
  return (
    <button
      className={`${base} ${styles} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children ?? <p>{text}</p>}
    </button>
  )
}
