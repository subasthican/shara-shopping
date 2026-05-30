/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rosewood: '#a93543',
        maroon: '#7f2430',
        blush: '#f4ded8',
        pearl: '#fbf8f4',
        linen: '#efe4d8',
        gold: '#c69a4d',
        ink: '#191615',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px rgba(73, 45, 36, 0.12)',
      },
    },
  },
  plugins: [],
};
