import { useStore } from "@nanostores/react"
import { cartItems, isCartOpen } from "@/stores/Cart"

export default function CartList() {
	const $isCartOpen = useStore(isCartOpen)
	const $shoppingCartItems = useStore(cartItems)

	return $isCartOpen ? (
		<div className="absolute w-48 rounded-lg bg-beige p-3 shadow-2xl">
			{Object.values($shoppingCartItems).length ? (
				<ul className=" flex flex-col gap-4">
					{Object.values($shoppingCartItems).map((item) => (
						<li key={item.id}>
							<a
								href="#"
								className="flex flex-row items-center gap-4 rounded-lg bg-white p-2 text-xl"
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
