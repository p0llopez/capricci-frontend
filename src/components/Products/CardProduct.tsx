import React from "react"
import Stars from "../Stars/Stars"
import AddToCart from "@/components/Cart/AddToCartForm"
import CartButton from "@/components/Cart/CartButton"
import type { CartItem } from "@/types/CartItem"

interface Props {
	id: string
	brand: string
	image: string
	name: string
	presentation: number
	presentation_format: string
	price: number
	rating: number
}

const CardProduct: React.FC<Props> = ({
	id,
	brand,
	image,
	name,
	presentation,
	presentation_format,
	price,
	rating,
}) => {
	const item: CartItem = { id, name, imageSrc: image, quantity: 1, price }

	return (
		<div className="flex flex-col rounded-lg p-2 transition hover:shadow-lg">
			<a href={`product/${id}`} className="flex-1">
				<img src={image} alt={name} className="mb-2 rounded" />
				<div className="pl-3">
					<p className="text-xs font-semibold uppercase text-bluegreen">{brand}</p>
					<h2 className="text-lg font-semibold capitalize">{name}</h2>
					<p>
						{presentation} {presentation_format}
					</p>
					<Stars rating={rating} starsClass="size-3" />
					<p className="text-xl font-bold capitalize">{price} €</p>
				</div>
			</a>
			<AddToCart item={item} withQuantity={false}>
				<CartButton />
			</AddToCart>
		</div>
	)
}

export default CardProduct
