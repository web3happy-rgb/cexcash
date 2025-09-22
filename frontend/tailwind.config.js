/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#F4C542',
          black: '#070708',
          gray: '#141518',
          slate: '#1C1D21'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 60px rgba(244, 197, 66, 0.35)'
      }
    }
  },
  plugins: []
};
