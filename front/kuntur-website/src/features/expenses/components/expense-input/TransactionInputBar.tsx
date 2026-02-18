import Image from 'next/image'
import { ExpenseForm } from '../../types/expense.form'

interface TransactionInputBarProps {
  expenseFormData: ExpenseForm
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
  onSubmit: () => void
}

export const TransactionInputBar = ({
  expenseFormData,
  onFormChange,
  onSubmit,
}: TransactionInputBarProps) => {
  const inputClass = `placeholder:text-gray-400 text-[#212529] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`

  const selectClass = `w-full p-2 rounded-md border border-gray-300 bg-white text-[#6c757d] text-sm transition-colors focus:ring-3 focus:ring-[#DCE9DF] focus:ring-offset-0 focus:outline-none`

  const labelClass = `text-xs text-[#1F3B2E] px-1`

  return (
    <div className="w-[95vw] md:max-w-[70vw] mx-auto bg-white/90  border border-white shadow-2xl rounded-2xl py-2 shadow-[#1F3B2E]/20 px-3 backdrop-blur-xl">
      {/* On mobile: 2 stacked rows. On sm+: single flex row */}
      <div className="flex flex-col sm:flex-row items-end gap-2 w-full">
        {/* ROW 1 on mobile: Amount + Description */}
        <div className="flex flex-row gap-2 w-full sm:contents">
          {/* Amount */}
          <div className="flex-[2] bg-gray-50 rounded-xl px-4 py-2 flex items-center">
            <span className="text-gray-400 font-bold text-sm mr-1">S/</span>
            <input
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              className={`bg-transparent border-none focus:ring-0 p-0 text-xl font-bold w-full text-[#0e0e1b] dark:text-white ${inputClass}`}
              onChange={onFormChange}
            />
          </div>

          {/* Description */}
          <div className="flex-[3] bg-gray-50  dark:bg-slate-800/50 rounded-xl px-4 py-2 flex items-center ">
            <input
              name="description"
              type="text"
              placeholder="¿De qué fue este movimiento?"
              className={`bg-transparent border-none focus:ring-0 p-0 text-sm w-full placeholder:text-[#0e0e1b] ${inputClass}`}
              onChange={onFormChange}
            />
          </div>
        </div>

        {/* ROW 2 on mobile: Category + Subcategory + Date + Button */}
        <div className="flex flex-row gap-2 w-full sm:contents items-end">
          {/* Category */}
          <button className="flex-1 bg-primary/10 dark:bg-primary/20 text-primary px-3 py-2 rounded-lg flex items-center justify-center gap-1">
            <span className="text-[11px] font-bold uppercase truncate">
              Categoría
            </span>
          </button>
          <div className="flex flex-col gap-0.5 flex-1">
            <select
              name="category"
              defaultValue="Gastos fijos"
              className={selectClass}
              onChange={onFormChange}
            >
              <option value="" disabled hidden>
                Selecciona una categoría
              </option>
              <option value="Gastos fijos">Gastos fijos</option>
              <option value="Gastos libres">Gastos sin culpa</option>
              <option value="Ahorros">Ahorros</option>
              <option value="Inversión">Inversión</option>
            </select>
          </div>

          {/* Subcategory */}
          <div className="flex flex-col gap-0.5 flex-1">
            <select
              name="subcategory"
              defaultValue=""
              className={selectClass}
              onChange={onFormChange}
            >
              <option value="" disabled hidden>
                Selecciona una subcategoría
              </option>
              <option value="Gastos fijos">Gastos fijos</option>
              <option value="Gastos libres">Gastos sin culpa</option>
              <option value="Ahorros">Ahorros</option>
              <option value="Inversión">Inversión</option>
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-0.5 flex-1">
            <input
              type="date"
              name="date"
              value={
                expenseFormData.date || new Date().toISOString().split('T')[0]
              }
              onChange={onFormChange}
              className={selectClass}
            />
          </div>

          {/* Submit */}
          <button
            className="flex items-center justify-center bg-[#1F3B2E] rounded-full text-white h-10 w-10 shrink-0 cursor-pointer"
            onClick={onSubmit}
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
      </div>
    </div>
  )
}
