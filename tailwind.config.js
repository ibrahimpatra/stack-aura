/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#000129',
        red: '#DB333D',
        offwhite: '#F0EFF2',
        border: '#DDE1EA',
      },
    },
  },
  plugins: [],
};
