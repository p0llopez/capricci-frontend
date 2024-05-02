import { useState } from "react"
import { addShoppingCartItem, isCartOpen } from "../../lib/ShoppingCart"
import type { ShoppingCartItem } from "@/types/ShoppingCartItem"

export default function AddToShoppingCartForm({
	children,
	item,
}: {
	children: React.ReactNode
	item: ShoppingCartItem
}) {
	const [quantity, setQuantity] = useState(1)

	function addToShoppingCart(e: React.FormEvent) {
		e.preventDefault()
		isCartOpen.set(true)
		addShoppingCartItem(item, quantity)
	}

	function handleQuantityChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setQuantity(Number(e.target.value))
	}

	return (
		<>
			<span className="text-semibold text-xl">
				Cantidad
				<select
					className="text-bold ml-3 appearance-none rounded-lg border border-transparent px-4 py-2 text-xl outline outline-bluegreen transition hover:border-bluegreen focus:border-bluegreen"
					value={quantity}
					onChange={handleQuantityChange}
				>
					<option value="1" selected>
						1
					</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</span>

			<form
				onSubmit={addToShoppingCart}
				className="rounded-lg bg-bluegreen-70 transition hover:bg-bluegreen"
			>
				{children}
			</form>
		</>
	)
}
