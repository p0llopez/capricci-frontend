export interface BasicOrder {
	id: string
	created_at: Date
	status: string
	total_price: number
}

export interface Order {
	id: string
	order_items: OrderItem[]
	total_price: number
	status: string
	created_at: string
	discount: number
	items_price: number
	shipping_price: number
	payment_status: string
}

export interface OrderItem {
	id: string
	product: OrderItemProduct
	created_at: string
	updated_at: string
	quantity: number
	unit_price: number
}

export interface OrderItemProduct {
	id: string
	name: string
	brand: string
	image: string
}
