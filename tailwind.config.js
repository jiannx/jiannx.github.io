/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D23669',
        'primary-light': '#E84A7A',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}

