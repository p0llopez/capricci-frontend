import { useStore } from "@nanostores/react"
import { isCartOpen, shoppingCartItems } from "../../lib/ShoppingCart"

export default function ShoppingCartList() {
	const $isCartOpen = useStore(isCartOpen)
	const $shoppingCartItems = useStore(shoppingCartItems)

	return $isCartOpen ? (
		<div className="absolute w-48 rounded-lg bg-beige p-3 shadow-2xl">
			{Object.values($shoppingCartItems).length ? (
				<ul className=" flex flex-col gap-2">
					{Object.values($shoppingCartItems).map((item) => (
						<li key={item.id}>
							<a
								href="#"
								className="flex flex-row items-center gap-2 rounded-lg bg-white p-2 text-xl"
							>
								<img src={item.imageSrc} alt={item.name} className="h-5 w-5" />
								<p>{item.name}</p>
								<p>x{item.quantity}</p>
							</a>
						</li>
					))}
				</ul>
			) : (
				<p>No hay elementos en el carrito</p>
			)}
		</div>
	) : null
}
