import { centsToDecimal, formatDate } from '@/app/app/transactions/page'
import { Transaction } from '../types/transaction.model'

interface ExpensesCardsProps {
  filteredExpenses: Transaction[]
  onDeleteButtonClick: (id: string) => void
}

export const ExpensesCards = ({
  filteredExpenses,
  onDeleteButtonClick,
}: ExpensesCardsProps) => {
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  console.log('missing expenses?', sortedExpenses)

  const groupedByDate = sortedExpenses.reduce<Record<string, Transaction[]>>(
    (acc, expense) => {
      const date = formatDate(expense.date)

      if (!acc[date]) {
        acc[date] = []
      }

      acc[date].push(expense)

      return acc
    },
    {},
  )
  return (
    <section
      aria-label="Expenses cards"
      className="flex flex-col justify-center pb-28 gap-2"
    >
      {Object.entries(groupedByDate).map(([date, expenses]) => (
        <div key={date} className="flex flex-col gap-0">
          <p className="text-sm text-text-muted font-medium font-serif">
            {date}
          </p>

          {expenses.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between py-4 border-b border-border-subtle"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#f1f5ee] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="#22321a"
                    viewBox="0 0 256 256"
                  >
                    <path d="M72,104a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,104Zm8,40h96a8,8,0,0,0,0-16H80a8,8,0,0,0,0,16ZM232,56V208a8,8,0,0,1-11.58,7.15L192,200.94l-28.42,14.21a8,8,0,0,1-7.16,0L128,200.94,99.58,215.15a8,8,0,0,1-7.16,0L64,200.94,35.58,215.15A8,8,0,0,1,24,208V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V195.06l20.42-10.22a8,8,0,0,1,7.16,0L96,199.06l28.42-14.22a8,8,0,0,1,7.16,0L160,199.06l28.42-14.22a8,8,0,0,1,7.16,0L216,195.06Z"></path>
                  </svg>
                </div>

                <div className="flex flex-col items-start justify-center gap-0 text-xs text-[#1F3B2E]">
                  <p className="text-sm font-semibold text-text-main">
                    {e.description ?? 'Otros'}
                  </p>
                  <div className="flex flex-row items-center justify-center text-xs text-text-muted font-medium font-serif gap-1">
                    <p className="">{e.category_label}</p>
                    <span>•</span>
                    <p className="">{e.subcategory_label}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center text-sm font-bold text-text-main gap-0">
                <div>
                  <span>-</span>
                  {`S/ ${centsToDecimal(e.amount)}`}
                </div>
                <button
                  className="cursor-pointer"
                  onClick={() => onDeleteButtonClick(e.id!)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="20"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}
