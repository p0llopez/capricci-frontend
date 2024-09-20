import { checkUserExists } from "@/contexts/auth/api/authService"
import FormInput from "@/contexts/auth/components/FormInput"
import LoginFormButton from "@/contexts/auth/components/LoginFormButton"
import { initialFormSchema } from "@/contexts/auth/schemas/initialFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface InitialFormInputs {
  email: string
}

interface InitialFormProps {
  onNext: (isNewUser: boolean, email: string) => void
}

export default function InitialForm({ onNext }: InitialFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitialFormInputs>({
    resolver: zodResolver(initialFormSchema),
    mode: "onChange",
  })

  const onSubmit = async (data: InitialFormInputs) => {
    const emailExists = await checkUserExists(data.email)
    onNext(!emailExists, data.email)
  }

  return (
    <>
      <div className="mb-1 text-center">
        <h2 className="text-2xl font-bold">Para empezar...</h2>
        <p className="text-gray-600">
          Introduce tu e-mail. En caso de que no exista ninguna cuenta asociada a ese mail, empezará
          el proceso para crearla.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-7 flex flex-col gap-1">
        <FormInput
          label="Email"
          placeholder="email@example.com"
          fieldName="email"
          error={errors.email?.message}
          register={register("email")}
        />
        <LoginFormButton buttonText="Continuar" />
      </form>
    </>
  )
}
