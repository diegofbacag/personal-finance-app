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
  const [, month, day] = isoDate.split('-')

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

function decimalToCents(value: string): number {
  return Math.round(Number(value) * 100)
}

function centsToDecimal(cents: number): string {
  return (cents / 100).toFixed(2)
}

export default function MyExpensesPage() {
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
  const [expenseHistory, setExpenseHistory] = useState<Expense[]>([])
  const [isMonthMenuOpen, setIsMonthMenuOpen] = useState<boolean>(false)

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
    <main className="flex flex-col p-2 font-poppins bg-[#f5f5f5] min-h-screen w-full gap-2 h-full">
      <div className="relative flex flex-col bg-white py-10 px-10 rounded-2xl h-auto gap-2 h-full">
        <header className="flex align-top items-center justify-between">
          <h1 className="text-lg font-bold text-black mt-0 align-top leading-none">
            Mis gastos
          </h1>

          <div className="bg-[#f5f5f5] p-2 rounded-2xl ">
            <p className="text-sm text-[#495057] font-bold">{`Total: S/ ${centsToDecimal(
              filteredExpenses.reduce((sum, expense) => {
                return sum + expense.amount
              }, 0),
            )}`}</p>
          </div>
        </header>
        <div className="flex gap-2">
          <p>Mes:</p>
          <div
            className="cursor-pointer"
            onClick={() => {
              setIsMonthMenuOpen((prev) => !prev)
            }}
          >
            {MONTHS[selectedMonth].label}
          </div>
          {isMonthMenuOpen && (
            <div>
              <div className="flex gap-1">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedMonth(0)
                    setIsMonthMenuOpen((prev) => !prev)
                  }}
                >
                  Ene
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedMonth(1)
                    setIsMonthMenuOpen((prev) => !prev)
                  }}
                >
                  Feb
                </div>
                <div className="cursor-pointer">Mar</div>
              </div>
              <div className="flex gap-1">
                <div>Abr</div>
                <div>May</div>
                <div>Jun</div>
              </div>
              <div className="flex gap-1">
                <div>Jul</div>
                <div>Ago</div>
                <div>Sep</div>
              </div>
              <div className="flex gap-1">
                <div>Oct</div>
                <div>Nov</div>
                <div>Dic</div>
              </div>
            </div>
          )}
        </div>
        <section aria-label="Expenses table" className="pb-16">
          <div className="relative h-[60vh] overflow-auto rounded-2xl">
            <table className="w-full rounded-2xl border-separate border-spacing-0 text-sm text-[#212529]">
              <thead>
                <tr className="bg-[#f5f5f5] border-b border-[#dee2e6] text-left">
                  <th className="font-medium text-sm text-[#495057] p-4">
                    Fecha
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
                  <th className="font-medium text-sm text-[#495057] text-right pr-4">
                    Monto
                  </th>
                  <th className="font-medium text-sm text-[#495057] text-right pr-4">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((e, index) => {
                  const isGrayRow = index % 2 === 0
                  return (
                    <tr
                      key={index}
                      className={`h-14 transition-all duration-200 text-left hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:-translate-y-[1px] hover:bg-[#f1f3f5] ${
                        isGrayRow
                          ? 'bg-[#f8f9fa] shadow-[inset_0_1px_0_rgba(0,0,0,0.03),_inset_0_-1px_0_rgba(0,0,0,0.02)]'
                          : 'bg-[#f5f5f5]'
                      }`}
                    >
                      <td className="p-4">{formatDate(e.date)}</td>
                      <td className="truncate max-w-[200px]">
                        {e.description || (
                          <span className="text-gray-400 italic">
                            Sin descripción
                          </span>
                        )}
                      </td>
                      <td>
                        {e.category || (
                          <span className="text-gray-400 italic">
                            Sin categoría
                          </span>
                        )}
                      </td>
                      <td>
                        {e.subcategory || (
                          <span className="text-gray-400 italic">
                            Sin subcategoría
                          </span>
                        )}
                      </td>
                      <td className="text-right pr-4 font-medium text-[#dc3545]">
                        {(-centsToDecimal(e.amount)).toLocaleString('es-PE', {
                          style: 'currency',
                          currency: 'PEN',
                        })}
                      </td>
                      <td className="text-right pr-8 font-medium text-[#dc3545] ">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            if (confirm('¿Eliminar este gasto?')) {
                              setExpenseHistory((prev) =>
                                prev.filter((exp) => exp.id !== e.id),
                              )
                              deleteExpense(e.id!)
                            }
                          }}
                        >
                          x
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

        <section className="absolute bottom-5 left-10 right-10 py-1 px-3 text-sm border-1 border-[rgba(13,13,13,0.05)] rounded-3xl shadow-short   ">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] items-center gap-2">
            {/* Amount */}
            <div className="relative my-2">
              <input
                name="amount"
                type="number"
                min="1"
                placeholder="Ej. 150.50"
                className="
                placeholder:text-gray-400 placeholder:italic placeholder:font-light
      w-full
      p-2
      rounded-md
      border border-gray-300
       bg-transparent
      text-[#212529]
      transition-colors
      focus:outline-none
      focus:border-[#0e8f53]
      [appearance:textfield]
      [&::-webkit-inner-spin-button]:appearance-none
      [&::-webkit-outer-spin-button]:appearance-none
    "
                onChange={handleExpenseFormInputChange}
              />

              <label
                className="
      absolute
      left-2
      -top-2
      text-xs
       text-[#6c757d]
      bg-white
      px-1
      pointer-events-none
    "
              >
                Monto (S/)
              </label>
            </div>
            {/* Description */}
            <div className="relative my-2">
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
       bg-transparent
      text-[#212529]
      transition-colors
      focus:outline-none
      focus:border-[#0e8f53]
      [appearance:textfield]
      [&::-webkit-inner-spin-button]:appearance-none
      [&::-webkit-outer-spin-button]:appearance-none
    "
                onChange={handleExpenseFormInputChange}
              />

              <label
                className="
      absolute
      left-2
      -top-2
      text-xs
       text-[#6c757d]
      bg-white
      px-1
      pointer-events-none
    "
              >
                Descripción
              </label>
            </div>

            {/* Category */}
            <div className="relative my-2">
              <select
                name="category"
                defaultValue=""
                className="
      w-full
      p-2
      rounded-md
      border border-gray-300
      bg-transparent
       text-[#6c757d]
      text-sm
      transition-colors
      focus:outline-none
      focus:border-[#0e8f53]
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

              <label
                className="
      absolute
      left-2
      -top-2
      text-xs
      text-[#6c757d]
      bg-white
      px-1
      pointer-events-none
    "
              >
                Categoría
              </label>
            </div>

            {/* Subcategory */}
            <div className="relative my-2">
              <select
                name="subcategory"
                defaultValue=""
                className="
      w-full
      p-2
      rounded-md
      border border-gray-300
      bg-transparent
          text-[#6c757d]
      text-sm
      transition-colors
      focus:outline-none
      focus:border-[#0e8f53]
      
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

              <label
                className="
      absolute
      left-2
      -top-2
      text-xs
      text-[#6c757d]
      bg-white
      px-1
      pointer-events-none
    "
              >
                Subcategoría
              </label>
            </div>

            {/* Date */}
            <div className="relative my-2">
              <input
                type="date"
                name="date"
                value={
                  expenseFormData.date || new Date().toISOString().split('T')[0]
                }
                onChange={handleExpenseFormInputChange}
                className="
      w-full
      p-2
      rounded-md
      border border-gray-300
      bg-transparent
      text-[#212529]
      text-sm
      transition-colors
      focus:outline-none
      focus:border-[#0e8f53]
    "
              />

              <label
                className="
      absolute
      left-2
      -top-2
      text-xs
      text-[#6c757d]
      bg-white
      px-1
      pointer-events-none
    "
              >
                Fecha
              </label>
            </div>

            <button
              className="flex items-center justify-center bg-[#0E9053] rounded-full text-white h-10 w-10 cursor-pointer"
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
        </section>
      </div>
    </main>
  )
}
