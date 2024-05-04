/** @type {import('tailwindcss').Config} */

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				bluegray: {
					DEFAULT: "#232F3F",
					90: "#394453",
					80: "#4D5763",
					70: "#626B76",
					60: "#777E88",
					50: "#8B9199",
				},
				bluegreen: {
					DEFAULT: "#378888",
					90: "#4B9394",
					80: "#5D9D9E",
					70: "#71A9A9",
					60: "#83B3B4",
					50: "#96BEBE",
				},
				rouge: {
					DEFAULT: "#B93950",
					90: "#BF4C61",
					80: "#C55F71",
					70: "#CB7282",
					60: "#D696A2",
					50: "#D696A2",
				},

				beige: "#FCFCFC",
			},
			screens: {
				xs: "380px",
			},
		},
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				".scrollbar-hide": {
					"scrollbar-width": "none",
					"-ms-overflow-style": "none",
					"&::-webkit-scrollbar": {
						display: "none",
					},
				},
			})
		},
	],
}
