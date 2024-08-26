/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "bodyColor" : "#FDF9E5",
        "navColor" : "#B8B294",
        "footerColor" : "#69A88D",
        "buttonsColor" : "#7F7442",
        "inputColor" : "#D9D9D9",
        "cardCat" : "#C2C2C2",
        "bodyDark" : "#3B371E",
        "inputDark" : "#282121",
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
}