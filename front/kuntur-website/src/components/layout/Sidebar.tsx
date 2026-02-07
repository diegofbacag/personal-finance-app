import Image from 'next/image'
import { SidebarItem } from './SidebarItem'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/')
  }
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
    <aside className="flex flex-col justify-between w-46 bg-[#f5f5f5] font-poppins p-2 pb-5">
      <div className="">
        <div className="flex items-center justify-between mb-10 pb-2">
          <Link href="/">
            <p className="font-bold text-[#0066FF] text-xl tracking-wide">
              Vyse
            </p>
          </Link>

          {/* <button className="cursor-pointer" onClick={toggleSidebar}>
            <Image
              src="/svg/icons/collapse.svg"
              height={24}
              width={24}
              alt="collapse icon"
            />
          </button> */}
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-alfa text-[#5c5c5c] leading-none">
              Gastos
            </p>
            <div className="pl-2">
              <SidebarItem text="Mis gastos" active={true} />
              <SidebarItem text="Dashboard" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div
          className="flex flex-row items-center justify-center gap-1 cursor-pointer"
          onClick={handleLogout}
        >
          <div className=" rounded-full p-1">
            <Image
              src="/svg/icons/logout.svg"
              height={20}
              width={20}
              alt="avatar icon"
            />
          </div>
          <p className="text-black text-sm">Cerrar Sesión</p>
        </div>
      </div>
    </aside>
  )
}
