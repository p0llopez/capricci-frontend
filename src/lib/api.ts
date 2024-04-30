import type { Product } from "../types/Product"

const API_BASE_URL = "https://capricci-backend.onrender.com/api"

export const getProduct = async (id: string): Promise<Product> => {
	const response = await fetch(`${API_BASE_URL}/products/${id}`)
	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}
	return (await response.json()) as Product
}

export const getProducts = async (): Promise<Product[]> => {
	const response = await fetch(`${API_BASE_URL}/products`)
	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}
	return (await response.json()) as Product[]
}
