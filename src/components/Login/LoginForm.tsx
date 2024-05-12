/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import LoginFormButton from "./LoginFormButton"
import { checkUserExists, loginUser, registerUser } from "@/lib/Api"

interface FormData {
	email: string
	password?: string
	repeatedPassword?: string
	name?: string
	lastName?: string
}

export default function LoginForm() {
	const [isNewUser, setIsNewUser] = useState<boolean | null>(null)
	const [mainTitle, setMainTitle] = useState<string>("Para empezar...")
	const [mainMessage, setMainMessage] = useState<string>(
		"Introduce tu e-mail. En caso de que no exista ninguna cuenta asociada a ese mail, empezará el proceso para crearla."
	)
	const validationSchema = yup.object().shape({
		email: yup.string().email("Debe ser un email válido").required("El email es obligatorio"),
		password:
			isNewUser === true
				? yup
						.string()
						.min(8, "La contraseña debe tener al menos 8 caracteres")
						.max(20, "La contraseña debe tener como máximo 20 caracteres")
						.matches(/^(?=.*[a-z]).+$/, "La contraseña debe tener al menos una letra minúscula")
						.matches(/^(?=.*[A-Z]).+$/, "La contraseña debe tener al menos una letra mayúscula")
						.matches(/^(?=.*\d).+$/, "La contraseña debe tener al menos un número")
						.required("La contraseña es obligatoria")
				: isNewUser === false
					? yup.string().required("La contraseña es obligatoria")
					: yup.string(),
		repeatedPassword:
			isNewUser === true
				? yup
						.string()
						.oneOf([yup.ref("password"), undefined], "Las contraseñas no coinciden")
						.required("Debes repetir la contraseña")
				: yup.string(),
		name:
			isNewUser === true
				? yup
						.string()
						.matches(/^[a-zA-Z\s]*$/, "El nombre solo puede contener letras")
						.max(50, "El nombre no puede tener más de 50 caracteres")
						.required("El nombre es obligatorio")
				: yup.string(),
		lastName:
			isNewUser === true
				? yup
						.string()
						.matches(/^[a-zA-Z\s]*$/, "Los apellidos solo pueden contener letras")
						.max(100, "Los apellidos no pueden tener más de 100 caracteres")
						.required("Los apellidos son obligatorios")
				: yup.string(),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<FormData>({
		resolver: yupResolver<FormData>(validationSchema),
		defaultValues: {
			email: "",
			password: "",
			repeatedPassword: "",
			name: "",
			lastName: "",
		},
	})

	async function handleLogin(data: FormData) {
		try {
			while (true) {
				const emailExists = await checkUserExists(data.email)
				if (emailExists) {
					break
				}
				await new Promise((resolve) => setTimeout(resolve, 1000))
			}

			const response = await loginUser(data.email, data.password!)
			localStorage.setItem("accessToken", response.access)
			localStorage.setItem("refreshToken", response.refresh)
			window.location.href = "/"
		} catch (error) {
			console.error("Error logging in user:", error)
		}
	}

	const onSubmit = (data: FormData) => {
		if (isNewUser === null) {
			checkUserExists(data.email)
				.then((emailExists) => {
					if (emailExists) {
						setIsNewUser(false)
						setMainTitle("Bienvenido de nuevo")
						setMainMessage("Introduce tu contraseña para iniciar sesión")
						clearErrors()
					} else {
						setIsNewUser(true)
						setMainTitle("¡Hola!")
						setMainMessage("Introduce todos los datos para crear tu cuenta")
						clearErrors()
					}
				})
				.catch((error) => {
					console.error("Error checking user:", error)
					setError("email", { type: "manual", message: "Error al comprobar el email" })
				})
		} else if (isNewUser === true) {
			checkUserExists(data.email)
				.then((emailExists) => {
					if (emailExists) {
						setError("email", { type: "manual", message: "El email ya está en uso" })
					} else {
						registerUser(data.email, data.password!, data.name!, data.lastName!)
							.then(() => {
								handleLogin(data).catch((error) => {
									console.error("Error logging in user:", error)
								})
							})
							.catch((error) => {
								console.error("Error creating user:", error)
								setError("email", { type: "manual", message: "Error al crear el usuario" })
							})
					}
				})
				.catch((error) => {
					console.error("Error checking user:", error)
					setError("email", { type: "manual", message: "Error al comprobar el email" })
				})
		} else {
			handleLogin(data).catch((error) => {
				console.error("Error logging in user:", error)
				setError("password", { type: "manual", message: "Contraseña incorrecta" })
			})
		}
	}

	const renderInput = (
		label: string,
		placeholder: string,
		fieldName: keyof FormData,
		tip?: string
	) => {
		return (
			<>
				<div className="flex justify-between">
					<label className="font-semibold text-bluegray">{label}</label>
					{errors[fieldName]?.message && <p className="text-rouge">{errors[fieldName]?.message}</p>}
				</div>
				<input
					{...register(fieldName)}
					aria-invalid={errors[fieldName] ? "true" : "false"}
					className={`w-full rounded-md border bg-beige px-4 py-2 ${errors[fieldName] ? "border border-rouge" : ""}`}
					placeholder={placeholder}
					type={fieldName === "password" || fieldName === "repeatedPassword" ? "password" : "text"}
				/>
				{tip && <p className="text-sm text-gray-400">{tip}</p>}
			</>
		)
	}

	return (
		<div className="absolute bottom-0 h-[calc(100vh-6rem)] w-[calc(100vw-1rem)] rounded-t-lg bg-beige px-4 py-8 shadow-[0_-5px_15px_0_rgba(0,0,0,0.05)] md:h-[calc(100vh-10rem)] md:w-3/4 md:px-8 xl:w-2/5">
			<div className="mb-1 text-center">
				<h2 className="text-2xl font-bold">{mainTitle}</h2>
				<p className=" text-gray-600">{mainMessage}</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-7 flex flex-col gap-1">
					{renderInput("Email", "email@example.com", "email", undefined)}

					{isNewUser !== null &&
						renderInput(
							"Contraseña",
							"Contraseña",
							"password",
							"La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número"
						)}

					{isNewUser === true && (
						<>
							{renderInput("Repite tu contraseña", "Contraseña", "repeatedPassword", undefined)}
							{renderInput("Nombre", "Nombre", "name", undefined)}
							{renderInput("Apellidos", "Apellidos", "lastName", undefined)}
						</>
					)}
				</div>

				{isNewUser === null && LoginFormButton("Continuar")}
				{isNewUser === false && LoginFormButton("Iniciar Sesión")}
				{isNewUser === true && LoginFormButton("Crear Usuario")}
			</form>
		</div>
	)
}
