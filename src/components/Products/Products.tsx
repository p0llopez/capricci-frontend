import { useStore } from "@nanostores/react"

import CardProduct from "@/components/Products/CardProduct"
import { products } from "@/stores/Products"

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
					rating={product.rating}
				/>
			))}
		</div>
	)
}

export default Products
