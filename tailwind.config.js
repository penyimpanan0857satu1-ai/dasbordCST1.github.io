/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        panel: 'rgba(10, 27, 44, 0.55)',
        neon: '#00cfff'
      },
      boxShadow: {
        neon: '0 0 25px rgba(0, 207, 255, 0.35)',
        glass: '0 8px 30px rgba(0, 0, 0, 0.45)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};
