import React from "react"

interface Props {
  className?: string
}

const CartButton: React.FC<Props> = ({ className }) => {
  return (
    <button
      className={`flex w-full flex-row items-center justify-center p-2 text-beige ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#232F3F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="mr-3 size-5 stroke-beige"
        viewBox="0 0 24 24"
      >
        <path stroke="none" d="M0 0h24v24H0z"></path>
        <path d="M4 19a2 2 0 1 0 4 0 2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"></path>
        <path d="M17 17H6V3H4"></path>
        <path d="m6 5 14 1-1 7H6"></path>
      </svg>
      <span className="mt-1">Añadir</span>
    </button>
  )
}

export default CartButton
