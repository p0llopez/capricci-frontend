import { useStore } from "@nanostores/react"
import Big from "big.js"
import {
	cartItems,
	clearCart,
	decreaseItemQuantity,
	getTotalAmount,
	increaseItemQuantity,
	isCartOpen,
	removeCartItem,
} from "@/stores/Cart"

export default function CartList() {
	const $isCartOpen = useStore(isCartOpen)
	const $shoppingCartItems = useStore(cartItems)
	const totalAmount = getTotalAmount()

	const handleDelete = (id: string) => (e: React.MouseEvent) => {
		e.preventDefault()
		removeCartItem(id)
	}

	const handleBuy = () => (e: React.MouseEvent) => {
		e.preventDefault()
		// eslint-disable-next-line no-alert
		alert("Compra realizada!")
		clearCart()
	}

	const handleIncreaseQuantity = (id: string) => (e: React.MouseEvent) => {
		e.preventDefault()
		increaseItemQuantity(id)
	}

	const handleDecreaseQuantity = (id: string) => (e: React.MouseEvent) => {
		e.preventDefault()
		decreaseItemQuantity(id)
	}

	return (
		$isCartOpen &&
		Object.values($shoppingCartItems).length > 0 && (
			<div className="absolute right-0 flex min-w-96 flex-col gap-4 rounded-b-lg rounded-l-lg bg-beige p-2 shadow-2xl">
				<ul className=" scrollbar-hide flex h-[60vh] flex-col gap-4 overflow-auto">
					{Object.values($shoppingCartItems).map((item) => (
						<li key={item.id}>
							<a
								href="#"
								className="flex min-w-10 flex-row items-center gap-4 rounded-lg border border-bluegray p-2 text-xl"
							>
								<img src={item.imageSrc} alt={item.name} className="h-[70px]" />
								<div className="flex w-full flex-col gap-4">
									<span className="flex items-center justify-between gap-4">
										<p className="capitalize">{item.name}</p>
										<button onClick={handleDelete(item.id)}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												stroke="#2c3e50"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1.5"
												className=" hover:stroke-rouge size-6 transition hover:scale-105"
												viewBox="0 0 24 24"
											>
												<path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
											</svg>
										</button>
									</span>
									<span className="flex items-center justify-between gap-4">
										<span className="flex w-24 justify-between px-2">
											<button onClick={handleDecreaseQuantity(item.id)}>-</button>
											<p>{item.quantity}</p>
											<button onClick={handleIncreaseQuantity(item.id)}>+</button>
										</span>
										<p>{Big(item.price).mul(item.quantity).toString()} €</p>
									</span>
								</div>
							</a>
						</li>
					))}
				</ul>

				<hr />

				<span className="flex justify-between text-xl">
					<p>Total (impuestos incluidos):</p>
					<p>{totalAmount} €</p>
				</span>

				<button className="rounded-lg bg-bluegreen-70 p-2 hover:bg-bluegreen" onClick={handleBuy()}>
					<p className="text-beige">Comprar</p>
				</button>
			</div>
		)
	)
}
