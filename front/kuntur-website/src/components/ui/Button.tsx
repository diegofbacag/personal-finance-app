interface ButtonProps {
  text?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark' | 'none' | 'white'
  onClick?: () => void
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
}

export const Button = ({
  text,
  variant = 'dark',
  onClick,
  children,
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'h-8 px-1 text-sm font-medium',
    md: 'h-10 px-4 text-sm font-medium',
    lg: 'h-12 px-6 text-base font-bold tracking-wide',
    xl: 'h-14 px-8 text-lg font-bold',
  }

  const base =
    'flex items-center justify-center rounded-lg font-sans  transition-colors'

  const variantStyles = {
    light: 'bg-[#dbf2d9] text-[#1F3B2E]',
    dark: 'bg-primary text-white',
    none: 'text-black',
    white: 'bg-white text-primary',
  }

  const disabledStyles = 'bg-[#9bd6b8] text-white cursor-not-allowed opacity-80'

  const enabledStyles = `cursor-pointer ${variantStyles[variant]}`

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`
        ${base}
        ${sizeClasses[size]}
        ${disabled ? disabledStyles : enabledStyles}
        ${className}
      `}
    >
      {children ?? <p>{text}</p>}
    </button>
  )
}
