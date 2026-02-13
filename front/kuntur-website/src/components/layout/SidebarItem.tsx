import Image from 'next/image'

interface SidebarItemProps {
  text: string
  active?: boolean
  iconSrc?: string | null
}

export const SidebarItem = ({
  text,
  active = false,
  iconSrc = null,
}: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center gap-2 font-medium text-xs text-[#5c5c5c] gap-1 rounded-lg py-2 px-2 ${
        active && 'bg-[#e6e6e6]'
      }`}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          height={18}
          width={18}
          alt="expeses icon"
          className=""
        />
      )}

      <p className="">{text}</p>
    </div>
  )
}
