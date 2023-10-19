/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'custom-main': '#FF5733', 
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans'], 
    },
  },
  plugins: [],
}

