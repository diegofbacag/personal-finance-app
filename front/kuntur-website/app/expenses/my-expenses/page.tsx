'use client'

import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { createExpense } from '@/src/features/expenses/services/expenses.service'

interface Expense {
  amount: number
  category?: string
  description?: string
  date: Date
}

interface ExpenseForm {
  amount: string
  category?: string
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
]

export default function MyExpensesPage() {
  const [expenseFormData, setExpenseFormData] = useState<ExpenseForm>({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [expenseHistory, setExpenseHistory] = useState<Expense[]>(expenses)

  const tableEndRef = useRef<HTMLDivElement | null>(null)

  const handleExpenseFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setExpenseFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitExpenseFormData = async () => {
    const newExpense: Expense = {
      amount: Number(expenseFormData.amount),
      category: expenseFormData.category || undefined,
      description: expenseFormData.description || undefined,
      date: new Date(`${expenseFormData.date}T00:00:00`),
    }

    await createExpense(newExpense)

    setExpenseHistory((prev) => [...prev, newExpense])

    setExpenseFormData((prev) => ({
      ...prev,
      amount: '',
      category: '',
      description: '',
    }))
  }

  useEffect(() => {
    tableEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [expenseHistory])

  return (
    <main className="flex flex-col py-8 px-10 font-poppins bg-[#FAFAF7] min-h-screen pb-30 w-full gap-2">
      <header className="flex align-top items-center justify-between">
        <h1 className="text-lg font-bold text-black mt-0 align-top leading-none">
          Mis gastos
        </h1>
        <div className="bg-[#f5f5f5] p-2 rounded-2xl ">
          <p className="text-sm text-[#495057] font-bold">Total: S/ 100</p>
        </div>
      </header>
      <section aria-label="Expenses table" className="w-full">
        <table className="w-full rounded-2xl  overflow-hidden border-separate border-spacing-0 text-sm text-[#212529]">
          <thead>
            <tr className="bg-[#f5f5f5] border-b border-[#dee2e6] text-left">
              <th className="font-medium text-sm text-[#495057] p-4">Fecha</th>
              <th className="font-medium text-sm text-[#495057]">
                Descripción
              </th>
              <th className="font-medium text-sm text-[#495057]">Categoría</th>
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
                  className={`
              h-14 transition-all duration-200 text-left
              ${
                isGrayRow
                  ? 'bg-[#f8f9fa] shadow-[inset_0_1px_0_rgba(0,0,0,0.03),_inset_0_-1px_0_rgba(0,0,0,0.02)]'
                  : 'bg-[#f5f5f5]'
              }
              hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:-translate-y-[1px] hover:bg-[#f1f3f5]
            `}
                >
                  <td className="p-4">
                    {e.date.toLocaleDateString('es-PE', {
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
                  <td>Fijos</td>
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
      </section>

      <section
        aria-label="Expenses input bar"
        className="fixed bottom-10 min-w-[80vw] left-1/2 transform -translate-x-1/2 "
      >
        <div className="px-4 grid grid-cols-[1fr_auto] bg-white items-center border rounded-full border-gray-900/5 p-1 shadow-md gap-4">
          {/* <div className="flex items-center justify-center rounded-full text-white h-10 w-10">
            <Image
              src="/svg/icons/menu.svg"
              height={20}
              width={20}
              alt="plus icon"
            />
          </div> */}
          <div className="grid grid-cols-5 items-start text-sm text-gray">
            <div>
              <p className="font-medium text-sm text-[#495057]">Monto (S/)</p>
              <input
                type="number"
                name="amount"
                value={expenseFormData.amount}
                placeholder="Ej. 100"
                min="1"
                onChange={handleExpenseFormInput}
                className="
                my-1 rounded-md focus:outline-none placeholder:text-gray-400 placeholder:italic placeholder:font-light text-[#212529] bg-white transition-all duration-300 focus:bg-[#0e8f53]/10 focus:shadow-[0_0_20px_8px_rgba(14,143,83,0.12)]"
              ></input>
            </div>
            <div>
              <p className="font-medium text-sm text-[#495057]">Categoría</p>
              <select
                name="category"
                value={expenseFormData.category}
                onChange={handleExpenseFormInput}
                className="
    my-1 rounded-md
    focus:outline-none
    
    border-none
    text-[#212529]
    bg-white
    transition-all duration-200

    focus:shadow-[0_0_6px_1px_rgba(14,143,83,0.25)]
    placeholder:text-gray-400
    text-sm
    
  "
              >
                <option value="">Selecciona una subcategoría</option>
                <option value="Gastos fijos">Gastos fijos</option>
                <option value="Gastos libres">Gasto libre</option>
              </select>
            </div>
            <div>
              <p className="font-medium text-sm text-[#495057]">Subcategoría</p>
              <select
                name="subcategory"
                value={expenseFormData.category}
                onChange={handleExpenseFormInput}
                className="
    my-1 rounded-md
    focus:outline-none
    
    border-none
    text-[#212529]
    bg-white
    transition-all duration-200

    focus:shadow-[0_0_6px_1px_rgba(14,143,83,0.25)]
    placeholder:text-gray-400
    text-sm
    
  "
              >
                <option value="">Selecciona una categoría</option>
                <option value="Gastos fijos">Gastos fijos</option>
                <option value="Gastos libres">Gasto libre</option>
              </select>
            </div>
            <div>
              <p className="font-medium text-sm text-[#495057]">Descripción</p>
              <input
                type="text"
                name="description"
                value={expenseFormData.description}
                placeholder="Ej. Cena con amigos"
                onChange={handleExpenseFormInput}
                className="
                my-1 rounded-md focus:outline-none placeholder:text-gray-400 placeholder:italic placeholder:font-light text-[#212529] bg-white transition-all duration-300 focus:bg-[#0e8f53]/10 focus:shadow-[0_0_20px_8px_rgba(14,143,83,0.12)]"
              />
            </div>
            <div>
              <p className="font-medium font-medium text-[#495057]">Fecha</p>
              <input
                type="date"
                name="date"
                value={
                  expenseFormData.date || new Date().toISOString().split('T')[0]
                }
                placeholder="100"
                onChange={handleExpenseFormInput}
                className="
                my-1 rounded-md focus:outline-none placeholder:text-gray-400 placeholder:italic placeholder:font-light text-[#212529] bg-white transition-all duration-300 focus:bg-[#0e8f53]/10 focus:shadow-[0_0_20px_8px_rgba(14,143,83,0.12)]"
              />
            </div>
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
    </main>
  )
}
