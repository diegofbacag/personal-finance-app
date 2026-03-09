'use client'
import Image from 'next/image'
import { SidebarItem } from './SidebarItem'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Logo } from '../ui/Logo'
import { LogoIcon } from '../ui/LogoIcon'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { data: session, status } = useSession()

  const router = useRouter()
  const handleLogout = () => {
    if (session?.user) {
      signOut({ callbackUrl: '/' })
    } else {
      router.push('/auth')
    }
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
    <aside className="hidden md:flex sticky top-0 h-screen font-sans flex-col justify-between w-50 bg-white border-r-[1.5px] border-[#00000014]">
      <div className=" ">
        <div className="flex items-center justify-start pl-5">
          <div className="flex gap-1 text-primary size-18 flex items-center justify-center">
            <LogoIcon height={100} width={100} />
            <Logo height={150} width={150} />
          </div>

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
          <div className="flex flex-col gap-2 pl-2">
            {/* <div className="flex gap-2 items-center justify-start">
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
            </div> */}

            <div className="flex flex-col gap-1 p-2">
              <SidebarItem
                text="Dashboard"
                iconSrc={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#1919e6"
                    viewBox="0 0 256 256"
                  >
                    <path d="M122.34,109.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0,0-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32ZM128,35.31,156.69,64,128,92.69,99.31,64Zm5.66,111a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0,0-11.32ZM128,220.69,99.31,192,128,163.31,156.69,192Zm109.66-98.35-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,237.66,122.34ZM192,156.69,163.31,128,192,99.31,220.69,128Zm-82.34-34.35-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,0,11.32l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,109.66,122.34ZM64,156.69,35.31,128,64,99.31,92.69,128Z"></path>
                  </svg>
                }
              />
              <SidebarItem
                text="Mis movimientos"
                active={true}
                iconSrc={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#1919e6"
                    viewBox="0 0 256 256"
                  >
                    <path d="M80,40a40,40,0,1,0,40,40A40,40,0,0,0,80,40Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,104Zm96,16a40,40,0,1,0-40-40A40,40,0,0,0,176,120Zm0-64a24,24,0,1,1-24,24A24,24,0,0,1,176,56ZM80,136a40,40,0,1,0,40,40A40,40,0,0,0,80,136Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,200Zm136-24a8,8,0,0,1-8,8H184v24a8,8,0,0,1-16,0V184H144a8,8,0,0,1,0-16h24V144a8,8,0,0,1,16,0v24h24A8,8,0,0,1,216,176Z"></path>
                  </svg>
                }
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
              className={!session?.user ? 'scale-x-[-1]' : ''}
            />
          </div>
          <p className="text-sm font-alfa font-medium text-[#5c5c5c] leading-none">
            {status === 'loading'
              ? 'Cargando...'
              : session?.user
                ? 'Cerrar Sesión'
                : 'Iniciar Sesión'}
          </p>
        </div>
      </div>
    </aside>
  )
}
