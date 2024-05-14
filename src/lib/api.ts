import type { Review } from "@/types/Review"
import type { Product } from "@/types/Product"
import type { CartItem } from "@/types/CartItem"

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
): Promise<{ user: { id: string; email: string }; refresh: string; access: string }> => {
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
	return (await response.json()) as { user: { id: string; email: string }; refresh: string; access: string }
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

		const data = (await response.json()) as { refresh: string; access: string }
		const newAccessToken = data.access
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

export const makePurchase = async (cart: CartItem[], userId: string) => {
	const body = JSON.stringify({
		order_items: cart.map((item) => ({
			product_id: item.id,
			quantity: item.quantity,
			unit_price: item.price,
		})),
		points_used: 0,
		payment_status: "PAID",
		status: "ORDERED",
		shipping_price: 2.99,
		user_id: userId,
	})

	const response = await fetch(`${API_BASE_URL}/orders`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
		},
		body,
	})

	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}

	return response.json()
}
