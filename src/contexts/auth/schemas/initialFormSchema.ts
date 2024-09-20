import { z } from "zod"

export const initialFormSchema = z.object({
  email: z.string().email("Debe ser un email válido"),
})
