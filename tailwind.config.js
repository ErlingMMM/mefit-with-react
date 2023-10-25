module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'custom-green': '#A8E52D',
        'custom-green-hover': '#D0FF70',
      },
      textColor: {
        'custom-green': '#A8E52E',
        'custom-black': '#333333',
      },
      spacing: {
        '1/7': '14%',
      },
     
    },
    fontFamily: {
      sans: ['Montserrat', 'sans'],
    },

  },
  plugins: [],
}
