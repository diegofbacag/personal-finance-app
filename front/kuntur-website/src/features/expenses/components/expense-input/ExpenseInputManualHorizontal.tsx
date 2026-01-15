import { ExpenseField } from './ExpenseField'
import Image from 'next/image'
import { ExpenseSelectCategory } from './ExpenseInputManualHorizontal/ExpenseSelectCategory'

export const ExpenseInputManualHorizontal = () => {
  return (
    <div className="flex flex-row gap-2 text-black">
      <ExpenseField
        title="Monto (S/)"
        name="amount"
        placeholder="Ej. 100"
        type="number"
      />
      <ExpenseSelectCategory />
      <ExpenseSelectCategory />
      <ExpenseField
        title="Descripcion"
        name="texto"
        placeholder="Ej. Cena con amigos"
        type="text"
      />
      <button
        className="flex items-center justify-center bg-[#0e8f53] rounded-full text-white h-10 w-10 cursor-pointer"
        onClick={submitExpenseFormData}
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
  )
}
