import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#3a2422',
        'brand-accent': '#e5943a',
        'brand-cream': '#f4e9de',
        'brand-off-white': '#f9f9f9',
        'brand-beige': '#d4b495',
      },
    },
  },
  plugins: [],
} satisfies Config;
