module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fade: {
          '0%, 100%': {opacity: 0},
          '50%': {opacity:1}
        }
      },
      animation: {
        fade: 'fade 2s',
      }
    },
  },
  plugins: [],
}
