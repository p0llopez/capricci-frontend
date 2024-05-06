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
			<div className="absolute right-0 z-10 flex w-screen flex-col gap-4 bg-beige p-4 shadow-[0_15px_10px_0_rgba(0,0,0,0.5)] md:w-auto md:min-w-96 md:rounded-b-lg md:rounded-l-lg">
				<ul className=" scrollbar-hide flex h-[60vh] flex-col gap-4 overflow-y-auto">
					{Object.values($shoppingCartItems).map((item) => (
						<li key={item.id} className="rounded-lg border p-2 hover:border-bluegray">
							<a href="#" className=" flex h-full flex-1 flex-row items-center gap-4 text-xl">
								<img src={item.imageSrc} alt={item.name} className="h-[70px]" />
								<div className="flex w-full flex-col gap-4">
									<span className="flex items-center justify-between gap-4">
										<p className="capitalize">{item.name}</p>
										<button onClick={handleDelete(item.id)}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												stroke="#2c3e50"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="1.5"
												className=" size-6 transition hover:scale-105 hover:stroke-rouge"
												viewBox="0 0 24 24"
											>
												<path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
											</svg>
										</button>
									</span>
									<span className="flex items-center justify-between gap-4">
										<span className="flex w-24 justify-between px-2">
											<button
												onClick={handleDecreaseQuantity(item.id)}
												className="w-10 transition hover:scale-105 hover:text-rouge"
											>
												-
											</button>
											<p>{item.quantity}</p>
											<button
												onClick={handleIncreaseQuantity(item.id)}
												className="w-10 font-semibold transition hover:scale-105 hover:text-bluegreen"
											>
												+
											</button>
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
