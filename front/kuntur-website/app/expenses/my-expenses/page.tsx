//color gris label
//  text-[#6c757d]

'use client'

import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import {
  createExpense,
  deleteExpense,
  getExpenses,
} from '@/src/features/expenses/services/expenses.service'
import { ExpenseForm } from '@/src/features/expenses/types/expense.form'
import { Expense } from '@/src/features/expenses/types/expense.model'
import { mapFormToCreateExpenseDTO } from '@/src/features/expenses/mappers/expense.mapper'
import {
  ResponseExpenseDto,
  TransactionType,
} from '@/src/features/expenses/types/expense.dto'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TransactionInputBar } from '@/src/features/expenses/components/expense-input/TransactionInputBar'

const MONTHS = [
  { label: 'Ene', value: 0 },
  { label: 'Feb', value: 1 },
  { label: 'Mar', value: 2 },
  { label: 'Abr', value: 3 },
  { label: 'May', value: 4 },
  { label: 'Jun', value: 5 },
  { label: 'Jul', value: 6 },
  { label: 'Ago', value: 7 },
  { label: 'Sep', value: 8 },
  { label: 'Oct', value: 9 },
  { label: 'Nov', value: 10 },
  { label: 'Dic', value: 11 },
]

const formatDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-')

  const months = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ]
  return `${Number(day)} ${months[Number(month) - 1]}.`
}

const formatDateShort = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-')

  const shortYear = year.slice(-2)

  return `${day}/${month}/${shortYear}`
}

function decimalToCents(value: string): number {
  return Math.round(Number(value) * 100)
}

function centsToDecimal(cents: number): string {
  return (cents / 100).toFixed(2)
}

