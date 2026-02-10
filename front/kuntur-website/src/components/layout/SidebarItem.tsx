interface SidebarItemProps {
  text: string
  active?: boolean
}

export const SidebarItem = ({ text, active = false }: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center font-medium text-xs text-[#5c5c5c] gap-1 rounded-lg py-2 px-2 ${
        active && 'bg-[#e6e6e6]'
      }`}
    >
      <p>{text}</p>
    </div>
  )
}
