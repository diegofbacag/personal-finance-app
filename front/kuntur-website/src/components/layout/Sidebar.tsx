import Image from 'next/image'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  if (!isOpen) {
    return (
      <aside className="bg-white p-2">
        <button className="cursor-pointer" onClick={toggleSidebar}>
          <Image
            src="/svg/icons/hamburger.svg"
            height={24}
            width={24}
            alt="expand sidebar icon"
          />
        </button>
      </aside>
    )
  }
  return (
    <aside className="flex flex-col justify-between w-54 bg-[#f5f5f5] shadow-inner font-poppins p-2 pb-14">
      <div className="">
        <div className="flex items-center justify-between mb-10">
          <p className="font-bold text-[#0a7242]">Kuntur</p>
          <button className="cursor-pointer" onClick={toggleSidebar}>
            <Image
              src="/svg/icons/collapse.svg"
              height={24}
              width={24}
              alt="collapse icon"
            />
          </button>
        </div>
        <div className="border-b-2 py-1">
          <div
            className="flex items-center font-medium text-xs text-[#2f2f2f]
     bg-[#e6e6e6] gap-1
     rounded-xl py-2 px-2
     border border-[#d8d8d8]
     shadow-inner"
          >
            <Image
              src="/svg/icons/money.svg"
              height={20}
              width={20}
              alt="money icon"
            />
            <p>Mis gastos</p>
          </div>
          <div className="flex items-center font-medium text-xs text-[#2f2f2f] gap-1 rounded-xl py-2 px-2">
            <Image
              src="/svg/icons/money.svg"
              height={20}
              width={20}
              alt="money icon"
            />
            <p>Dashboard</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="flex flex-row items-center justify-center gap-1">
          <div className="bg-white rounded-full p-1">
            <Image
              src="/svg/icons/avatar.svg"
              height={20}
              width={20}
              alt="avatar icon"
            />
          </div>
          <p className="text-black text-sm">Nombre Apellido</p>
        </div>
      </div>
    </aside>
  )
}
