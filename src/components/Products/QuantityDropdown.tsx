// QuantityDropdown.tsx
import React, { useState } from "react"

interface QuantityDropdownProps {
	options: number[]
	defaultValue?: number
}

const QuantityDropdown: React.FC<QuantityDropdownProps> = ({ options, defaultValue }) => {
	const [selectedValue, setSelectedValue] = useState<number>(defaultValue || options[0])
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const selectOption = (value: number) => {
		setSelectedValue(value)
		setIsOpen(false)
	}

	return (
		<div className="relative inline-block">
			<span className="flex items-center gap-3">
				<p className="text-semibold text-xl">Cantidad</p>
				<button
					className="inline-flex items-center rounded-lg border border-bluegreen px-4 py-2 font-semibold hover:bg-beige"
					onClick={toggleDropdown}
				>
					<span>{selectedValue}</span>
					<svg
						className="ml-2 h-4 w-4 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</button>
			</span>
			{isOpen && (
				<ul className="absolute z-10 mt-2 w-44 divide-y rounded-lg bg-white shadow">
					{options.map((option) => (
						<li
							key={option}
							className={`${
								option === selectedValue
									? "font-bold text-bluegreen"
									: " hover:bg-beige hover:text-bluegreen-70"
							} cursor-pointer px-4 py-2 text-lg`}
							onClick={() => selectOption(option)}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default QuantityDropdown
