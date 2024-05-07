import { useStore } from "@nanostores/react"
import CardProduct from "./CardProduct"
import { products } from "@/stores/Products"

// interface Product {
// 	id: string
// 	brand: string
// 	image: string
// 	name: string
// 	presentation: number
// 	presentation_format: string
// 	price: number
// 	stock: number
// 	rating: number
// }

const Products: React.FC = () => {
	const $products = useStore(products)

	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
			{$products.map((product) => (
				<CardProduct
					key={product.id}
					id={product.id}
					brand={product.brand}
					image={product.image}
					name={product.name}
					presentation={product.presentation}
					presentation_format={product.presentation_format}
					price={product.price}
					stock={product.stock}
					rating={product.rating}
				/>
			))}
		</div>
	)
}

export default Products
