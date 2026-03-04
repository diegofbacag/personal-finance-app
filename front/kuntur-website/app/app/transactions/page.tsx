'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  createExpense,
  deleteExpense,
  getExpenses,
} from '@/src/features/expenses/services/expenses.service'
import { Transaction } from '@/src/features/expenses/types/transaction.model'
import { TransactionInputBar } from '@/src/features/expenses/components/expense-input/TransactionInputBar'
import { ExpensesCards } from '@/src/features/expenses/components/ExpensesCards'
import { TransactionForm } from '@/src/features/expenses/types/transaction.form'
import { CreateTransactionDto } from '@/src/features/expenses/types/transaction.dto'

const MONTHS = [
  { label: 'Ene', value: 0, name: 'Enero' },
  { label: 'Feb', value: 1, name: 'Febrero' },
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
        const response = await getExpenses()
        console.log('fetch expenses result', response.data.transactions)

        setTransactionHistory(response.data.transactions)
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
      const response = await createExpense(dto)
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

  const tableEndRef = useRef<HTMLDivElement | null>(null)

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('¿Eliminar este gasto?')) return

    const expenseToRestore = transactionHistory.find((e) => e.id === id)

    setTransactionHistory((prev) => prev.filter((e) => e.id !== id))
    console.log('historia', transactionHistory)

    try {
      await deleteExpense(id)
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
      <div className="relative flex flex-col w-[95vw] md:w-[68vw] gap-2 py-10">
        {/* <header className="flex align-top items-center justify-between">
          <h1 className="items-center text-xl border-b font-bold text-black mt-0 align-top leading-none w-full">
            Mis movimientos
          </h1>
        </header> */}
        <div className="flex flex-col  gap-3">
          <div className="flex flex-row gap-4 items-center justify-start">
            <div className="flex flex-col gap-1 rounded-2xl p-8 bg-white">
              <p className="text-[#666666] text-sm">Gasto Total</p>
              <p className="text-3xl text-black font-bold  ">{`S/ ${centsToDecimal(
                filteredExpenses.reduce((sum, expense) => {
                  return sum + expense.amount
                }, 0),
              )}`}</p>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl p-8 bg-primary text-white">
              <p className="text-[#666666] text-sm">Gasto Total</p>
              <p className="text-3xl  font-bold ">{`S/ ${centsToDecimal(
                filteredExpenses.reduce((sum, expense) => {
                  return sum + expense.amount
                }, 0),
              )}`}</p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-2">
            <div className="relative inline-block">
              <button
                className="cursor-pointer flex items-center justify-center p-2 px-3 rounded-xl text-sm gap-1 tracking-wide bg-[#1F3B2E] text-white"
                onClick={() => setIsMonthMenuOpen((prev) => !prev)}
              >
                <p>{MONTHS[selectedMonth].name}</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="#ffffff"
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
        </div>

        <ExpensesCards
          filteredExpenses={filteredExpenses}
          onDeleteButtonClick={handleDeleteExpense}
        />
        <section className="fixed bottom-4 md:bottom-6 md:left-[11.6rem] w-[calc(95vw)] md:w-[calc(100vw)]  md:w-[calc(100vw-11.6rem)] text-sm shadow-short">
          <TransactionInputBar
            transactionForm={transactionForm}
            onFormChange={handleExpenseFormInputChange}
            onSubmit={submitTransactionForm}
          />
        </section>
      </div>
    </main>
  )
}
