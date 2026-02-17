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
  return `${Number(day)} ${months[Number(month) - 1]}. ${year}`
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

export default function MyExpensesPage() {
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
    date: new Date().toLocaleDateString('en-CA'),
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
      amount: decimalToCents(expenseFormData.amount),
      category: expenseFormData.category || undefined,
      subcategory: expenseFormData.subcategory || undefined,
      description: expenseFormData.description || undefined,
      date: expenseFormData.date,
      type: TransactionType.EXPENSE,
    }

    const savedExpense: Expense = await createExpense(
      mapFormToCreateExpenseDTO(newExpense),
    )

    setExpenseHistory((prev) => [...prev, savedExpense])

    // setExpenseFormData((prev) => ({
    //   ...prev,
    //   amount: '',
    //   category: '',
    //   description: '',
    // }))
  }

  const filteredExpenses = expenseHistory.filter((expense) => {
    const [year, month] = expense.date.split('-').map(Number)

    return month - 1 === selectedMonth && year === currentYear
  })

  const tableEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    tableEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [expenseHistory])

  return (
    <main className="flex flex-col py-10  font-poppins bg-[#FAFAFA] min-h-screen h-full items-center">
      <div className="relative flex flex-col w-[68vw] gap-3 ">
        <header className="flex align-top items-center justify-between mb-4">
          <h1 className="items-center text-3xl tracking-wide font-bold text-black mt-0 align-top leading-none border-b-1 pb-4 border-[#00000014] w-full">
            Mis movimientos
          </h1>
        </header>

        <div className="flex flex-row items-center justify-between gap-2">
          <div className=" p-3 px-4 rounded-2xl border-[1px] border-[#00000014] bg-white">
            <p className="text-sm text-black  tracking-wider ">{`Total: S/ ${centsToDecimal(
              filteredExpenses.reduce((sum, expense) => {
                return sum + expense.amount
              }, 0),
            )}`}</p>
          </div>
          <div className="relative inline-block">
            <div
              className="cursor-pointer flex items-center p-3 px-4 rounded-2xl border-[1px] border-[#00000014] text-sm gap-2  tracking-wide bg-white"
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
                        className={` text-left pl-6 font-medium  ${!isLast ? 'border-b-[1px] border-[#00000014]' : ''}`}
                      >
                        <span className="flex items-center gap-3 text-[black]">
                          <span className="w-2 h-2 rounded-full bg-[#E53935] flex-none"></span>
                          {/* Amount */}
                          {`S/ ${centsToDecimal(e.amount)}`}
                        </span>
                      </td>
                      <td
                        className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} truncate max-w-[200px] font-bold`}
                      >
                        {e.description || (
                          <span className="text-gray-400 italic">
                            Sin descripción
                          </span>
                        )}
                      </td>
                      <td
                        className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''}`}
                      >
                        <span className="flex items-center gap-2">
                          <Image
                            src="/img/savings-icon.png"
                            height={15}
                            width={15}
                            alt="send icon"
                            className="invert"
                          />
                          {e.category || (
                            <span className="text-gray-400 italic">
                              Sin categoría
                            </span>
                          )}
                        </span>
                      </td>
                      <td
                        className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''}`}
                      >
                        <span className="flex items-center gap-2">
                          {/* <Image
                            src="/img/triangle-icon.png"
                            height={15}
                            width={15}
                            alt="taxi icon"
                            className=""
                          /> */}
                          {e.subcategory || (
                            <span className=" text-gray-400 italic">
                              Sin subcategoría
                            </span>
                          )}
                        </span>
                      </td>

                      <td
                        className={`w-1/8 ${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} p-4 text-[#666666] text-sm`}
                      >
                        {formatDate(e.date)}
                      </td>
                      <td
                        className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} text-right pr-6 font-medium text-[#dc3545] `}
                      >
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            if (confirm('¿Eliminar este gasto?')) {
                              setExpenseHistory((prev) =>
                                prev.filter((exp) => exp.id !== e.id),
                              )
                              if (!e.id?.startsWith('demo')) {
                                deleteExpense(e.id!)
                              }
                            }
                          }}
                        >
                          <Image
                            src="/img/icons/trash.png"
                            height={17}
                            width={17}
                            alt="trash icon"
                            style={{ filter: 'grayscale(50%)' }}
                          />
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
        <section className="fixed bottom-10 left-[11rem] w-[calc(100vw-11.5rem)] text-sm shadow-short">
          <div className="flex flex-col items-cemter w-full bg-[#f5f5f5] mx-auto border-[1px] border-[#00000014] rounded-2xl max-w-[70vw] py-2 px-3 h-20">
            <div className="flex justify-between items-center gap-2 w-full">
              {/* <div className="flex flex-col items-start gap-1">
                <div className="flex justify-start gap-1 bg-[#DCE9DF] rounded-xl py-2 px-3">
                  <Image
                    src="/img/icons/page-2.png"
                    height={15}
                    width={15}
                    alt="send icon"
                    className=""
                  />
                  <p className="text-xs text-[#1F3B2E]">Texto</p>
                </div>
                <div className="flex justify-start gap-1 bg-[#E6E8F5] rounded-xl py-2 px-3">
                  <Image
                    src="/img/icons/robot.png"
                    height={15}
                    width={15}
                    alt="send icon"
                    className=""
                  />
                  <p className="text-xs text-[#2A2F4A]">AI</p>
                </div>
              </div> */}

              {/* Amount */}
              <div className="flex flex-col gap-0.5 flex-1">
                <p className="text-xs text-[#1F3B2E] px-1">Monto (S/)</p>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Ej. 150.50"
                  className="
                placeholder:text-gray-400 placeholder:italic placeholder:font-light p-2 rounded-md border border-gray-300
      bg-white

      text-[#212529]
      transition-colors
     
      focus:ring-3
        focus:ring-[#DCE9DF]
        focus:ring-offset-0
      focus:outline-none
      
      [appearance:textfield]
      [&::-webkit-inner-spin-button]:appearance-none
      [&::-webkit-outer-spin-button]:appearance-none
    "
                  onChange={handleExpenseFormInputChange}
                />
              </div>
              {/* Description */}
              <div className="flex flex-col gap-0.5 flex-1">
                <p className="text-xs text-[#1F3B2E] px-1">Descripción</p>
                <input
                  name="description"
                  type="text"
                  min="1"
                  placeholder="Ej. Cena con amigos"
                  className="
                placeholder:text-gray-400 placeholder:italic placeholder:font-light
      w-full
      p-2
      rounded-md
      border border-gray-300
       bg-white
      text-[#212529]
      transition-colors




      focus:ring-3
        focus:ring-[#DCE9DF]
        focus:ring-offset-0
      focus:outline-none
    
      [appearance:textfield]
      [&::-webkit-inner-spin-button]:appearance-none
      [&::-webkit-outer-spin-button]:appearance-none
    "
                  onChange={handleExpenseFormInputChange}
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-0.5 flex-1">
                <p className="text-xs text-[#1F3B2E] px-1">Categoría</p>
                <select
                  name="category"
                  defaultValue=""
                  className="
      w-full
      p-2
      rounded-md
      border border-gray-300
      bg-white
       text-[#6c757d]
      text-sm
      transition-colors
      focus:ring-3
        focus:ring-[#DCE9DF]
        focus:ring-offset-0
      focus:outline-none
    
    "
                  onChange={handleExpenseFormInputChange}
                >
                  <option value="" disabled hidden>
                    Selecciona una categoría
                  </option>
                  <option value="Gastos fijos">Gastos fijos</option>
                  <option value="Gastos libres">Gastos sin culpa</option>
                  <option value="Gastos fijos">Ahorros</option>
                  <option value="Gastos libres">Inversión</option>
                </select>
              </div>

              {/* Subcategory */}
              <div className="flex flex-col gap-0.5 flex-1">
                <p className="text-xs text-[#1F3B2E] px-1">Subcategoría</p>
                <select
                  name="subcategory"
                  defaultValue=""
                  className="
      w-full
      p-2
      rounded-md
      border border-gray-300
      bg-white
          text-[#6c757d]
      text-sm
      transition-colors
     focus:ring-3
        focus:ring-[#DCE9DF]
        focus:ring-offset-0
      focus:outline-none
    
      
    "
                  onChange={handleExpenseFormInputChange}
                >
                  <option value="" disabled hidden>
                    Selecciona una subcategoría
                  </option>
                  <option value="Gastos fijos">Gastos fijos</option>
                  <option value="Gastos libres">Gastos sin culpa</option>
                  <option value="Gastos fijos">Ahorros</option>
                  <option value="Gastos libres">Inversión</option>
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-[#1F3B2E] px-1">Fecha</p>
                <input
                  type="date"
                  name="date"
                  value={
                    expenseFormData.date ||
                    new Date().toISOString().split('T')[0]
                  }
                  onChange={handleExpenseFormInputChange}
                  className="
      w-full
      p-2
      rounded-md
      border border-gray-300
      bg-white
      text-[#212529]
      text-sm
      transition-colors
      focus:ring-3
        focus:ring-[#DCE9DF]
        focus:ring-offset-0
      focus:outline-none
    "
                />
              </div>

              <button
                className="flex items-center justify-center bg-[#1F3B2E] rounded-full text-white h-11 w-11 cursor-pointer"
                onClick={submitExpenseFormData}
              >
                <Image
                  src="/svg/icons/plus-bold.svg"
                  height={20}
                  width={20}
                  alt="send icon"
                  className="invert"
                />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
