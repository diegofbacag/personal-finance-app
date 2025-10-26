'use client'

import { useState } from 'react'

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
    <main className="p-4 font-poppins">
      <header>
        <h1 className="text-3xl font-bold">Mis gastos</h1>
      </header>
      <section aria-label="Expenses list">
        <div className="grid grid-cols-4 bg-white">
          <div>Gasto</div>
          <div>Categoria</div>
          <div>Descripcion</div>
          <div>Fecha</div>
        </div>
        {expenseHistory.map((e, index) => (
          <div
            key={index}
            className={`grid grid-cols-4  ${
              index % 2 === 0 ? 'bg-white' : 'bg-[#edede9]'
            }`}
          >
            <div>{e.amount}</div>
            <div>{e.category}</div>
            <div>{e.description}</div>
            <div>{e.date.toISOString().split('T')[0]}</div>
          </div>
        ))}
      </section>
      <section
        aria-label="Add expenses"
        className="fixed bottom-10 min-w-[80vw] left-1/2 transform -translate-x-1/2 "
      >
        <div
          className="grid grid-cols-[auto_1fr_auto] items-center border rounded-full border-gray-900/5
 p-2 shadow-md"
        >
          <div>+</div>
          <div className="grid grid-cols-4 items-start text-sm text-gray">
            <div>
              <p>Monto S/.</p>
              <input
                type="number"
                name="amount"
                value={expenseFormData.amount}
                placeholder="100"
                onChange={handleExpenseFormInput}
              ></input>
            </div>
            <div>
              <p>Categoria</p>
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
              <p>Descripcion</p>
              <input
                type="string"
                name="description"
                value={expenseFormData.description}
                placeholder="Cena con amigos"
                onChange={handleExpenseFormInput}
              ></input>
            </div>
            <div>
              <p>Fecha</p>
              <input
                type="date"
                name="date"
                value={expenseFormData.date}
                onChange={handleExpenseFormInput}
              ></input>
            </div>
          </div>

          <button
            className="flex items-center justify-center bg-black rounded-full text-white h-10 w-10"
            onClick={submitExpenseFormData}
          >
            i
          </button>
        </div>
      </section>
    </main>
  )
}
