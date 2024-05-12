import type { Review } from "@/types/Review"
import type { Product } from "@/types/Product"

const API_BASE_URL = "http://127.0.0.1:8000/api"

export const getProduct = async (id: string): Promise<Product> => {
	const response = await fetch(`${API_BASE_URL}/products/${id}`)
	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}
	return (await response.json()) as Product
}

export const getProducts = async (query?: string): Promise<Product[]> => {
	const url = query ? `${API_BASE_URL}/products?search=${query}` : `${API_BASE_URL}/products`
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}
	return (await response.json()) as Product[]
}

export const getReviewsFromProduct = async (productId: string): Promise<Review[]> => {
	const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`)
	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}
	return (await response.json()) as Review[]
}

export const checkUserExists = async (email: string): Promise<boolean> => {
	const encodedEmail = encodeURIComponent(email)
	const response = await fetch(`${API_BASE_URL}/users/exists/${encodedEmail}`)
	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}
	return (await response.json()) as boolean
}

export const loginUser = async (
	username: string,
	password: string
): Promise<{ username: string; refresh: string; access: string }> => {
	const response = await fetch(`${API_BASE_URL}/token/pair`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	})
	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}
	return (await response.json()) as { username: string; refresh: string; access: string }
}

export const refreshAccessToken = async () => {
	try {
		const refreshToken = localStorage.getItem("refreshToken")

		if (!refreshToken) {
			throw new Error("No refresh token found")
		}

		const response = await fetch(`${API_BASE_URL}/token/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh: refreshToken }),
		})

		if (!response.ok) {
			throw new Error("Failed to refresh access token")
		}

		const data = (await response.json()) as { refresh_token: string; access_token: string }
		const newAccessToken = data.access_token

		localStorage.setItem("accessToken", newAccessToken)

		return newAccessToken
	} catch (error) {
		console.error("Error refreshing access token:", error)
		// Handle error, e.g., log out the user, redirect to login page, etc.
		return null
	}
}

export const verifyRefreshToken = async (refreshToken: string | null): Promise<boolean> => {
	if (!refreshToken) {
		return false
	}

	const response = await fetch(`${API_BASE_URL}/token/verify`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ token: refreshToken }),
	})

	if (!response.ok) {
		return false
	}

	return true
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
	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}
}
