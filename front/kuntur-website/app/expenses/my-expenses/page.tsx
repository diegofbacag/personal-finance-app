'use client'

import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { createExpense } from '@/src/features/expenses/services/expenses.service'
import { ExpenseForm } from '@/src/features/expenses/components/expense-input/ExpenseForm'
import { Button } from '@/src/components/ui/Button'

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
        <section aria-label="Expenses table" className="w-full">
          <table className="w-full rounded-2xl  overflow-hidden border-separate border-spacing-0 text-sm text-[#212529]">
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

        <ExpenseForm className="absolute bottom-10 left-10 right-10" />
      </div>
    </main>
  )
}
