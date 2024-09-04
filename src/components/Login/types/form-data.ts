import { registerSchema } from "@/components/Login/validation-schemas"
import { z } from "zod"

export type FormData = z.infer<typeof registerSchema>
