/** @type {import('tailwindcss').Config} */

export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                bluegray: "#232F3F",
            },
            screens: {
                xs: "380px",
            },
        },
    },
    plugins: [],
};
