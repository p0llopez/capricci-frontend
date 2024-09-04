interface FormInputProps {
  label: string
  placeholder: string
  fieldName: string
  value: string
  error?: string
  tip?: string
  type?: string
  onChange: (e: Event) => void
}

export default function FormInput({
  label,
  placeholder,
  fieldName,
  value,
  error,
  tip,
  type = "text",
  onChange,
}: FormInputProps) {
  return (
    <>
      <div className="flex justify-between">
        <label className="font-semibold text-bluegray">{label}</label>
        {error && <p className="text-rouge">{error}</p>}
      </div>
      <input
        name={fieldName}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border bg-beige px-4 py-2 outline-none ${
          error ? "border border-rouge" : ""
        }`}
        placeholder={placeholder}
        type={type}
      />
      {tip && <p className="text-sm text-gray-400">{tip}</p>}
    </>
  )
}
