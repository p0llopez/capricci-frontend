import { atom } from "nanostores"
import { persistentAtom } from "@nanostores/persistent"
import type { CartItem } from "@/types/CartItem"

export const isCartOpen = atom(false)

export const cartItems = persistentAtom<CartItem[]>("cartItems", [], {
	encode: JSON.stringify,
	decode: JSON.parse,
}
)

type CartItemDisplayInfo = Pick<CartItem, "id" | "name" | "imageSrc" | "price">

export function addCartItem(
	{ id, name, imageSrc, price }: CartItemDisplayInfo,
	quantity: number
) {
	const existingItem = cartItems.get().find((item) => item.id === id)
	if (existingItem) {
		cartItems.set(
			cartItems.get().map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + quantity } : item
			)
		)
	} else {
		cartItems.set([...cartItems.get(), { id, name, imageSrc, quantity, price }])
	}
}
