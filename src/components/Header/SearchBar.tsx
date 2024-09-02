import { getProducts } from "@/lib/api/product"
import { products } from "@/stores/Products"
import type { ChangeEvent } from "preact/compat"
import { useCallback, useEffect, useState } from "preact/hooks"

interface Props {
  className?: string
}

export default function SearchInput({ className }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

  const fetchProducts = async (search: string) => {
    const fetchedProducts = await getProducts(search)
    products.set(fetchedProducts)
  }

  useEffect(() => {
    void fetchProducts("")
  }, [])

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const search = e.currentTarget.value
      setSearchTerm(search)
      void fetchProducts(search)
    },
    [products]
  )

  return (
    <div className={className}>
      <input
        value={searchTerm}
        onChange={handleOnChange}
        type="search"
        placeholder="¿Qué estás buscando?"
        className="h-full w-full rounded-lg bg-beige pl-3 hover:cursor-pointer focus:outline-none"
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="size-6 stroke-bluegray"
          viewBox="0 0 24 24"
        >
          <path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0m18 11-6-6"></path>
        </svg>
      </span>
    </div>
  )
}
