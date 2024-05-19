import { getAccessToken } from "@/stores/User"
import type { CartItem } from "@/types/CartItem"

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL as string

export const makePurchase = async (cart: CartItem[], shippingPrice: number, points: number) => {
	const body = JSON.stringify({
		order_items: cart.map((item) => ({
			product_id: item.id,
			quantity: item.quantity,
			unit_price: item.price,
		})),
		points_used: points,
		payment_status: "PAID",
		status: "ORDERED",
		shipping_price: shippingPrice,
	})
	const response = await fetch(`${API_BASE_URL}/orders`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${getAccessToken()}`,
		},
		body,
	})

	if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

	return response.json()
}
