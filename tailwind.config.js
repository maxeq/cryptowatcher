/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '12px': '12px',
        '10px': '10px',
      },
      height: {
        '13': '3.15rem',
      },
      colors: {
        cmc: '#858ca2',
        cmc2: '#323546',
        gold: '#FFD700',
        bronze: '#CD7F32',
      },
      animation: {
        spin: 'spin 1s linear',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
