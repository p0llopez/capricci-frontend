import { handleLogin, handleRegister } from "@/components/Login/auth.service"
import FormInput from "@/components/Login/form-input"
import LoginFormButton from "@/components/Login/LoginFormButton"
import type { FormData } from "@/components/Login/types/form-data"
import { baseSchema, loginSchema, registerSchema } from "@/components/Login/validation-schemas"
import { checkUserExists } from "@/lib/api/user"
import { useState } from "preact/hooks"
import { z } from "zod"

export default function LoginForm() {
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null)
  const [mainTitle, setMainTitle] = useState<string>("Para empezar...")
  const [mainMessage, setMainMessage] = useState<string>(
    "Introduce tu e-mail. En caso de que no exista ninguna cuenta asociada a ese mail, empezará el proceso para crearla."
  )
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    repeatedPassword: "",
    name: "",
    lastName: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const handleInputChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    try {
      const schema = isNewUser === null ? baseSchema : isNewUser ? registerSchema : loginSchema
      schema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {}
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof FormData
          newErrors[path] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const onSubmit = async (e: Event) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const emailExists = await checkUserExists(formData.email)

      if (isNewUser === null) {
        if (emailExists) {
          setIsNewUser(false)
          setMainTitle("Bienvenido de nuevo")
          setMainMessage("Introduce tu contraseña para iniciar sesión")
        } else {
          setIsNewUser(true)
          setMainTitle("¡Hola!")
          setMainMessage("Introduce todos los datos para crear tu cuenta")
        }
      } else if (isNewUser) {
        if (emailExists) {
          setErrors((prev) => ({ ...prev, email: "El email ya está en uso" }))
        } else {
          await handleRegister(formData)
        }
      } else {
        if (!emailExists) {
          setErrors((prev) => ({
            ...prev,
            email: "No existe ninguna cuenta con este email, vuelve a intentarlo",
          }))
        } else {
          await handleLogin(formData)
        }
      }
    } catch {
      setErrors((prev) => ({ ...prev, email: "Error al comprobar el email" }))
    }
  }

  return (
    <div className="absolute bottom-0 h-[85vh] w-[calc(100vw-1rem)] rounded-t-lg bg-beige px-4 py-8 shadow-[0_-5px_15px_0_rgba(0,0,0,0.05)] md:h-[calc(100vh-10rem)] md:w-3/4 md:px-8 xl:w-2/5">
      <div className="mb-1 text-center">
        <h2 className="text-2xl font-bold">{mainTitle}</h2>
        <p className=" text-gray-600">{mainMessage}</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-7 flex flex-col gap-1">
          <FormInput
            label="Email"
            placeholder="email@example.com"
            fieldName="email"
            value={formData.email}
            error={errors.email}
            onChange={handleInputChange}
          />

          {isNewUser !== null && (
            <FormInput
              label="Contraseña"
              placeholder="Contraseña"
              fieldName="password"
              value={formData.password}
              error={errors.password}
              onChange={handleInputChange}
              tip="La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número"
              type="password"
            />
          )}

          {isNewUser === true && (
            <>
              <FormInput
                label="Repite tu contraseña"
                placeholder="Contraseña"
                fieldName="repeatedPassword"
                value={formData.repeatedPassword}
                error={errors.repeatedPassword}
                onChange={handleInputChange}
                type="password"
              />
              <FormInput
                label="Nombre"
                placeholder="Nombre"
                fieldName="name"
                value={formData.name}
                error={errors.name}
                onChange={handleInputChange}
              />
              <FormInput
                label="Apellidos"
                placeholder="Apellidos"
                fieldName="lastName"
                value={formData.lastName}
                error={errors.lastName}
                onChange={handleInputChange}
              />
            </>
          )}
        </div>

        {isNewUser === null && <LoginFormButton buttonText="Continuar" />}
        {isNewUser === false && <LoginFormButton buttonText="Iniciar Sesión" />}
        {isNewUser === true && <LoginFormButton buttonText="Registrarse" />}
      </form>
    </div>
  )
}
