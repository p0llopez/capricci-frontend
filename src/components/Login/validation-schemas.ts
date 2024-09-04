import { z } from "zod"

export const emailSchema = z.string().email("Debe ser un email válido")

export const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .max(20, "La contraseña debe tener como máximo 20 caracteres")
  .regex(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
  .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
  .regex(/\d/, "La contraseña debe tener al menos un número")

export const nameSchema = z
  .string()
  .regex(/^[\sA-Za-z]*$/, "El nombre solo puede contener letras")
  .max(50, "El nombre no puede tener más de 50 caracteres")

export const lastNameSchema = z
  .string()
  .regex(/^[\sA-Za-z]*$/, "Los apellidos solo pueden contener letras")
  .max(100, "Los apellidos no pueden tener más de 100 caracteres")

export const baseSchema = z.object({
  email: emailSchema,
})

export const loginSchema = baseSchema.extend({
  password: z.string().min(1, "La contraseña es obligatoria"),
})

export const registerSchema = baseSchema
  .extend({
    password: passwordSchema,
    repeatedPassword: z.string(),
    name: nameSchema,
    lastName: lastNameSchema,
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatedPassword"],
  })
