import type { FormData } from "@/components/Login/types/form-data"
import { loginUser, registerUser } from "@/lib/api/user"
import { setTokens } from "@/stores/User"

export async function handleLogin(formData: FormData) {
  try {
    const response = await loginUser(formData.email, formData.password)
    setTokens(response.access, response.refresh)
    window.location.href = "/"
  } catch {
    throw new Error("Contraseña incorrecta")
  }
}

export async function handleRegister(formData: FormData) {
  try {
    await registerUser(formData.email, formData.password, formData.name, formData.lastName)
    await handleLogin(formData)
  } catch {
    throw new Error("Error al crear el usuario")
  }
}
