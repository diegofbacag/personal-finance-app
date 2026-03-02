import { centsToDecimal, formatDate } from '@/app/expenses/my-expenses/page'
import { Expense } from '../types/expense.model'

interface ExpensesCardsProps {
  filteredExpenses: Expense[]
  onDeleteButtonClick: (id: string) => void
}

export const ExpensesCards = ({
  filteredExpenses,
  onDeleteButtonClick,
}: ExpensesCardsProps) => {
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const groupedByDate = sortedExpenses.reduce<Record<string, Expense[]>>(
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
        <div key={date} className="flex flex-col gap-1">
          <p className="text-[#666666] text-sm pl-1">{date}</p>

          {expenses.map((e) => (
            <div
              key={e.id}
              className="flex flex-row items-center justify-between bg-white w-full p-2 rounded-lg gap-2"
            >
              <div className="flex flex-row gap-2">
                <div className="flex items-center justify-center bg-[#0E9053]/15 rounded-lg h-10 w-10 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#1F3B2E"
                    viewBox="0 0 256 256"
                  >
                    <path d="M216,40H40A16,16,0,0,0,24,56V208a8,8,0,0,0,11.58,7.15L64,200.94l28.42,14.21a8,8,0,0,0,7.16,0L128,200.94l28.42,14.21a8,8,0,0,0,7.16,0L192,200.94l28.42,14.21A8,8,0,0,0,232,208V56A16,16,0,0,0,216,40ZM176,144H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Zm0-32H80a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Z"></path>
                  </svg>
                </div>

                <div className="flex flex-col items-start justify-center gap-0 text-xs text-[#1F3B2E]">
                  <p className="font-bold text-sm">{e.description}</p>
                  <div className="flex flex-row items-center justify-center text-gray-800 text-xs gap-1">
                    <p className="">{e.category_name}</p>
                    <span>•</span>
                    <p className="">{e.subcategory_name}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center text-sm font-bold gap-0">
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
