import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react()],
	image: {
		remotePatterns: [
			{
				protocol: "https",
			},
		],
		domains: ["cdn.capriccipineda.es"],
	},
	output: "server",
	adapter: node({
		mode: 'standalone',
	}),
})
