import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import 'react-day-picker/dist/style.css'
import { es } from 'react-day-picker/locale'
import { DayPicker } from 'react-day-picker'
import {
  CATEGORIES,
  CategoryId,
  getCategoryById,
} from '@/src/features/transactions/constants/categories'
import { TransactionForm } from '../../types/transaction.form'

interface TransactionInputBarProps {
  transactionForm: TransactionForm
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
  onSubmit: () => void
}

const inputClass = `placeholder:text-gray-400 text-[#212529] focus:outline-none [appearance:textfield] 
  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`

export const TransactionInputBar = ({
  transactionForm,
  onFormChange,
  onSubmit,
}: TransactionInputBarProps) => {
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<CategoryId | null>(null)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    string | null
  >(null)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const [isSubcategoryMenuOpen, setIsSubcategoryMenuOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selectedCategory = selectedCategoryId
    ? getCategoryById(selectedCategoryId)
    : null
  const categoryLabel = selectedCategory?.label ?? 'Categoría'

  const subcategoryLabel =
    selectedCategory && selectedSubcategoryId
      ? (selectedCategory.subcategories.find(
          (s) => s.id === selectedSubcategoryId,
        )?.label ?? 'Subcategoría')
      : 'Subcategoría'

  const availableSubcategories = selectedCategory
    ? selectedCategory.subcategories
    : getCategoryById('VARIABLE_EXPENSES').subcategories

  const handleCategorySelect = (categoryId: CategoryId) => {
    setSelectedCategoryId(categoryId)
    setSelectedSubcategoryId(null)
    setIsCategoryMenuOpen(false)

    onFormChange({
      target: { name: 'category_id', value: categoryId },
    } as React.ChangeEvent<HTMLInputElement>)

    onFormChange({
      target: { name: 'subcategory_id', value: '' },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategoryId(subcategoryId)
    setIsSubcategoryMenuOpen(false)

    onFormChange({
      target: { name: 'subcategory_id', value: subcategoryId },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false)
        setIsSubcategoryMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div
      ref={ref}
      className="w-[95vw] md:max-w-[70vw] mx-auto bg-white md:bg-white/90 border border-white md:shadow-2xl rounded-2xl py-3 sm:py-2 shadow-[#1F3B2E]/20 px-2 sm:px-3 backdrop-blur-xl"
    >
      <div className="flex flex-col sm:flex-row items-end gap-2 w-full">
        {/* ROW 1: Amount + Description */}
        <div className="flex flex-row gap-2 w-full sm:contents">
          {/* Amount */}
          <div className="flex-[2] bg-gray-50 rounded-xl px-4 py-2 flex items-center h-[40px]">
            <span className="text-primary tracking-tight font-bold text-base mr-1">
              S/
            </span>
            <input
              name="amount"
              type="number"
              value={transactionForm.amount}
              step="0.01"
              min="0.01"
              placeholder="0.00"
              className={`bg-transparent border-none focus:ring-0 p-0 font-bold text-base w-full text-[#0e0e1b] ${inputClass}`}
              onChange={onFormChange}
            />
          </div>

          {/* Description */}
          <div className="flex-[3] bg-gray-50 rounded-xl px-4 py-2 flex items-center h-[40px]">
            <input
              name="description"
              value={transactionForm.description}
              type="text"
              placeholder="¿En qué usaste tu dinero?"
              className={`bg-transparent border-none focus:ring-0 p-0 text-sm font-bold w-full placeholder:font-light text-[#0e0e1b] ${inputClass}`}
              onChange={onFormChange}
            />
          </div>
        </div>

        {/* ROW 2: Category + Subcategory + Date + Submit */}
        <div className="flex flex-row gap-2 w-full sm:contents items-center justify-between">
          {/* Category */}
          <div className="relative">
            <button
              className="flex flex-row gap-1 flex-1 items-center justify-center bg-primary/20 rounded-lg p-3 cursor-pointer min-w-[120px] h-[40px]"
              onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#1919e6"
                viewBox="0 0 256 256"
              >
                <path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z" />
              </svg>
              <span className="text-xs font-bold text-primary truncate">
                {categoryLabel}
              </span>
            </button>

            {isCategoryMenuOpen && (
              <div className="absolute left-0 bottom-full mb-1 w-40 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subcategory */}
          <div className="relative">
            <button
              className="flex flex-row gap-1 flex-1 items-center justify-center bg-primary/10 text-[#3A3A37] rounded-lg p-3 cursor-pointer min-w-[140px] h-[40px] disabled:opacity-50"
              onClick={() => setIsSubcategoryMenuOpen((prev) => !prev)}
              disabled={!selectedCategoryId}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#1919e6"
                viewBox="0 0 256 256"
              >
                <path d="M72,60A12,12,0,1,1,60,48,12,12,0,0,1,72,60Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,128,48Zm68,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,184a12,12,0,1,0,12,12A12,12,0,0,0,60,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,184Z" />
              </svg>
              <span className="text-xs font-bold text-primary truncate">
                {subcategoryLabel}
              </span>
            </button>

            {isSubcategoryMenuOpen && (
              <div className="absolute left-0 bottom-full mb-1 w-40 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                {availableSubcategories.map((subcat) => (
                  <button
                    key={subcat.id}
                    onClick={() => handleSubcategorySelect(subcat.id)}
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
            <button
              className="flex flex-row items-center justify-center bg-gray-50 text-[#0e0e1b] gap-2 rounded-lg p-3 cursor-pointer"
              onClick={() => setIsDatePickerOpen((prev) => !prev)}
            >
              <span className="hidden sm:block text-xs font-bold truncate">
                {transactionForm.date || 'Fecha'}
              </span>
              <Image
                src="/img/icons/calendar-blank.png"
                height={20}
                width={20}
                alt="calendar icon"
              />
            </button>

            {isDatePickerOpen && (
              <div className="absolute bottom-full right-0 mb-1 bg-white rounded-lg shadow-lg z-50 p-2">
                <DayPicker
                  mode="single"
                  locale={es}
                  style={
                    {
                      '--rdp-accent-color': '#1919e6',
                      '--rdp-accent-background-color': '#DCE9DF',
                    } as React.CSSProperties
                  }
                  selected={
                    transactionForm.date
                      ? new Date(transactionForm.date + 'T12:00:00')
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
            className="flex items-center justify-center bg-primary rounded-full text-white h-10 w-10 shrink-0 cursor-pointer"
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
