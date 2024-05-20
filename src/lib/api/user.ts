const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL as string

export const checkUserExists = async (email: string): Promise<boolean> => {
	const encodedEmail = encodeURIComponent(email)
	const response = await fetch(`${API_BASE_URL}/users/exists/${encodedEmail}`)
	if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

	return (await response.json()) as boolean
}

export const loginUser = async (
	username: string,
	password: string
): Promise<{ user: { id: string; email: string }; refresh: string; access: string }> => {
	const response = await fetch(`${API_BASE_URL}/token/pair`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	})
	if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

	return (await response.json()) as {
		user: { id: string; email: string }
		refresh: string
		access: string
	}
}

export const registerUser = async (
	email: string,
	password: string,
	first_name: string,
	last_name: string
): Promise<void> => {
	const response = await fetch(`${API_BASE_URL}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password, first_name, last_name }),
	})
	if (!response.ok) throw new Error(`API request failed with status ${response.status}`)
}

export const refreshAccessToken = async (refreshToken: string | null) => {
	try {
		if (!refreshToken) throw new Error("No refresh token found")

		const response = await fetch(`${API_BASE_URL}/token/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh: refreshToken }),
		})

		if (!response.ok) throw new Error("Failed to refresh access token")

		const data = (await response.json()) as { refresh: string; access: string }
		return data.access
	} catch (error) {
		console.error("Error refreshing access token:", error)
		return null
	}
}

export const verifyToken = async (token: string | null): Promise<boolean> => {
	if (!token) return false

	const response = await fetch(`${API_BASE_URL}/token/verify`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ token }),
	})
	if (!response.ok) return false

	return true
}
