export interface Review {
  id: string
  created_at: Date
  updated_at: Date
  product: {
    id: string
    name: string
    brand: string
    image: string
  }
  rating: number
  comment: string
  user: {
    id: string
    first_name: string
    last_name: string
  }
}
