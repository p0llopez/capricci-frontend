import { format } from "date-fns"

import Stars from "@/components/Stars/Stars"
import { deleteReview } from "@/lib/api/profile"
import type { Review } from "@/types/Review"

export default function ReviewCard(review: Review) {
  const handleDelete = async (id: string) => {
    await deleteReview(id)
    window.location.reload()
  }

  const handleDeleteButton = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    void handleDelete(id)
  }

  return (
    <div className="flex w-full flex-col items-center gap-4  rounded-lg border px-4 py-2 transition md:grid md:grid-cols-6">
      <img src={review.product.image} alt={review.product.name} className="hidden h-24 md:block" />
      <p className="text-left text-lg">
        {review.product.name} ({format(new Date(review.created_at), "dd/MM/yyyy")})
      </p>
      <Stars rating={review.rating} starsClass="size-8" />
      <p className="col-span-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-left text-sm">
        {review.comment}
      </p>
      <button
        onClick={handleDeleteButton(review.id)}
        className="mr-4 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#2c3e50"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          className=" size-8 transition hover:scale-105 hover:stroke-rouge"
          viewBox="0 0 24 24"
        >
          <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </button>
    </div>
  )
}
