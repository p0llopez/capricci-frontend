import { useEffect, useState } from "react"

import { getMyProfile } from "@/lib/api/profile"
import { refreshAccessToken, verifyToken } from "@/lib/api/user"
import { clearTokens, getRefreshToken, setTokens } from "@/stores/User"

interface UserProfile {
	email: string
	first_name: string
	last_name: string
	points: number
}

export default function UserInfo() {
	const [user, setUser] = useState<UserProfile>({
		email: "",
		first_name: "",
		last_name: "",
		points: 0,
	})
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const userData = await getMyProfile()
				setUser(userData)
			} catch (error) {
				const isRefreshValid = await verifyToken(getRefreshToken())
				if (!isRefreshValid) {
					clearTokens()
					window.location.href = "/"
				} else {
					try {
						const newAccessToken = await refreshAccessToken(getRefreshToken())
						if (newAccessToken) {
							setTokens(newAccessToken, getRefreshToken())
							const userData = await getMyProfile()
							setUser(userData)
						} else {
							setError("Failed to refresh access token.")
						}
					} catch (error) {
						setError("An error occurred while fetching user profile.")
						clearTokens()
						window.location.href = "/"
					}
				}
			} finally {
				setIsLoading(false)
			}
		}

		void fetchUserProfile()
	}, [])

	if (isLoading) return <div>Loading...</div>

	if (error) return <div>Error: {error}</div>

	return (
		<>
			<h1 className="text-3xl font-bold">¡Hola {user.first_name}!</h1>
			<hr className="my-2" />
			<h2 className="text-2xl font-bold">Información de tu cuenta</h2>
			<p className="text-xl">
				Tu email: {user.email} <br />
				Tu nombre: {user.first_name} {user.last_name} <br />
				Tus puntos: {user.points}
			</p>
		</>
	)
}
