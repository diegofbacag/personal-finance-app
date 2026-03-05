'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from '@/src/features/transactions/services/transactions.service'
import { Transaction } from '@/src/features/transactions/types/transaction.model'
import { TransactionInputBar } from '@/src/features/transactions/components/expense-input/TransactionInputBar'
import { ExpensesCards } from '@/src/features/transactions/components/ExpensesCards'
import { TransactionForm } from '@/src/features/transactions/types/transaction.form'
import { CreateTransactionDto } from '@/src/features/transactions/types/transaction.dto'

const MONTHS = [
  { label: 'Ene', value: 0, name: 'Enero' },
  { label: 'Feb', value: 1, name: 'Febrero' },
  { label: 'Mar', value: 2, name: 'Marzo' },
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

export const formatDate = (isoDate: string) => {
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

export function centsToDecimal(cents: number): string {
  return (cents / 100).toFixed(2)
}

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

  const [transactionForm, setTransactionForm] = useState<TransactionForm>({
    amount: '',
    category_id: null,
    subcategory_id: null,
    description: '',
    date: getLocalDateISO(),
  })

  console.log('transaction form', transactionForm)

  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    [],
  )
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
        const transactions: Transaction[] = await getTransactions()
        setTransactionHistory(transactions)
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
    setTransactionForm((prev) => ({ ...prev, [name]: value }))
  }

  const submitTransactionForm = async () => {
    // if (!isLoggedIn) {
    //   alert('Debes iniciar sesión para registrar un movimiento.')
    //   return
    // }

    const dto: CreateTransactionDto = {
      amount: decimalToCents(transactionForm.amount),
      description: transactionForm.description || undefined,
      category_id: transactionForm.category_id || undefined,
      subcategory_id: transactionForm.subcategory_id || undefined,
      date: transactionForm.date,
    }

    // setTransactionHistory((prev) => [...prev, tempTransaction])

    try {
      const response = await createTransaction(dto)
      const savedTransaction: Transaction = response

      console.log('saved expense', savedTransaction)

      setTransactionHistory((prev) => [...prev, savedTransaction])

      // setTransactionHistory((prev) =>
      //   prev.map((e) => (e.id === newTransaction.id ? savedTransaction : e)),
      // )
    } catch (error: unknown) {
      // setTransactionHistory((prev) =>
      //   prev.filter((e) => e.id !== newTransaction.id),
      // )
      alert('Error al guardar el gasto.')
    }
  }

  const filteredExpenses = transactionHistory.filter((expense) => {
    const [year, month] = expense.date.split('-').map(Number)

    return month - 1 === selectedMonth && year === currentYear
  })

  const totals = filteredExpenses.reduce(
    (acc, transaction) => {
      const type = transaction.category_id

      if (type === 'VARIABLE_EXPENSES' || type === 'FIXED_EXPENSES') {
        acc.expenses += transaction.amount
      }

      if (type === 'INCOME') {
        acc.income += transaction.amount
      }

      if (type === 'SAVINGS') {
        acc.savings += transaction.amount
      }

      if (type === 'INVESTMENTS') {
        acc.investments += transaction.amount
      }

      return acc
    },
    {
      expenses: 0,
      income: 0,
      savings: 0,
      investments: 0,
    },
  )

  const tableEndRef = useRef<HTMLDivElement | null>(null)

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('¿Eliminar este gasto?')) return

    const expenseToRestore = transactionHistory.find((e) => e.id === id)

    setTransactionHistory((prev) => prev.filter((e) => e.id !== id))
    console.log('historia', transactionHistory)

    try {
      await deleteTransaction(id)
    } catch {
      alert('Error eliminando gasto')

      if (expenseToRestore) {
        setTransactionHistory((prev) => [...prev, expenseToRestore])
      }
    }
  }

  useEffect(() => {
    tableEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transactionHistory])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/')
  }
  return (
    <main className="flex flex-col bg-background min-h-screen h-full items-center">
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
      <div className="relative flex flex-col w-[95vw] md:w-[80vw] gap-2 px-4 py-4">
        <header className="align-top items-center justify-between mb-2">
          <p className="text-text-muted uppercase tracking-[0.15em] text-[10px] font-bold mb-1">
            Movimientos del mes
          </p>
          <h1 className="items-center text-2xl font-inter font-bold tracking-tight text-text-main mt-0 align-top leading-none w-full">
            Resumen de {MONTHS[selectedMonth].name}
          </h1>
        </header>
        {/* MAIN ANALYTICS */}
        <section className="grid grid-cols-2 gap-3 mb-8">
          <div className="flex flex-col gap-2">
            <div className="p-3 bg-white border border-border-subtle rounded-xl flex flex-col justify-between">
              <p className="text-[9px] text-text-muted uppercase tracking-wider font-bold mb-2">
                Ingresos
              </p>
              <p className="text-xl font-bold text-text-main">
                {`S/${centsToDecimal(totals.income)}`}
              </p>
            </div>
            <div className="p-3 bg-primary border border-border-subtle rounded-xl flex flex-col justify-between">
              <p className="text-[9px] text-white uppercase tracking-wider font-bold mb-2">
                Gastos
              </p>
              <p className="text-xl font-bold text-white">
                {`S/${centsToDecimal(totals.expenses)}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="p-3 bg-white border border-border-subtle rounded-xl flex flex-col justify-between">
              <p className="text-[9px] text-text-muted uppercase tracking-wider font-bold mb-2">
                Ahorros
              </p>
              <p className="text-xl font-bold text-text-accent">{`S/${centsToDecimal(totals.savings)}`}</p>
            </div>
            <div className="p-3 bg-white border border-border-subtle rounded-xl flex flex-col justify-between">
              <p className="text-[9px] text-text-muted uppercase tracking-wider font-bold mb-2">
                Inversiones
              </p>
              <p className="text-xl font-bold text-text-accent">{`S/${centsToDecimal(totals.investments)}`}</p>
            </div>
          </div>
        </section>

        {/* GRAPH */}
        {/* <section>Cuadro</section> */}

        {/* FILTERS */}
        <section className="flex items-center gap-3 mb-6 ">
          <div className="relative inline-block">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white border border-border-subtle rounded-full whitespace-nowrap"
              onClick={() => setIsMonthMenuOpen((prev) => !prev)}
            >
              <span className="text-xs font-semibold text-text-main">
                {MONTHS[selectedMonth].name}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="#6b7280"
                viewBox="0 0 256 256"
              >
                <path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"></path>
              </svg>
            </button>

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
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedMonth(2)
                      setIsMonthMenuOpen(false)
                    }}
                  >
                    Mar
                  </div>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-subtle rounded-full whitespace-nowrap">
            <span className="text-xs font-semibold text-text-main">
              Categorías
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="#6b7280"
              viewBox="0 0 256 256"
            >
              <path d="M176,80a12,12,0,0,1,12-12h28a12,12,0,0,1,0,24H188A12,12,0,0,1,176,80ZM40,92h96v12a12,12,0,0,0,24,0V56a12,12,0,0,0-24,0V68H40a12,12,0,0,0,0,24Zm176,72H124a12,12,0,0,0,0,24h92a12,12,0,0,0,0-24ZM84,140a12,12,0,0,0-12,12v12H40a12,12,0,0,0,0,24H72v12a12,12,0,0,0,24,0V152A12,12,0,0,0,84,140Z"></path>
            </svg>
          </button>
        </section>

        {/* TRANSACION CARDS */}
        <section>
          <h2 className="text-sm text-text-main font-bold mb-2">Movimientos</h2>
          <ExpensesCards
            filteredExpenses={filteredExpenses}
            onDeleteButtonClick={handleDeleteExpense}
          />
        </section>
      </div>
      {/* INPUT BAR */}
      <section className="fixed bottom-0 sm:bottom-6 md:left-[11.6rem] w-[100vw] md:w-[calc(100vw)]  md:w-[calc(100vw-11.6rem)] text-sm shadow-short sm:bg-transparent bg-white ">
        <TransactionInputBar
          transactionForm={transactionForm}
          onFormChange={handleExpenseFormInputChange}
          onSubmit={submitTransactionForm}
        />
      </section>
    </main>
  )
}
