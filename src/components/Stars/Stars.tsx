import React, { useMemo } from "react"

import Star from "@/components/Stars/Star"

interface Props {
  rating: number
  starsClass: string
}

const Stars: React.FC<Props> = ({ rating, starsClass }) => {
  const stars = useMemo<string[]>(() => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating - fullStars >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return [
      ...Array.from({ length: fullStars }, () => "filled"),
      ...(hasHalfStar ? ["half"] : []),
      ...Array.from({ length: emptyStars }, () => "empty"),
    ]
  }, [rating])

  return (
    <div className="flex">
      {stars.map((type, index) => (
        <Star key={index} type={type as "filled" | "half" | "empty"} className={starsClass} />
      ))}
    </div>
  )
}

export default Stars
