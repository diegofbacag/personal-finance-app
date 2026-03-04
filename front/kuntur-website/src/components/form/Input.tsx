type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = (props: InputProps) => {
  return <input className="border-2" {...props} />
}
