import { useStore } from "@nanostores/react"
import { isCartOpen } from "@/stores/Cart"

export default function ShoppingCartHeaderButton() {
	const $isCartOpen = useStore(isCartOpen)
	return (
		<button
			className="flex flex-col items-center transition hover:scale-105"
			onClick={() => isCartOpen.set(!$isCartOpen)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				stroke="#232F3F"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				className="size-4 stroke-bluegray xs:size-6"
				viewBox="0 0 24 24"
			>
				<path stroke="none" d="M0 0h24v24H0z"></path>
				<path d="M4 19a2 2 0 1 0 4 0 2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"></path>
				<path d="M17 17H6V3H4"></path>
				<path d="m6 5 14 1-1 7H6"></path>
			</svg>
			<p className="hidden lg:block">Carrito</p>
		</button>
	)
}
