import React, { useState } from "react"
import type { Review } from "@/types/Review"

export default function ReviewComponent({
	review,
	children,
}: {
	review: Review
	children: React.ReactNode
}) {
	const [isExpanded, setIsExpanded] = useState(false)
	const maxCommentLength = 200
	const isCommentTruncated = review.comment.length > maxCommentLength
	const truncatedComment = isCommentTruncated
		? `${review.comment.slice(0, maxCommentLength)}...`
		: review.comment

	const toggleExpand = () => setIsExpanded(!isExpanded)

	return (
		<div className="rounded-md bg-white p-4 shadow-md">
			<div className="mb-2 flex items-center justify-between">
				<h3 className="text-lg font-semibold">{review.customer ? review.customer : "Anonymous"}</h3>
				{children}
			</div>
			<p className="over text-bluegray">
				{isExpanded ? review.comment : truncatedComment}
				{isCommentTruncated && (
					<button
						className="text-bluegreen-70 hover:text-bluegreen focus:outline-none"
						onClick={toggleExpand}
					>
						{isExpanded ? " Mostrar menos" : " Ver más"}
					</button>
				)}
			</p>
		</div>
	)
}
