interface ExpenseFieldProps {
  title: string
  name: string
  type: 'number' | 'text'
  placeholder: string
}

export const ExpenseField = ({
  title,
  name,
  type,
  placeholder,
}: ExpenseFieldProps) => {
  return (
    <div className="">
      <p className="font-medium text-sm text-[#495057]">{title}</p>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        min="1"
        className="p-1 my-1 rounded-md focus:outline-none placeholder:text-gray-400 placeholder:italic placeholder:font-light text-[#212529] bg-white transition-all duration-300 focus:bg-[#0e8f53]/10 focus:shadow-[0_0_20px_8px_rgba(14,143,83,0.12)] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      ></input>
    </div>
  )
}
