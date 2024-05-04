// import { useEffect, useRef } from "react"
import { useStore } from "@nanostores/react"
import { isCartOpen, totalCartItems } from "@/stores/Cart"

export default function CartWidget() {
	const $isCartOpen = useStore(isCartOpen)

	const $totalCartItems: number = useStore(totalCartItems)

	// const cartRef = useRef<HTMLButtonElement>(null)

	// useEffect(() => {
	// 	function handleClickOutside(event: MouseEvent) {
	// 		if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
	// 			isCartOpen.set(false)
	// 		}
	// 	}

	// 	document.addEventListener("mousedown", handleClickOutside)
	// 	return () => {
	// 		document.removeEventListener("mousedown", handleClickOutside)
	// 	}
	// }, [])

	return (
		<button
			// ref={cartRef}
			className={`relative flex flex-col items-center rounded-t-lg p-1 ${$isCartOpen && $totalCartItems > 0 ? "bg-beige" : "hover:scale-105"}`}
			onClick={() => isCartOpen.set(!$isCartOpen)}
		>
			<span className=" flex">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					stroke="#232F3F"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					className={`size-4 xs:size-6 ${$isCartOpen && $totalCartItems > 0 ? "stroke-bluegray" : "stroke-beige"}`}
					viewBox="0 0 24 24"
				>
					<path stroke="none" d="M0 0h24v24H0z"></path>
					<path d="M4 19a2 2 0 1 0 4 0 2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"></path>
					<path d="M17 17H6V3H4"></path>
					<path d="m6 5 14 1-1 7H6"></path>
				</svg>
				{$totalCartItems > 0 && (
					<div className="absolute right-1 size-4 rounded-full border border-bluegreen-70 bg-bluegreen-70 text-xs font-bold text-beige">
						{$totalCartItems}
					</div>
				)}
			</span>
			<p
				className={`hidden lg:block ${$isCartOpen && $totalCartItems > 0 ? "text-bluegray" : "text-beige"}`}
			>
				Carrito
			</p>
		</button>
	)
}