import { addShoppingCartItem, isCartOpen } from "../../lib/ShoppingCart"
import type { ShoppingCartItem } from "@/types/ShoppingCartItem"

export default function AddToShoppingCartForm({
	children,
	item,
}: {
	children: React.ReactNode
	item: ShoppingCartItem
}) {
	function addToShoppingCart(e: React.FormEvent) {
		e.preventDefault()
		isCartOpen.set(true)
		addShoppingCartItem(item, item.quantity)
	}

	return (
		<form
			onSubmit={addToShoppingCart}
			className="mt-2 rounded-lg bg-bluegreen-70 transition hover:bg-bluegreen"
		>
			{children}
		</form>
	)
}
