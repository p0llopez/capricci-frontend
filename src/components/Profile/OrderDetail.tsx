import { Big } from "big.js"
import React, { useEffect, useState } from "react"

import GoBackButton from "@/components/Profile/BackButton"
import { createReview, getMyOrder } from "@/lib/api/profile"
import type { Order } from "@/types/Order"

interface Props {
	orderId: string
}

export default function OrderDetail({ orderId }: Props) {
	const [order, setOrder] = useState<Order | null>(null)
	const [isReviewPopUpOpen, setIsReviewPopUpOpen] = useState<boolean>(false)
	const [rating, setRating] = useState("5")
	const [selectedProductId, setSelectedProductId] = useState<string>("")

	const fetchOrder = async (orderId: string) => {
		try {
			const orderData = await getMyOrder(orderId)
			setOrder(orderData)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		void fetchOrder(orderId)
	}, [orderId])

	const toggleReviewPopUp = () => {
		setIsReviewPopUpOpen(!isReviewPopUpOpen)
	}

	const handleReviewButtonClick = (productId: string) => {
		setSelectedProductId(productId)
		toggleReviewPopUp()
	}

	const handleReviewSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		const reviewTextElement = (event.target as HTMLFormElement).elements[1] as HTMLTextAreaElement
		createReview(selectedProductId, Number.parseInt(rating), reviewTextElement.value)
			// eslint-disable-next-line no-alert
			.then(() => alert("Reseña creada correctamente"))
			.catch((error) => {
				// eslint-disable-next-line no-alert
				alert(
					"Error al crear la reseña, es posible que ya hayas realizado una reseña a ese producto"
				)
				console.error("Review creation failed:", error)
			})
		toggleReviewPopUp()
	}

	const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault()
		setRating(event.target.value)
	}

	const ReviewPopUpForm: React.FC = () => {
		return (
			<>
				{isReviewPopUpOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
						<div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
							<form onSubmit={handleReviewSubmit}>
								<div className="mb-4">
									<label className="block text-gray-700">Nota</label>
									<select
										className="text-bold ml-3 appearance-none rounded-lg border border-transparent px-4 py-2 text-xl outline outline-bluegreen transition hover:border-bluegreen focus:border-bluegreen"
										value={rating}
										onChange={handleRatingChange}
									>
										<option value="0">0</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
								</div>
								<div className="mb-4">
									<label className="block text-gray-700">Reseña</label>
									<textarea className="w-full rounded-md border px-3 py-2" required />
								</div>
								<div className="flex justify-end">
									<button
										type="button"
										onClick={toggleReviewPopUp}
										className="mr-2 rounded-md bg-gray-300 px-4 py-2 text-bluegray hover:bg-gray-400"
									>
										Cancelar
									</button>
									<button
										type="submit"
										className="rounded-md bg-bluegray p-2 font-semibold text-beige transition hover:bg-bluegray-70 focus:outline-none"
									>
										Enviar
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</>
		)
	}

	return (
		<>
			{order ? (
				<div className="flex w-full flex-col gap-4 p-10">
					<span className="flex items-center justify-between gap-4">
						<h1 className="mb-4 text-2xl font-bold">PEDIDO: {order.id}</h1>
						<GoBackButton />
					</span>
					<hr />
					{order.order_items && (
						<ul className="flex flex-col gap-4">
							{order.order_items.map((item) => (
								<li key={item.id} className="grid grid-cols-5 items-center text-left">
									<img src={item.product.image} alt={item.product.name} className="h-24" />
									<p className="text-left text-sm">
										{item.product.name} | {item.product.brand}
									</p>
									<p className="text-sm">
										{item.quantity} {item.quantity > 1 ? "unidades" : "unidad"}
									</p>
									<p className="text-sm">
										{Big(item.unit_price).mul(item.quantity).toString()} € ({item.unit_price} {""}
										€/unidad)
									</p>
									<>
										<button
											className="rounded-md bg-bluegray p-2 font-semibold text-beige transition hover:bg-bluegray-70 focus:outline-none"
											onClick={() => handleReviewButtonClick(item.product.id)}
										>
											Crear Reseña
										</button>
										<ReviewPopUpForm />
									</>
								</li>
							))}
						</ul>
					)}
					<hr />
					<p className="mb-2 text-lg">Precio de los productos: {order.items_price} €</p>
					<p className="mb-2 text-lg">Descuento: -{order.discount} €</p>
					<p className="mb-2 text-lg">Gastos de envío: {order.shipping_price} €</p>
					<hr />
					<p className="text-lg">Total: {order.total_price} €</p>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	)
}
