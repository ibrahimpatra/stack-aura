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
      // Bigger, easier-to-read text everywhere (about +15–25% vs Tailwind defaults).
      // Every `text-xs / text-sm / text-base ...` class on the site now uses these sizes.
      fontSize: {
        xs:   ['0.9rem',   { lineHeight: '1.4rem' }],
        sm:   ['1rem',     { lineHeight: '1.65rem' }],
        base: ['1.125rem', { lineHeight: '1.85rem' }],
        lg:   ['1.3rem',   { lineHeight: '2rem' }],
        xl:   ['1.5rem',   { lineHeight: '2.1rem' }],
        '2xl': ['1.8rem',  { lineHeight: '2.3rem' }],
        '3xl': ['2.2rem',  { lineHeight: '2.6rem' }],
        '4xl': ['2.7rem',  { lineHeight: '1.15' }],
      },
    },
  },
  plugins: [],
};
