export const ExpenseSelectCategory = () => {
  return (
    <div className="">
      <p className="font-medium text-sm text-[#495057]">Categoría</p>
      <select
        name="category"
        className="p-1 my-1 rounded-md focus:outline-none border-none text-[#212529] bg-white transition-all duration-200
    focus:shadow-[0_0_6px_1px_rgba(14,143,83,0.25)]
    placeholder:text-gray-400
    text-sm

  "
      >
        <option value="">Selecciona una subcategoría</option>
        <option value="Gastos fijos">Gastos fijos</option>
        <option value="Gastos libres">Gasto libre</option>
      </select>
    </div>
  )
}
