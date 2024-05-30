import { persistentAtom } from "@nanostores/persistent"
import { Big } from "big.js"
import { atom } from "nanostores"

import type { CartItem } from "@/types/CartItem"

export const isCartOpen = atom(false)

export const totalCartItems = persistentAtom<number>("totalCartItems", 0, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const cartItems = persistentAtom<CartItem[]>("cartItems", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
})

type CartItemDisplayInfo = Pick<CartItem, "id" | "name" | "imageSrc" | "price">

export function addCartItem({ id, name, imageSrc, price }: CartItemDisplayInfo, quantity: number) {
  const existingItem = cartItems.get().find((item) => item.id === id)
  const updatedCartItems = existingItem
    ? cartItems
        .get()
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + quantity } : item))
    : [...cartItems.get(), { id, name, imageSrc, quantity, price }]

  const newTotalCartItems = updatedCartItems.reduce((total, item) => total + item.quantity, 0)

  cartItems.set(updatedCartItems)
  totalCartItems.set(newTotalCartItems)
}

export function increaseItemQuantity(id: string) {
  cartItems.set(
    cartItems
      .get()
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
  )
  totalCartItems.set(totalCartItems.get() + 1)
}

export function removeCartItem(id: string) {
  const itemToRemove = cartItems.get().find((item) => item.id === id)

  if (itemToRemove) {
    const updatedCartItems = cartItems.get().filter((item) => item.id !== id)
    const newTotalCartItems = totalCartItems.get() - itemToRemove.quantity

    cartItems.set(updatedCartItems)
    totalCartItems.set(newTotalCartItems)
  }
}

export function decreaseItemQuantity(id: string) {
  const existingItem = cartItems.get().find((item) => item.id === id)

  if (existingItem && existingItem.quantity > 1) {
    cartItems.set(
      cartItems
        .get()
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    )
    totalCartItems.set(totalCartItems.get() - 1)
  } else if (existingItem && existingItem.quantity === 1) {
    removeCartItem(id)
  }
}

export function clearCart() {
  cartItems.set([])
  totalCartItems.set(0)
}

export function getTotalAmount() {
  return cartItems
    .get()
    .reduce((acc, item) => {
      const itemTotal = Big(item.price).mul(item.quantity)
      return acc.plus(itemTotal)
    }, Big(0))
    .toString()
}
