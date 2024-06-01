import type { Product } from "@/types/Product"
import type { Review } from "@/types/Review"

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL as string

export const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)
  if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

  return (await response.json()) as Product
}

export const getProducts = async (query?: string): Promise<Product[]> => {
  const url = query ? `${API_BASE_URL}/products?search=${query}` : `${API_BASE_URL}/products`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

  return (await response.json()) as Product[]
}

export const getReviewsFromProduct = async (productId: string): Promise<Review[]> => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`)
  if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

  return (await response.json()) as Review[]
}
