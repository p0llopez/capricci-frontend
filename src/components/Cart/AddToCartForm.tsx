import React, { type ChangeEvent, type FormEvent, useState } from "react"

import { addCartItem, isCartOpen } from "@/shared/stores/Cart"
import type { CartItem } from "@/types/CartItem"

interface Props {
  children: React.ReactNode
  item: CartItem
  withQuantity: boolean
}

export default function AddToCartForm({ children, item, withQuantity }: Props) {
  const [quantity, setQuantity] = useState(1)

  function addToShoppingCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    isCartOpen.set(true)
    addCartItem(item, quantity)
  }

  function handleQuantityChange(e: ChangeEvent<HTMLSelectElement>) {
    setQuantity(Number(e.currentTarget.value))
  }

  return (
    <>
      {withQuantity && (
        <span className="text-semibold text-xl">
          Cantidad
          <select
            className="text-bold ml-3 appearance-none rounded-lg border border-transparent px-4 py-2 text-xl outline outline-bluegreen transition hover:border-bluegreen focus:border-bluegreen"
            value={quantity}
            onChange={handleQuantityChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </span>
      )}

      <form
        onSubmit={addToShoppingCart}
        className="rounded-lg bg-bluegreen-70 transition hover:bg-bluegreen"
      >
        {children}
      </form>
    </>
  )
}
