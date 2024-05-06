import React from "react"
import { searchQuery } from "@/stores/Search"

interface Props {
	className?: string
}

const SearchInput: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<input
				onChange={(e) => searchQuery.set(e.target.value)}
				type="search"
				placeholder="¿Qué estás buscando?"
				className="h-full w-full rounded-lg bg-beige pl-3 hover:cursor-pointer focus:outline-none"
			/>
			<span className="absolute inset-y-0 right-0 flex items-center pr-2">
				<button type="submit" className="focus:shadow-outline p-1 focus:outline-none">
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
				</button>
			</span>
		</div>
	)
}

export default SearchInput
