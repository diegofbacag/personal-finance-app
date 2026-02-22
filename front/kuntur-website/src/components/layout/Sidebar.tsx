'use client'
import Image from 'next/image'
import { SidebarItem } from './SidebarItem'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [isLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('accessToken')
    }
    return false
  })
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
    <aside className="hidden md:flex sticky top-0 h-screen  flex-col justify-between w-50 bg-[#f5f5f5] font-poppins border-r-[1px] border-[#00000014]">
      <div className="pt-3 px-4">
        <div className="flex items-center  mb-4 pb-3 border-b-[1px] border-[#00000014]">
          <Image src="/svg/k.svg" alt="logo image" height={20} width={20} />
          <Link href="/">
            <p className="font-alpha font-bold text-[#1F3B2E] text-md tracking-wide ">
              untur
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
            <div className="flex gap-2 items-center justify-start">
              <Image
                src="/img/icons/house-4.png"
                height={14}
                width={14}
                alt="expeses icon"
                className=""
              />
              <p className="text-sm font-alfa text-[#5c5c5c] leading-none">
                Movimientos
              </p>
            </div>

            <div className="pl-4">
              <SidebarItem
                text="Mis movimientos"
                active={true}
                iconSrc={'/img/icons/swap-arrow.png'}
              />
              {/* <SidebarItem
                text="Dashboard"
                iconSrc={'/img/icons/dashboard-2.png'}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <div
          className="flex flex-row items-center justify-center gap-1 py-4 cursor-pointer border-t-[1px] border-[#00000014] w-full"
          onClick={handleLogout}
        >
          <div className=" rounded-full">
            <Image
              src="/svg/icons/logout.svg"
              height={16}
              width={16}
              alt="avatar icon"
              className={!isLoggedIn ? 'scale-x-[-1]' : ''}
            />
          </div>
          <p className="text-sm font-alfa text-[#5c5c5c] leading-none">
            {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
          </p>
        </div>
      </div>
    </aside>
  )
}
