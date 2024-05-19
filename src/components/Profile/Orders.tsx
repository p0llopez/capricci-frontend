import { useEffect, useState } from "react"

import OrderCard from "@/components/Profile/OrderCard"
import { getMyOrders } from "@/lib/api/profile"
import type { BasicOrder } from "@/types/Order"

export default function Orders() {
	const [allOrders, setAllOrders] = useState<BasicOrder[]>([])

	useEffect(() => {
		const fetchOrders = async () => {
			const fetchedOrders = await getMyOrders()
			setAllOrders(fetchedOrders)
		}

		void fetchOrders()
	}, [])

	return (
		<div className="scrollbar-hide flex max-h-96 flex-col gap-2 overflow-y-auto pr-4">
			{allOrders.length > 0 ? (
				allOrders.map((order) => (
					<OrderCard
						key={order.id}
						id={order.id}
						created_at={order.created_at}
						total_price={order.total_price}
						status={order.status}
					/>
				))
			) : (
				<p className="text-center text-gray-500">Todavia no has realizado ningun pedido?</p>
			)}
		</div>
	)
}
