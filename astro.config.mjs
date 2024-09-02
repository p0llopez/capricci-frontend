import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

import vercel from "@astrojs/vercel/serverless"

import preact from "@astrojs/preact"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  image: {
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
    domains: ["cdn.capriccipineda.es"],
  },
  output: "server",
  adapter: vercel(),
})
