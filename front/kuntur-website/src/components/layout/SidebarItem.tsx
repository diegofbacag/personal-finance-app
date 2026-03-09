import Image from 'next/image'
import { ReactNode } from 'react'

interface SidebarItemProps {
  text: string
  active?: boolean
  iconSrc?: ReactNode
}

export const SidebarItem = ({
  text,
  active = false,
  iconSrc = null,
}: SidebarItemProps) => {
  const base =
    'flex items-center justify-start gap-1 px-2 py-2 text-sm rounded-lg font-alfa font-medium'

  const state = active ? 'bg-neutral-soft text-primary/80' : 'text-text-muted'

  return (
    <div className={`${base} ${state}`}>
      {iconSrc && iconSrc}
      <p>{text}</p>
    </div>
  )
}
