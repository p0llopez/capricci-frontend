import { loginUser } from "@/contexts/auth/api/authService"
import FormInput from "@/contexts/auth/components/FormInput"
import LoginFormButton from "@/contexts/auth/components/LoginFormButton"
import { loginFormSchema } from "@/contexts/auth/schemas/loginFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { setTokens } from "@shared/stores/user.store"
import { useForm } from "react-hook-form"

interface LoginFormProps {
  email: string
  onBack: () => void
}

export default function LoginForm({ email, onBack }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: { email, password: "" },
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await loginUser(data.email, data.password)
      setTokens(response.access, response.refresh)
      window.location.href = "/"
    } catch (error) {
      console.error("Error en el inicio de sesión", error)
      setError("password", {
        type: "manual",
        message: "Contraseña incorrecta",
      })
    }
  }

  return (
    <>
      <div className="mb-1 text-center">
        <h2 className="text-2xl font-bold">Bienvenido de nuevo</h2>
        <p className="text-gray-600">Introduce tu contraseña para iniciar sesión</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
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
        <LoginFormButton buttonText="Iniciar Sesión" onBack={onBack} />
      </form>
    </>
  )
}
