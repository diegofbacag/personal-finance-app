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
          <div className="flex-[2] bg-gray-50 rounded-xl px-4 py-2 flex items-center h-[40px]">
            <span className="text-[#1F3B2E] tracking-tight font-bold text-base mr-1">
              S/
            </span>
            <input
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              className={`bg-transparent border-none focus:ring-0 p-0 font-bold text-base w-full text-[#0e0e1b] ${inputClass}`}
              onChange={onFormChange}
            />
          </div>

          {/* Description */}
          <div className="flex-[3] bg-gray-50 rounded-xl px-4 py-2 flex items-center h-[40px] ">
            <input
              name="description"
              type="text"
              placeholder="¿En qué usaste tu dinero?"
              className={`bg-transparent border-none focus:ring-0 p-0  text-sm font-bold w-full placeholder:font-light text-[#0e0e1b]  ${inputClass}`}
              onChange={onFormChange}
            />
          </div>
        </div>

        {/* ROW 2 on mobile: Category + Subcategory + Date + Button */}
        <div className="flex flex-row gap-2 w-full sm:contents items-center justify-between">
          {/* Category */}
          <div className="relative ">
            <button
              className="flex flex-row gap-1 flex-1 items-center justify-center bg-[#0E9053]/15 text-primary rounded-lg p-3 cursor-pointer min-w-[120px] h-[40px]"
              onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z"></path>
              </svg>
              <span className="text-xs font-bold text-[#1F3B2E] truncate">
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
              className="flex flex-row gap-1 flex-1 items-center justify-center bg-[#0E9053]/8 text-primary rounded-lg p-3 cursor-pointer min-w-[140px] h-[40px]"
              onClick={() => setIsSubcategoryMenuOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M72,60A12,12,0,1,1,60,48,12,12,0,0,1,72,60Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,128,48Zm68,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,184a12,12,0,1,0,12,12A12,12,0,0,0,60,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,184Z"></path>
              </svg>
              <span className="text-xs font-bold text-[#1F3B2E] truncate ">
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
                        target: { name: 'subcategory', value: subcat.label },
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

          <div className="relative h-[42px]">
            {/* Your custom button */}
            <button
              className="flex flex-row items-center justify-center  bg-gray-50 text-[#0e0e1b]  gap-2 rounded-lg p-3 cursor-pointer "
              onClick={() => setIsDatePickerOpen((prev) => !prev)}
            >
              <span className="hidden sm:block text-xs font-bold truncate">
                {expenseFormData.date || 'Fecha'}
              </span>
              <Image
                src="/img/icons/calendar-blank.png"
                height={20}
                width={20}
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
