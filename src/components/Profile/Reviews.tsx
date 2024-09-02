import { useEffect, useState } from "preact/hooks"

import ReviewCard from "@/components/Profile/ReviewCard"
import { getMyReviews } from "@/lib/api/profile"
import type { Review } from "@/types/Review"

export default function Orders() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getMyReviews()
      setReviews(fetchedReviews)
    }

    void fetchReviews()
  }, [])

  return (
    <div className="scrollbar-hide flex max-h-96 flex-col gap-2 overflow-y-auto">
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review.id} {...review} />)
      ) : (
        <p className="text-center text-gray-500">
          vaya parece que no has hecho ninguna reseña, a que esperas?
        </p>
      )}
    </div>
  )
}
