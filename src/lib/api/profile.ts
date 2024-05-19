import { getAccessToken } from "@/stores/User"
import type { BasicOrder, Order } from "@/types/Order"
import type { Review } from "@/types/Review"

const API_BASE_URL = "http://127.0.0.1:8000/api"

export const getMyOrders = async () => {
	const response = await fetch(`${API_BASE_URL}/users/me/orders`, {
		headers: {
			"Authorization": `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
	})

	if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

	return (await response.json()) as BasicOrder[]
}

export const getMyOrder = async (orderId: string) => {
	const response = await fetch(`${API_BASE_URL}/users/me/orders/${orderId}`, {
		headers: {
			"Authorization": `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
	})

	if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

	return (await response.json()) as Order
}

export const createReview = async (product_id: string, rating: number, comment: string) => {
	const response = await fetch(`${API_BASE_URL}/reviews`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			product_id,
			rating,
			comment,
		}),
	})

	if (!response.ok) throw new Error(`API request failed with status ${response.status}`)
}

export const getMyReviews = async () => {
	const response = await fetch(`${API_BASE_URL}/users/me/reviews`, {
		headers: {
			"Authorization": `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
	})

	if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

	return (await response.json()) as Review[]
}

export const deleteReview = async (reviewId: string): Promise<void> => {
	const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
	})

	if (!response.ok) throw new Error(`API request failed with status ${response.status}`)
}

export const getMyProfile = async () => {
	const response = await fetch(`${API_BASE_URL}/users/me`, {
		headers: {
			"Authorization": `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
		},
	})

	if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

	return (await response.json()) as {
		id: string
		email: string
		first_name: string
		last_name: string
		points: number
	}
}