const mockExpenses: Expense[] = [
  {
    id: 'demo-1',
    amount: 4590, // 45.90 en centavos
    category: 'Gastos libres',
    subcategory: 'Comer afuera',
    description: 'Cena en restaurante (Prueba)',
    date: '2026-02-15',
    type: TransactionType.EXPENSE,
  },
  {
    id: 'demo-2',
    amount: 1200, // 12.00 en centavos
    category: 'Gastos fijos',
    subcategory: 'Transporte',
    description: 'Taxi al trabajo (Prueba)',
    date: '2026-02-14',
    type: TransactionType.EXPENSE,
  },
  {
    id: 'demo-3',
    amount: 8999, // 89.99 en centavos
    category: 'Gastos libres',
    subcategory: 'Entretenimiento',
    description: 'Suscripción mensual streaming (Prueba)',
    date: '2026-02-13',
    type: TransactionType.EXPENSE,
  },
]
function getLocalDateISO() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
export default function MyExpensesPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  )
  const currentYear = new Date().getFullYear()

  const [expenseFormData, setExpenseFormData] = useState<ExpenseForm>({
    amount: '',
    category: '',
    subcategory: '',
    description: '',
    date: getLocalDateISO(),
    type: TransactionType.EXPENSE,
  })

  const [expenseHistory, setExpenseHistory] = useState<Expense[]>(mockExpenses)
  const [isMonthMenuOpen, setIsMonthMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    async function fetchExpenses() {
      console.log('fetchExpenses')
      try {
        const responseExpenseDto: ResponseExpenseDto[] = await getExpenses()
        setExpenseHistory(responseExpenseDto)
      } catch (error) {
        console.log('error', error)
      } finally {
      }
    }

    fetchExpenses()
  }, [])

  const handleExpenseFormInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    console.log(name, value)
    setExpenseFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitExpenseFormData = async () => {
    if (!isLoggedIn) {
      alert('Debes iniciar sesión para registrar un movimiento.')
      return
    }

    const newExpense: Expense = {
      id: `temp-${Date.now()}`,
      amount: decimalToCents(expenseFormData.amount),
      category: expenseFormData.category || undefined,
      subcategory: expenseFormData.subcategory || undefined,
      description: expenseFormData.description || undefined,
      date: expenseFormData.date,
      type: TransactionType.EXPENSE,
    }

    setExpenseHistory((prev) => [...prev, newExpense])

    try {
      const savedExpense: Expense = await createExpense(
        mapFormToCreateExpenseDTO(newExpense),
      )

      setExpenseHistory((prev) =>
        prev.map((e) => (e.id === newExpense.id ? savedExpense : e)),
      )
    } catch (error) {
      setExpenseHistory((prev) => prev.filter((e) => e.id !== newExpense.id))
      alert('Error al guardar el gasto.')
    }
  }

  const filteredExpenses = expenseHistory.filter((expense) => {
    const [year, month] = expense.date.split('-').map(Number)

    return month - 1 === selectedMonth && year === currentYear
  })

  const tableEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    tableEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [expenseHistory])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/')
  }
  return (
    <main className="flex flex-col   font-poppins bg-[#FAFAFA] min-h-screen h-full items-center">
      <div className="flex items-center justify-between md:hidden bg-white w-full h-10 px-3 border-b-[1px] border-[#00000014]">
        <Link href="/">
          <p className="font-alpha font-bold text-[#1F3B2E] text-md tracking-wide ">
            Kuntur
          </p>
        </Link>
        <div>
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
      </div>
      <div className="relative flex flex-col w-[95vw] md:w-[68vw] gap-3 py-10">
        <header className="flex align-top items-center justify-between mb-4">
          <h1 className="items-center text-3xl tracking-wide font-bold text-black mt-0 align-top leading-none border-b-1 pb-4 border-[#00000014] w-full">
            Mis movimientos
          </h1>
        </header>

        <div className="flex flex-row items-center justify-between gap-2">
          <div className="p-3 px-4 rounded-2xl border-[1px] border-[#00000014] bg-white">
            <p className="text-sm text-black  tracking-wider ">{`Total: S/ ${centsToDecimal(
              filteredExpenses.reduce((sum, expense) => {
                return sum + expense.amount
              }, 0),
            )}`}</p>
          </div>
          <div className="relative inline-block">
            <div
              className="cursor-pointer flex items-center p-3 px-4 rounded-2xl border-[1px] border-[#00000014] text-sm gap-2  tracking-wide bg-white text-black"
              onClick={() => setIsMonthMenuOpen((prev) => !prev)}
            >
              <p>Mes:</p>
              <div className="bg-[#DCE9DF] rounded-lg p-0.5 px-2">
                <p>{MONTHS[selectedMonth].label}</p>
              </div>
              <Image
                src="/img/angledown-icon.png"
                height={15}
                width={15}
                alt="send icon"
                className=""
              />
            </div>

            {isMonthMenuOpen && (
              <div className="absolute left-0 mt-1 w-max bg-white rounded-md shadow-md border border-gray-200 z-10 p-3 text-sm ">
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedMonth(0)
                      setIsMonthMenuOpen(false)
                    }}
                  >
                    Ene
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedMonth(1)
                      setIsMonthMenuOpen(false)
                    }}
                  >
                    Feb
                  </div>
                  <div className="cursor-pointer">Mar</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>Abr</div>
                  <div>May</div>
                  <div>Jun</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>Jul</div>
                  <div>Ago</div>
                  <div>Sep</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>Oct</div>
                  <div>Nov</div>
                  <div>Dic</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <section
          aria-label="Expenses table"
          className="flex flex-row justify-center pb-28"
        >
          <div className="w-full relative overflow-auto border-[1px] border-[#00000014] rounded-2xl">
            <table className="w-full table-auto rounded-2xl border-separate border-spacing-0 text-sm text-[#212529] border-collapse">
              <thead>
                <tr className="bg-[#f5f5f5] border-b border-[#dee2e6] text-left">
                  {/* <th className="w-1/12 font-medium text-sm text-[#495057] pl-4">
                  Monto
                </th>
                <th className="font-medium text-sm text-[#495057]">
                  Descripción
                </th>
                <th className="font-medium text-sm text-[#495057]">
                  Categoría
                </th>
                <th className="font-medium text-sm text-[#495057]">
                  Subcategoría
                </th>
                <th className="w-1/12 font-medium text-sm text-[#495057] p-4">
                  Fecha
                </th>
                <th className="w-1/24 font-medium text-sm text-[#495057] text-right pr-4">
                  Delete
                </th> */}
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((e, index) => {
                  const isGrayRow = index % 2 === 0
                  const isLast = index === filteredExpenses.length - 1
                  return (
                    <tr
                      key={index}
                      className={` h-18 transition-all duration-200 text-left hover:-translate-y-[1px] hover:bg-[#f8f9fa]   ${
                        isGrayRow ? 'bg-white ' : 'bg-white'
                      } `}
                    >
                      <td
                        className={` text-left pl-2 md:pl-6 font-medium  ${!isLast ? 'border-b-[1px] border-[#00000014]' : ''}`}
                      >
                        <span className="flex items-center gap-2 text-[black]">
                          <span className="w-2 h-2 rounded-full bg-[#E53935] flex-none tracking-tight"></span>
                          {/* Amount */}
                          {`S/ ${centsToDecimal(e.amount)}`}
                        </span>
                      </td>
                      <td
                        className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} truncate font-bold`}
                      >
                        <div className="flex items-center justify-start truncate">
                          {e.description || (
                            <span className="text-gray-400 italic">
                              Sin descripción
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} truncate `}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-center gap-1 bg-[#0E9053]/15 rounded-lg p-1 md:p-2 text-xs font-bold text-[#1F3B2E] w-fit truncate">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#000000"
                              viewBox="0 0 256 256"
                            >
                              <path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z"></path>
                            </svg>
                            {e.category || (
                              <span className="text-gray-400 italic ">
                                Sin categoría
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 p-1 md:p-2 bg-[#0E9053]/8 text-xs font-bold text-[#1F3B2E] truncate rounded-lg w-fit md:hidden">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#000000"
                              viewBox="0 0 256 256"
                            >
                              <path d="M72,60A12,12,0,1,1,60,48,12,12,0,0,1,72,60Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,128,48Zm68,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,184a12,12,0,1,0,12,12A12,12,0,0,0,60,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,184Z"></path>
                            </svg>
                            {e.subcategory || (
                              <span className=" text-gray-400 italic">
                                Sin subcategoría
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      {/* Subcategoria */}
                      <td
                        className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} `}
                      >
                        <div className="hidden md:flex items-center gap-1 p-2 bg-[#0E9053]/8 text-xs font-bold text-[#1F3B2E] truncate rounded-lg w-fit">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#000000"
                            viewBox="0 0 256 256"
                          >
                            <path d="M72,60A12,12,0,1,1,60,48,12,12,0,0,1,72,60Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,128,48Zm68,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,184a12,12,0,1,0,12,12A12,12,0,0,0,60,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,184Z"></path>
                          </svg>
                          {e.subcategory || (
                            <span className=" text-gray-400 italic">
                              Sin subcategoría
                            </span>
                          )}
                        </div>
                      </td>
                      {/* <td
                        className={`w-1/8 ${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} p-4 text-[#666666] text-sm hidden md:flex`}
                      >
                        {formatDate(e.date)}
                      </td> */}
                      <td
                        className={`w-1/8 ${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} p-4 text-[#666666] text-sm truncate`}
                      >
                        {formatDate(e.date)}
                      </td>

                      <td
                        className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} text-right pr-2 md:pr-6 font-medium text-[#dc3545] `}
                      >
                        <button
                          className="cursor-pointer"
                          onClick={async () => {
                            if (!confirm('¿Eliminar este gasto?')) return

                            const id = e.id

                            // Optimistic update
                            setExpenseHistory((prev) =>
                              prev.filter((exp) => exp.id !== id),
                            )

                            if (!String(id).startsWith('demo')) {
                              try {
                                await deleteExpense(id!)
                              } catch (error) {
                                alert('Error eliminando gasto')
                                // rollback
                                setExpenseHistory((prev) => [...prev, e])
                              }
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            fill="#000000"
                            viewBox="0 0 256 256"
                          >
                            <path d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div ref={tableEndRef} />
          </div>
        </section>
        {/* INPUT FORM ----------------------------*/}
        <section className="fixed bottom-4 md:bottom-6 md:left-[11.6rem] w-[calc(95vw)] md:w-[calc(100vw)]  md:w-[calc(100vw-11.6rem)] text-sm shadow-short">
          <TransactionInputBar
            expenseFormData={expenseFormData}
            onFormChange={handleExpenseFormInputChange}
            onSubmit={submitExpenseFormData}
          />
        </section>
      </div>
    </main>
  )
}
