import { atom, map } from "nanostores"
import type { CartItem } from "@/types/CartItem"

export const isCartOpen = atom(false)

export const cartItems = map<Record<string, CartItem>>({})

type CartItemDisplayInfo = Pick<CartItem, "id" | "name" | "imageSrc" | "price">

export function addCartItem(
	{ id, name, imageSrc, price }: CartItemDisplayInfo,
	quantity: number
) {
	const existingItem = cartItems.get()[id]
	if (existingItem) {
		cartItems.setKey(id, {
			...existingItem,
			quantity: existingItem.quantity + quantity,
		})
	} else {
		cartItems.setKey(id, { id, name, imageSrc, quantity, price })
	}
}
