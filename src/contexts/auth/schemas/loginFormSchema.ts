import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
})
