interface ButtonProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
  onClick?: () => void
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

export const Button = ({
  text,
  variant = 'dark',
  onClick,
  children,
  size = 'md',
  className = '',
  disabled = false,
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'h-8 px-1 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  const base =
    'flex items-center justify-center rounded-lg font-sans font-medium text-sm transition-colors'

  const variantStyles = {
    light: 'bg-[#dbf2d9] text-[#0E9053]',
    dark: 'bg-[#0E9053] text-white',
  }

  const disabledStyles = 'bg-[#9bd6b8] text-white cursor-not-allowed opacity-80'

  const enabledStyles = `cursor-pointer ${variantStyles[variant]}`

  return (
    <button
      type="button"
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
