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
      maxWidth: {
        'content': '680px',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-fira-code)', 'Menlo', 'monospace'],
      },
      lineHeight: {
        'relaxed': '1.8',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}

