import React from "react"

interface Props {
	type: "filled" | "half" | "empty"
	className?: string
}

const Star: React.FC<Props> = ({ type, className }) => {
	switch (type) {
		case "filled":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					className={className}
					viewBox="0 0 24 24"
				>
					<path d="M0 0h24v24H0z"></path>
					<path
						fill="#DFAE00"
						d="m8.243 7.34-6.38.925-.113.023a1 1 0 0 0-.44 1.684l4.622 4.499-1.09 6.355-.013.11a1 1 0 0 0 1.464.944l5.706-3 5.693 3 .1.046a1 1 0 0 0 1.352-1.1l-1.091-6.355 4.624-4.5.078-.085a1 1 0 0 0-.633-1.62l-6.38-.926-2.852-5.78a1 1 0 0 0-1.794 0L8.243 7.34z"
					></path>
				</svg>
			)
		case "half":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					stroke="#DFAE00"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					className={className}
					viewBox="0 0 24 24"
				>
					<path stroke="none" d="M0 0h24v24H0z"></path>
					<path
						fill="#DFAE00"
						stroke="none"
						d="M12 1a.993.993 0 0 1 .823.443l.067.116 2.852 5.781 6.38.925c.741.108 1.08.94.703 1.526l-.07.095-.078.086-4.624 4.499 1.09 6.355a1.001 1.001 0 0 1-1.249 1.135l-.101-.035-.101-.046-5.693-3-5.706 3c-.105.055-.212.09-.32.106l-.106.01a1.003 1.003 0 0 1-1.038-1.06l.013-.11 1.09-6.355-4.623-4.5a1.001 1.001 0 0 1 .328-1.647l.113-.036.114-.023 6.379-.925 2.853-5.78A.968.968 0 0 1 12 1zm0 3.274V16.75a1 1 0 0 1 .239.029l.115.036.112.05 4.363 2.299-.836-4.873a1 1 0 0 1 .136-.696l.07-.099.082-.09 3.546-3.453-4.891-.708a1 1 0 0 1-.62-.344l-.073-.097-.06-.106L12 4.274z"
					></path>
				</svg>
			)
		case "empty":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					stroke="#DFAE00"
					strokeWidth="1.5"
					className={className}
					viewBox="0 0 24 24"
				>
					<path stroke="none" d="M0 0h24v24H0z"></path>
					<path d="m12 17.75-6.172 3.245 1.179-6.873-5-4.867 6.9-1 3.086-6.253 3.086 6.253 6.9 1-5 4.867 1.179 6.873z"></path>
				</svg>
			)
		default:
			return null
	}
}

export default Star
