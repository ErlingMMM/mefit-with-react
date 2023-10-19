/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'custom-main': '#FF5733', //must be changed
        'custom-green': '#A8E52D',
      },
      textColor: {
        'custom-green': '#A8E52E',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans'],
    },
  },
  plugins: [],
}

