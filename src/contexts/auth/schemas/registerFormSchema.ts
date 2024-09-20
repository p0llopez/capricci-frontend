import { z } from "zod"

export const registerFormSchema = z
  .object({
    email: z.string().email("Debe ser un email válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(20, "La contraseña debe tener como máximo 20 caracteres")
      .regex(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
      .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
      .regex(/\d/, "La contraseña debe tener al menos un número"),
    repeatedPassword: z.string(),
    name: z
      .string()
      .regex(/^[\sA-Za-z]*$/, "El nombre solo puede contener letras")
      .max(50, "El nombre no puede tener más de 50 caracteres"),
    lastName: z
      .string()
      .regex(/^[\sA-Za-z]*$/, "Los apellidos solo pueden contener letras")
      .max(100, "Los apellidos no pueden tener más de 100 caracteres"),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatedPassword"],
  })
