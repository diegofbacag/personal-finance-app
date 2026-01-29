'use client'

import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { createExpense } from '@/src/features/expenses/services/expenses.service'
import { ExpenseForm } from '@/src/features/expenses/components/expense-input/ExpenseForm'
import { Button } from '@/src/components/ui/Button'

interface Expense {
  amount: number
  category?: string
  subcategory?: string
  description?: string
  date: Date
}

interface ExpenseForm {
  amount: string
  category?: string
  subcategory?: string
  description?: string
  date: string
}

const expenses: Expense[] = [
  {
    amount: 45.5,
    category: 'Transporte',
    description: 'Taxi al trabajo',
    date: new Date('2025-10-25'),
  },
  {
    amount: 120.0,
    category: 'Comida',
    description: 'Cena con amigos',
    date: new Date('2025-10-24'),
  },
  {
    amount: 120.0,
    category: 'Comida',
    description: 'Cena con amigos',
    date: new Date('2025-10-24'),
  },
]

export default function MyExpensesPage() {
  const [expenseFormData, setExpenseFormData] = useState<ExpenseForm>({
    amount: '',
    category: '',
    subcategory: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [expenseHistory, setExpenseHistory] = useState<Expense[]>(expenses)

  const tableEndRef = useRef<HTMLDivElement | null>(null)

  const handleExpenseFormInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    console.log(name, value)
    setExpenseFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitExpenseFormData = async () => {
    const newExpense: Expense = {
      amount: Number(expenseFormData.amount),
      category: expenseFormData.category || undefined,
      subcategory: expenseFormData.subcategory || undefined,
      description: expenseFormData.description || undefined,
      date: new Date(`${expenseFormData.date}T00:00:00`),
    }

    const savedExpense: Expense = await createExpense(newExpense)

    console.log('ssaved expense', savedExpense)
    setExpenseHistory((prev) => [...prev, savedExpense])

    // setExpenseFormData((prev) => ({
    //   ...prev,
    //   amount: '',
    //   category: '',
    //   description: '',
    // }))
  }

  useEffect(() => {
    tableEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [expenseHistory])

  return (
    <main className="flex flex-col p-2 font-poppins bg-[#f5f5f5] min-h-screen w-full gap-2 h-full">
      <div className="relative flex flex-col bg-white py-10 px-10 rounded-2xl h-auto gap-2 h-full">
        <div className="flex flex-row">
          <div className="flex flex-row justify-end mt-2">
            <div
              className="flex w-14 bg-gray-300 text-xs hover:bg-[#97C7A3] 
              text-[#0B3D1F] leading-none font-sans rounded-lg items-center text-[#04644f] justify-center align-center p-2"
            >
              Texto
            </div>
          </div>
        </div>

        <header className="flex align-top items-center justify-between">
          <h1 className="text-lg font-bold text-black mt-0 align-top leading-none">
            Mis gastos
          </h1>
          <div className="bg-[#f5f5f5] p-2 rounded-2xl ">
            <p className="text-sm text-[#495057] font-bold">Total: S/ 100</p>
          </div>
        </header>
        <section aria-label="Expenses table" className="pb-16">
          <div className="relative h-[60vh] overflow-auto">
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
                </tr>
              </thead>

              <tbody>
                {expenseHistory.map((e, index) => {
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
                      <td className="p-4">
                        {new Date(e.date).toLocaleDateString('es-PE', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </td>
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
                        {(-e.amount).toLocaleString('es-PE', {
                          style: 'currency',
                          currency: 'PEN',
                        })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div ref={tableEndRef} />
          </div>
        </section>

        <ExpenseForm className="absolute bottom-10 left-10 right-10" />

        <section className="absolute bottom-10 left-10 right-10 rounded-xl py-3 px-4 text-sm bg-[#f5f5f5] transition-all duration-300">
          <div className="flex flex-row gap-2 text-black">
            {/* Amount */}
            <div className="">
              <p className="font-medium text-sm text-[#495057]">Monto (S/)</p>
              <input
                name="amount"
                placeholder="Ej. 100"
                type="number"
                min="1"
                className="p-1 my-1 rounded-md focus:outline-none placeholder:text-gray-400 placeholder:italic placeholder:font-light text-[#212529] bg-white transition-all duration-300 focus:bg-[#0e8f53]/10 focus:shadow-[0_0_20px_8px_rgba(14,143,83,0.12)] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                onChange={handleExpenseFormInputChange}
              />
            </div>
            {/* Category */}
            <div className="">
              <p className="font-medium text-sm text-[#495057]">Categoría</p>
              <select
                name="category"
                className="p-1 my-1 rounded-md focus:outline-none border-none text-[#212529] bg-white transition-all duration-200 focus:shadow-[0_0_6px_1px_rgba(14,143,83,0.25)] placeholder:text-gray-400 text-sm"
                onChange={handleExpenseFormInputChange}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Gastos fijos">Gastos fijos</option>
                <option value="Gastos libres">Gasto libre</option>
              </select>
            </div>
            {/* Subcategory */}
            <div className="">
              <p className="font-medium text-sm text-[#495057]">Subategoría</p>
              <select
                name="subcategory"
                className="p-1 my-1 rounded-md focus:outline-none border-none text-[#212529] bg-white transition-all duration-200 focus:shadow-[0_0_6px_1px_rgba(14,143,83,0.25)] placeholder:text-gray-400 text-sm"
                onChange={handleExpenseFormInputChange}
              >
                <option value="">Selecciona una subcategoría</option>
                <option value="Gastos fijos">Transporte</option>
                <option value="Gastos libres">Gasto libre</option>
              </select>
            </div>
            {/* Description */}
            <div className="">
              <p className="font-medium text-sm text-[#495057]">Descripción</p>
              <input
                name="description"
                placeholder="Ej. Cena con amigos"
                type="text"
                className="p-1 my-1 rounded-md focus:outline-none placeholder:text-gray-400 placeholder:italic placeholder:font-light text-[#212529] bg-white transition-all duration-300 focus:bg-[#0e8f53]/10 focus:shadow-[0_0_20px_8px_rgba(14,143,83,0.12)] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                onChange={handleExpenseFormInputChange}
              />
            </div>
            {/* Date */}
            <div>
              <p className="font-medium font-medium text-[#495057]">Fecha</p>
              <input
                type="date"
                name="date"
                value={
                  expenseFormData.date || new Date().toISOString().split('T')[0]
                }
                placeholder="100"
                onChange={handleExpenseFormInputChange}
                className="
                my-1 rounded-md focus:outline-none placeholder:text-gray-400 placeholder:italic placeholder:font-light text-[#212529] bg-white transition-all duration-300 focus:bg-[#0e8f53]/10 focus:shadow-[0_0_20px_8px_rgba(14,143,83,0.12)]"
              />
            </div>

            <button
              className="flex items-center justify-center bg-[#0e8f53] rounded-full text-white h-10 w-10 cursor-pointer"
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
