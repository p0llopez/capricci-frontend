import React from "react"
import { AuthProvider } from "@/contexts/authContext"
import LoginForm from "@/components/Login/LoginForm"

const LoginFormWrapper = () => {
	return (
		<AuthProvider>
			<LoginForm />
		</AuthProvider>
	)
}

export default LoginFormWrapper
