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
      className={`flex items-center gap-2 rounded-lg py-2 px-3 ${
        active && 'bg-primary/20'
      }`}
    >
      {iconSrc && (
        // <Image
        //   src={iconSrc}
        //   height={18}
        //   width={18}
        //   alt="expeses icon"
        //   className=""
        // />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#1919e6"
          viewBox="0 0 256 256"
        >
          <path d="M216.49,184.49l-32,32a12,12,0,0,1-17-17L179,188H48a12,12,0,0,1,0-24H179l-11.52-11.51a12,12,0,0,1,17-17l32,32A12,12,0,0,1,216.49,184.49Zm-145-64a12,12,0,0,0,17-17L77,92H208a12,12,0,0,0,0-24H77L88.49,56.49a12,12,0,0,0-17-17l-32,32a12,12,0,0,0,0,17Z"></path>
        </svg>
      )}

      <p className="font-sans text-primary/80 text-xs">{text}</p>
    </div>
  )
}
