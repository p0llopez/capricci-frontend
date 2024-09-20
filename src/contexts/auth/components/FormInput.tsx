import type { UseFormRegisterReturn } from "react-hook-form" // Importa los tipos para registrar el campo
// Importa los tipos para registrar el campo

interface FormInputProps {
  disabled?: boolean
  error?: string
  fieldName: string
  label: string
  placeholder: string
  register?: UseFormRegisterReturn
  tip?: string
  type?: string
  value?: string
}

export default function FormInput({
  disabled = false, // Por defecto está habilitado
  error,
  fieldName,
  label,
  placeholder,
  register, // Props que vendrán de react-hook-form
  tip,
  type = "text",
  value,
}: FormInputProps) {
  return (
    <>
      <div className="flex justify-between">
        <label className="font-semibold text-bluegray">{label}</label>
        {error && <p className="text-rouge">{error}</p>}
      </div>
      <input
        name={fieldName}
        {...register} // Se pasa el registro de React Hook Form directamente
        className={`w-full rounded-md border bg-beige px-4 py-2 outline-none ${
          error ? "border border-rouge" : ""
        } ${disabled ? "cursor-not-allowed bg-gray-200" : ""}`} // Estilo cuando está deshabilitado
        placeholder={placeholder}
        type={type}
        disabled={disabled} // Aquí deshabilitamos el input si es necesario
        value={value}
      />
      {tip && <p className="text-sm text-gray-400">{tip}</p>}
    </>
  )
}
