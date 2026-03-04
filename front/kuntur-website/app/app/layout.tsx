'use client'

import { Sidebar } from '@/src/components/layout/Sidebar'
import { useState } from 'react'

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <div className="flex flex-row w-full">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 w-full">{children}</div>
    </div>
  )
}
