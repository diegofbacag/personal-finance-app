import { Button } from '@/src/components/ui/Button'
import { useState } from 'react'

import Image from 'next/image'

export const ExpenseInput = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <section
      onClick={() => setIsExpanded(true)}
      className={`rounded-2xl py-3 px-4 text-sm bg-[#f5f5f5] transition-all duration-300 ${className}`}
    >
      {!isExpanded ? (
        <>
          <p className="text-sm text-[#9FA3A0] font-sans">
            Ingresa tu gasto...
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-1 transition-all duration-300">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-[#495057]">Monto:</p>
            <input
              type="number"
              placeholder="100"
              className="bg-transparent p-0 text-[#0B3D1F] font-bold placeholder:text-[#A5A5A5] 
      focus:outline-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-10 placeholder:font-normal"
            />
            <p className="bg-[#dbf2d9] text-[#0a7242] px-2 py-1 rounded-2xl text-xs font-bold">
              PEN
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-[#495057]">Categoria:</p>

            <select
              name="category"
              //   value={expenseFormData.category}
              //   onChange={handleExpenseFormInput}
              className="bg-transparent p-0 text-[#0B3D1F] font-bold placeholder:text-[#A5A5A5 focus:outline-none border-none"
            >
              <option value="">Selecciona una categoría</option>
              <option value="Gastos fijos">Gastos fijos</option>
              <option value="Gastos libres">Gasto libre</option>
            </select>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-[#495057]">Subategoria:</p>

            <select
              name="category"
              //   value={expenseFormData.category}
              //   onChange={handleExpenseFormInput}
              className="bg-transparent p-0 text-[#0B3D1F] font-bold placeholder:text-[#A5A5A5 focus:outline-none border-none "
            >
              <option value="">Selecciona una subcategoría</option>
              <option value="Gastos fijos">Comida</option>
              <option value="Gastos libres">Transporte</option>
            </select>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-[#495057]">Fecha:</p>
            <input
              type="date"
              className="bg-transparent p-0 text-[#0B3D1F] placeholder:text-[#A5A5A5] 
      focus:outline-none border-none placeholder:font-normal placeholder:font-normal
      [color:#A5A5A5]"
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-[#495057]">Descripcion:</p>
            <input
              type="text"
              placeholder="Cena con amigos"
              className="bg-transparent p-0 text-[#0B3D1F] font-bold placeholder:text-[#A5A5A5]  placeholder:font-normal
      focus:outline-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          <div className="flex flex-row items-center justify-between pt-1 h-full">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(false)
              }}
              className="text-xs text-[#6F9B7E] underline self-start cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-end ">
        <div className="flext items-center  rounded-full p-2 cursor-pointer">
          <Image
            src="/svg/icons/plus-bold.svg"
            alt="submit icon"
            height={20}
            width={20}
          />
        </div>
      </div>
    </section>
  )
}
