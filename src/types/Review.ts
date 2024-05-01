export interface Review {
	id: string
	created_at: Date
	updated_at: Date
	product: string
	rating: number
	comment: string
	customer: string
}
