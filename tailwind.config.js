/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: '#08060F',
        ink: '#F4F2FF',
        dim: '#A6A0C7',
        violet: '#8B5CF6',
        blue: '#38BDF8',
        pink: '#F472B6',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
