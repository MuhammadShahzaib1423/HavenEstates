/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F1',
        ink: '#191817',
        forest: {
          50: '#EFF6F2',
          100: '#D7EAE0',
          200: '#B0D5C3',
          300: '#7FB89F',
          400: '#4E9679',
          500: '#2C7A5F',
          600: '#1E624C',
          700: '#174F3E',
          800: '#143F33',
          900: '#11332A',
        },
        gold: {
          300: '#E3C57C',
          400: '#D9B25F',
          500: '#C9A24B',
          600: '#A98536',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px -24px rgba(25,24,23,0.28)',
        card: '0 12px 32px -14px rgba(25,24,23,0.16)',
      },
    },
  },
  plugins: [],
};
