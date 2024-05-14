import React, { createContext, useContext, useEffect, useState } from "react"
import { refreshAccessToken } from "@/lib/Api"

interface AuthContextType {
	accessToken: string | null
	isAuthenticated: boolean
	login: (accessToken: string, refreshToken: string) => void
	logout: () => void
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to access the authentication context
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}

// AuthProvider component to wrap the application and manage authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [accessToken, setAccessToken] = useState<string | null>(
		typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
	)
	const isAuthenticated = !!accessToken

	const login = (accessToken: string, refreshToken: string) => {
		setAccessToken(accessToken)
		localStorage.setItem("accessToken", accessToken)
		localStorage.setItem("refreshToken", refreshToken)
	}

	const logout = () => {
		setAccessToken(null)
		localStorage.removeItem("accessToken")
		localStorage.removeItem("refreshToken")
	}

	useEffect(() => {
		const refreshTokenInterval = setInterval(
			() => {
				const refreshToken = localStorage.getItem("refreshToken")
				if (refreshToken) {
					refreshAccessToken(refreshToken)
						.then((newAccessToken) => {
							if (newAccessToken) {
								setAccessToken(newAccessToken)
								localStorage.setItem("accessToken", newAccessToken)
							}
						})
						.catch((error) => {
							console.error("Failed to refresh access token:", error)
						})
				}
			},
			4 * 60 * 1000
		) // Refresh every 4 minutes

		// Clear interval on component unmount
		return () => clearInterval(refreshTokenInterval)
	}, [])

	const authContextValue: AuthContextType = {
		accessToken,
		isAuthenticated,
		login,
		logout,
	}

	return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
