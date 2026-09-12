/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
      '3xl': '1800px',
    },
    extend: {
      colors: {
        red: '#f71c52',
        purple: '#554c86',
        green: '#39d47a',
        dark: '#202020',
        body: '#2b2b2b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        roboto: ['Inter', 'sans-serif'],
        oswald: ['Outfit', 'sans-serif'],
      },
      spacing: {
        section: '120px',
      },
      maxWidth: {
        container: '1140px',
        'container-2xl': '1340px',
      },
    },
  },
  plugins: [],
}
