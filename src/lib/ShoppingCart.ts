import { atom, map } from "nanostores"
import type { ShoppingCartItem } from "@/types/ShoppingCartItem"

export const isCartOpen = atom(false)

export const shoppingCartItems = map<Record<string, ShoppingCartItem>>({})

type ShoppingCartItemDisplayInfo = Pick<ShoppingCartItem, "id" | "name" | "imageSrc">

export function addShoppingCartItem(
	{ id, name, imageSrc }: ShoppingCartItemDisplayInfo,
	quantity: number
) {
	const existingItem = shoppingCartItems.get()[id]
	if (existingItem) {
		shoppingCartItems.setKey(id, {
			...existingItem,
			quantity: existingItem.quantity + quantity,
		})
	} else {
		shoppingCartItems.setKey(id, { id, name, imageSrc, quantity })
	}
}
