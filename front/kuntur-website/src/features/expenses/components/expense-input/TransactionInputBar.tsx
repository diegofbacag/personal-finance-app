import Image from 'next/image'
import { ExpenseForm } from '../../types/expense.form'
import { useEffect, useRef, useState } from 'react'
import 'react-day-picker/dist/style.css'
import { DayPicker } from 'react-day-picker'

interface TransactionInputBarProps {
  expenseFormData: ExpenseForm
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
  onSubmit: () => void
}

export const spendingPlan = [
  {
    id: 'fixed_costs',
    label: 'Gastos Fijos',
    recommendedMin: 50,
    recommendedMax: 60,
    color: '#4F46E5',
    subcategories: [
      { id: 'rent', label: 'Alquiler' },
      { id: 'utilities', label: 'Servicios' },
      { id: 'internet', label: 'Internet' },
      { id: 'phone', label: 'Celular' },
      { id: 'insurance', label: 'Seguro' },
      { id: 'transport', label: 'Transporte' },
      { id: 'debt', label: 'Deudas' },
      { id: 'subscriptions', label: 'Suscripciones' },
    ],
  },
  {
    id: 'guilt_free',
    label: 'Gastos Sin Culpa',
    recommendedMin: 20,
    recommendedMax: 35,
    color: '#F59E0B',
    subcategories: [
      { id: 'restaurants', label: 'Restaurantes' },
      { id: 'coffee', label: 'Café' },
      { id: 'travel', label: 'Viajes' },
      { id: 'entertainment', label: 'Entretenimiento' },
      { id: 'clothes', label: 'Ropa' },
      { id: 'hobbies', label: 'Hobbies' },
      { id: 'gifts', label: 'Regalos' },
      { id: 'tech', label: 'Tecnología' },
    ],
  },
  {
    id: 'savings',
    label: 'Ahorros',
    recommendedMin: 5,
    recommendedMax: 10,
    color: '#10B981',
    subcategories: [
      { id: 'emergency_fund', label: 'Fondo de Emergencia' },
      { id: 'house_savings', label: 'Vivienda' },
      { id: 'travel_savings', label: 'Viaje' },
      { id: 'education_savings', label: 'Estudios' },
      { id: 'annual_goal', label: 'Meta Anual' },
    ],
  },
  {
    id: 'investments',
    label: 'Inversiones',
    recommendedMin: 5,
    recommendedMax: 10,
    color: '#06B6D4',
    subcategories: [
      { id: 'index_funds', label: 'Fondos Indexados' },
      { id: 'etfs', label: 'ETFs' },
      { id: 'stocks', label: 'Acciones' },
      { id: 'mutual_funds', label: 'Fondos Mutuos' },
      { id: 'real_estate', label: 'Bienes Raíces' },
      { id: 'business', label: 'Negocio' },
    ],
  },
  {
    id: 'other',
    label: 'Otros',
    recommendedMin: 0,
    recommendedMax: 5,
    color: '#6B7280',
    subcategories: [
      { id: 'unexpected', label: 'Imprevistos' },
      { id: 'repairs', label: 'Reparaciones' },
      { id: 'family_support', label: 'Ayuda Familiar' },
      { id: 'donations', label: 'Donaciones' },
      { id: 'misc', label: 'Varios' },
    ],
  },
]

const inputClass = `placeholder:text-gray-400 text-[#212529] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`
const selectClass = `w-full p-2 rounded-md border border-gray-300 bg-white text-[#6c757d] text-sm transition-colors focus:ring-3 focus:ring-[#DCE9DF] focus:ring-offset-0 focus:outline-none`
const labelClass = `text-xs text-[#1F3B2E] px-1`

export const TransactionInputBar = ({
  expenseFormData,
  onFormChange,
  onSubmit,
}: TransactionInputBarProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  )
  const activeCategory =
    spendingPlan.find((cat) => cat.id === selectedCategoryId) ??
    spendingPlan.find((cat) => cat.id === 'other')!
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Categoría')
  const [isSubcategoryMenuOpen, setIsSubcategoryMenuOpen] = useState(false)
  const [selectedSubcategory, setSelectedSubcategory] = useState('Subcategoría')
  const ref = useRef<HTMLDivElement>(null)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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
        <div className="flex flex-row gap-2 w-full sm:contents items-end justify-between">
          {/* Category */}
          <div className="relative ">
            <button
              className="flex flex-row flex-1 items-center justify-center bg-[#1F3B2E]/10 text-primary rounded-lg p-2 cursor-pointer min-w-[120px]"
              onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
            >
              <Image
                src="/img/icons/dots-three-outline-vertical.png"
                height={18}
                width={18}
                alt="category icon"
                className=""
              />
              <span className="text-xs font-bold truncate">
                {selectedCategory}
              </span>
            </button>
            {isCategoryMenuOpen && (
              <div className="absolute left-0 bottom-full mb-1 w-40 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                {spendingPlan.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryId(cat.id)
                      setSelectedCategory(cat.label)
                      setIsCategoryMenuOpen(false)
                      onFormChange({
                        target: { name: 'category', value: cat.label },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subcategory */}
          <div className="relative ">
            <button
              className="flex flex-row flex-1 items-center justify-center bg-[#1F3B2E]/10 text-primary rounded-lg p-2 cursor-pointer min-w-[140px]"
              onClick={() => setIsSubcategoryMenuOpen((prev) => !prev)}
            >
              <Image
                src="/img/icons/dot-outline.png"
                height={18}
                width={18}
                alt="category icon"
                className=""
              />
              <span className="text-xs font-bold truncate">
                {selectedSubcategory}
              </span>
            </button>
            {isSubcategoryMenuOpen && (
              <div className="absolute left-0 bottom-full mb-1 w-40 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                {activeCategory.subcategories.map((subcat) => (
                  <button
                    key={subcat.id}
                    onClick={() => {
                      setSelectedSubcategory(subcat.label)
                      setIsSubcategoryMenuOpen(false)
                      onFormChange({
                        target: { name: 'subcategory', value: subcat.id },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subcat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Date */}

          <div className="relative">
            {/* Your custom button */}
            <button
              className="flex flex-row items-center justify-center bg-[#1F3B2E]/10 text-primary gap-1 rounded-lg p-2 cursor-pointer "
              onClick={() => setIsDatePickerOpen((prev) => !prev)}
            >
              <span className="hidden sm:block text-xs font-bold truncate">
                {expenseFormData.date || 'Fecha'}
              </span>
              <Image
                src="/img/icons/calendar-blank.png"
                height={18}
                width={18}
                alt="calendar icon"
              />
            </button>

            {/* DayPicker dropdown */}
            {isDatePickerOpen && (
              <div className="absolute bottom-full mb-1 bg-white rounded-lg shadow-lg z-50 p-2">
                <DayPicker
                  mode="single"
                  selected={
                    expenseFormData.date
                      ? new Date(expenseFormData.date + 'T12:00:00')
                      : undefined
                  }
                  onSelect={(date) => {
                    if (!date) return
                    const iso = date.toLocaleDateString('en-CA')
                    onFormChange({
                      target: { name: 'date', value: iso },
                    } as React.ChangeEvent<HTMLInputElement>)
                    setIsDatePickerOpen(false)
                  }}
                />
              </div>
            )}
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
