/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors : {
      //   // "bodyColor" : "#FDF9E5",
      //   "navColor" : "#B8B294",
      //   "footerColor" : "#69A88D",
      //   "buttonsColor" : "#7F7442",
      //   "inputColor" : "#D9D9D9",
      //   "cardCat" : "#C2C2C2",
      //   "bodyDark" : "#3B371E",
      //   "inputDark" : "#282121",
      // },
       colors : {
        "bodyColor": "#F7F7F7", // Light background for a clean look
        "navColor": "#3B82F6", // Bright blue for the navigation bar
        "footerColor": "#1F2937", // Dark gray for the footer, creating contrast
        "buttonsColor": "#4F46E5", // Purple for buttons, maintaining a vibrant look
        "inputColor": "#E5E7EB", // Light gray for input fields for visibility
        "cardCat": "#D1FAE5", // Soft green for category cards for a fresh appearance
        "bodyDark": "#1F1F1F", // Dark background for dark mode
        "inputDark": "#3B3B3B", // Dark gray for input fields in dark mode
      },
      animation: {
        bounce: 'bounce 0.6s infinite alternate',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      spacing: {
        '4': '1rem', // 16px
      },
    },
    variants: {
      extend: {
        animation: ['responsive', 'hover', 'focus', 'motion-safe', 'motion-reduce'],
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

// theme: {
//   extend: {
//     animation: {
//       bounce: 'bounce 0.6s infinite alternate',
//     },
//     keyframes: {
//       bounce: {
//         '0%, 100%': { transform: 'translateY(0)' },
//         '50%': { transform: 'translateY(-20px)' },
//       },
//     },
//     spacing: {
//       '4': '1rem', // 16px
//     },
//   },
// },
// variants: {
//   extend: {
//     animation: ['responsive', 'hover', 'focus', 'motion-safe', 'motion-reduce'],
//   },
// },