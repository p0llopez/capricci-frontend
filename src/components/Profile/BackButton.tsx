import React from "react"

const GoBackButton: React.FC = () => {
	const goBack = () => {
		window.history.back() // Go back to the previous page in history
	}

	return (
		<button
			onClick={goBack}
			className="rounded-md bg-bluegray p-2 font-semibold text-beige transition hover:bg-bluegray-70 focus:outline-none"
		>
			Go Back
		</button>
	)
}

export default GoBackButton
