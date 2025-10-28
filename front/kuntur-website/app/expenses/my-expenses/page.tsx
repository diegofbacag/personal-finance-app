'use client'

import ExpensesTable from '@/src/features/expenses/ExpensesTable'
import { useState } from 'react'

interface ExpenseForm {
  amount: string
  category?: string
  description?: string
  date: string
}

export default function MyExpensesPage() {
  const [expenseFormData, setExpenseFormData] = useState<ExpenseForm>({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [expenseHistory, setExpenseHistory] = useState(true)

  const handleExpenseFormInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setExpenseFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitExpenseFormData = () => {
    const newExpense: Expense = {
      amount: Number(expenseFormData.amount),
      category: expenseFormData.category || undefined,
      description: expenseFormData.description || undefined,
      date: new Date(expenseFormData.date),
    }

    setExpenseHistory((prev) => [...prev, newExpense])

    setExpenseFormData({
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    })
  }

  return (
    <main className="flex flex-col p-8 font-poppins bg-[#f1f1f1] h-screen justify-start">
      <header className="flex flex-col mb-4">
        <h1 className="text-base leading-[1.4em]">Mis gastos</h1>

        <h2 className="text-lg font-bold leading-[1.4em]">5000 $</h2>
        <div className="flex flex-row gap-6 items-center leading-[1.4em] text-sm text-[hsl(0,0%,30%)]">
          <p className="bg-white rounded-2xl p-1 ">Anio</p>
          <p>Mes</p>
          <p>Custom</p>
        </div>
      </header>
      <section
        aria-label="Expenses list"
        className="bg-white rounded-xl py-4 h-auto"
      >
        <ExpensesTable />
      </section>
      <section
        aria-label="Add expenses"
        className="fixed bottom-10 min-w-[80vw] left-1/2 transform -translate-x-1/2"
      >
        <div
          className="grid grid-cols-[auto_1fr_auto] items-center border rounded-full bg-white border-gray-900/5
 p-3 shadow-md gap-3"
        >
          <div className="flex flex-col items-center">
            {/* <p className="text-xs bg-black text-white rounded-full p-1">
              Manual
            </p>
            <p className="text-xs bg-white text-black rounded-full p-1">IA</p>
            <p className="text-xs bg-white text-black rounded-full p-1">
              Upload
            </p> */}
          </div>
          <div className="grid grid-cols-4 items-start ">
            <div>
              <p className="flex justify-center">Monto S/.</p>
              <input
                type="number"
                name="amount"
                value={expenseFormData.amount}
                placeholder="100"
                onChange={handleExpenseFormInput}
              ></input>
            </div>
            <div>
              <p className="flex justify-center">Categoria</p>
              <select
                name="category"
                value={expenseFormData.category}
                onChange={handleExpenseFormInput}
                className="border rounded px-2 py-1"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Comida">Comida</option>
                <option value="Transporte">Transporte</option>
                <option value="Vivienda">Vivienda</option>
                <option value="Ocio">Ocio</option>
              </select>
            </div>
            <div>
              <p className="flex justify-center">Descripcion</p>
              <input
                type="string"
                name="description"
                value={expenseFormData.description}
                placeholder="Cena con amigos"
                onChange={handleExpenseFormInput}
              ></input>
            </div>
            <div>
              <p className="flex justify-center">Fecha</p>
              <input
                type="date"
                name="date"
                value={expenseFormData.date}
                onChange={handleExpenseFormInput}
              ></input>
            </div>
          </div>

          <button
            className="flex items-center justify-center bg-[#0E8F53] rounded-full text-white h-10 w-10 cursor-pointer"
            onClick={submitExpenseFormData}
          >
            i
          </button>
        </div>
      </section>
    </main>
  )
}
