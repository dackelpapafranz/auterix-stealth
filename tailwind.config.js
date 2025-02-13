/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        twinkle: {
          '0%': { transform: 'translateY(0)', opacity: 0.3 },
          '50%': { opacity: 0.8 },
          '100%': { transform: 'translateY(-100vh)', opacity: 0.3 }
        }
      },
      animation: {
        twinkle: 'twinkle var(--tw-animate-duration) linear infinite'
      }
    }
  },
  plugins: [],
};