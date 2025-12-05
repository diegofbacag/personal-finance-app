import { ExpenseField } from './ExpenseField'
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
        type="number"
      />
    </div>
  )
}
