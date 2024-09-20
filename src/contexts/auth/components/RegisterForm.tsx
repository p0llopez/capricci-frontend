import { loginUser, registerUser } from "@/contexts/auth/api/authService"
import FormInput from "@/contexts/auth/components/FormInput"
import LoginFormButton from "@/contexts/auth/components/LoginFormButton"
import { registerFormSchema } from "@/contexts/auth/schemas/registerFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { setTokens } from "@shared/stores/user.store"
import { useForm } from "react-hook-form"

interface RegisterFormProps {
  email: string
  onBack: () => void
}

export default function RegisterForm({ email, onBack }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      email,
      password: "",
      repeatedPassword: "",
      name: "",
      lastName: "",
    },
  })

  const onSubmit = async (data: {
    email: string
    password: string
    repeatedPassword: string
    name: string
    lastName: string
  }) => {
    try {
      await registerUser(data.email, data.password, data.name, data.lastName)
      const response = await loginUser(data.email, data.password)
      setTokens(response.access, response.refresh)
      window.location.href = "/"
    } catch (error) {
      console.error("Error en el registro", error)
    }
  }

  return (
    <>
      <div className="mb-1 text-center">
        <h2 className="text-2xl font-bold">¡Hola!</h2>
        <p className="text-gray-600">Introduce todos los datos para crear tu cuenta</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-7 flex flex-col gap-1">
        <FormInput
          label="Email"
          placeholder="email@example.com"
          fieldName="email"
          value={email}
          disabled={true}
        />
        <FormInput
          label="Contraseña"
          placeholder="Contraseña"
          fieldName="password"
          error={errors.password?.message}
          register={register("password")}
          type="password"
        />
        <FormInput
          label="Repite tu contraseña"
          placeholder="Contraseña"
          fieldName="repeatedPassword"
          error={errors.repeatedPassword?.message}
          register={register("repeatedPassword")}
          type="password"
        />
        <FormInput
          label="Nombre"
          placeholder="Nombre"
          fieldName="name"
          error={errors.name?.message}
          register={register("name")}
        />
        <FormInput
          label="Apellidos"
          placeholder="Apellidos"
          fieldName="lastName"
          error={errors.lastName?.message}
          register={register("lastName")}
        />
        <LoginFormButton buttonText="Registrarse" onBack={onBack} />
      </form>
    </>
  )
}
