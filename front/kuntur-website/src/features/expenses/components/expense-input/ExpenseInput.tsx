import { ExpenseInputManualHorizontal } from './ExpenseInputManualHorizontal'

interface ExpenseInputProps {
  className?: string
}

export const ExpenseInput = ({ className }: ExpenseInputProps) => {
  return (
    <section
      className={`rounded-xl py-3 px-4 text-sm bg-[#f5f5f5] transition-all duration-300 ${className}`}
    >
      <ExpenseInputManualHorizontal />
    </section>
  )
}
