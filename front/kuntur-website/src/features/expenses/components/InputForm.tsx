import { Button } from '@/src/components/ui/Button'
import { useState } from 'react'

export const InputForm = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <section
      onClick={() => setIsExpanded(true)}
      className="border rounded-2xl py-3 px-4 text-sm 
      border-[#BEE6C8] bg-[#F8FFF9] shadow-sm shadow-[#BEE6C8]/50 
      transition-all duration-300 cursor-pointer"
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
          <div className="flex flex-row items-center justify-between pt-1">
            <div>
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

            <Button className="bg-[#A7D9B3] hover:bg-[#97C7A3] text-[#0B3D1F] w-24">
              Guardar
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

//  <section
//           aria-label="Expenses input bar"
//           className="fixed bottom-10 min-w-[80vw] left-1/2 transform -translate-x-1/2 "
//         >
//           <div className="px-4 grid grid-cols-[1fr_auto] bg-white items-center border rounded-full border-gray-900/5 p-1 shadow-md gap-4">
//             {/* <div className="flex items-center justify-center rounded-full text-white h-10 w-10">
//             <Image
//               src="/svg/icons/menu.svg"
//               height={20}
//               width={20}
//               alt="plus icon"
//             />
//           </div> */}
//             <div className="grid grid-cols-5 items-start text-sm text-gray">
//               <div>
//                 <p className="font-medium text-sm text-[#495057]">Monto (S/)</p>
//                 <input
//                   type="number"
//                   name="amount"
//                   value={expenseFormData.amount}
//                   placeholder="Ej. 100"
//                   min="1"
//                   onChange={handleExpenseFormInput}
//                   className="
//                 my-1 rounded-md focus:outline-none placeholder:text-gray-400 placeholder:italic placeholder:font-light text-[#212529] bg-white transition-all duration-300 focus:bg-[#0e8f53]/10 focus:shadow-[0_0_20px_8px_rgba(14,143,83,0.12)]"
//                 ></input>
//               </div>
//               <div>
//                 <p className="font-medium text-sm text-[#495057]">Categoría</p>
//                 <select
//                   name="category"
//                   value={expenseFormData.category}
//                   onChange={handleExpenseFormInput}
//                   className="
//     my-1 rounded-md
//     focus:outline-none

//     border-none
//     text-[#212529]
//     bg-white
//     transition-all duration-200

//     focus:shadow-[0_0_6px_1px_rgba(14,143,83,0.25)]
//     placeholder:text-gray-400
//     text-sm

//   "
//                 >
//                   <option value="">Selecciona una subcategoría</option>
//                   <option value="Gastos fijos">Gastos fijos</option>
//                   <option value="Gastos libres">Gasto libre</option>
//                 </select>
//               </div>
//               <div>
//                 <p className="font-medium text-sm text-[#495057]">
//                   Subcategoría
//                 </p>
//                 <select
//                   name="subcategory"
//                   value={expenseFormData.category}
//                   onChange={handleExpenseFormInput}
//                   className="
//     my-1 rounded-md
//     focus:outline-none

//     border-none
//     text-[#212529]
//     bg-white
//     transition-all duration-200

//     focus:shadow-[0_0_6px_1px_rgba(14,143,83,0.25)]
//     placeholder:text-gray-400
//     text-sm

//   "
//                 >
//                   <option value="">Selecciona una categoría</option>
//                   <option value="Gastos fijos">Gastos fijos</option>
//                   <option value="Gastos libres">Gasto libre</option>
//                 </select>
//               </div>
//               <div>
//                 <p className="font-medium text-sm text-[#495057]">
//                   Descripción
//                 </p>
//                 <input
//                   type="text"
//                   name="description"
//                   value={expenseFormData.description}
//                   placeholder="Ej. Cena con amigos"
//                   onChange={handleExpenseFormInput}
//                   className="
//                 my-1 rounded-md focus:outline-none placeholder:text-gray-400 placeholder:italic placeholder:font-light text-[#212529] bg-white transition-all duration-300 focus:bg-[#0e8f53]/10 focus:shadow-[0_0_20px_8px_rgba(14,143,83,0.12)]"
//                 />
//               </div>
//               <div>
//                 <p className="font-medium font-medium text-[#495057]">Fecha</p>
//                 <input
//                   type="date"
//                   name="date"
//                   value={
//                     expenseFormData.date ||
//                     new Date().toISOString().split('T')[0]
//                   }
//                   placeholder="100"
//                   onChange={handleExpenseFormInput}
//                   className="
//                 my-1 rounded-md focus:outline-none placeholder:text-gray-400 placeholder:italic placeholder:font-light text-[#212529] bg-white transition-all duration-300 focus:bg-[#0e8f53]/10 focus:shadow-[0_0_20px_8px_rgba(14,143,83,0.12)]"
//                 />
//               </div>
//             </div>

//             <button
//               className="flex items-center justify-center bg-[#0e8f53] rounded-full text-white h-10 w-10 cursor-pointer"
//               onClick={submitExpenseFormData}
//             >
//               <Image
//                 src="/svg/icons/plus-bold.svg"
//                 height={20}
//                 width={20}
//                 alt="send icon"
//                 className="invert"
//               />
//             </button>
//           </div>
//         </section>
