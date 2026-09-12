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
        red: '#3b5bff',
        purple: '#7a4dff',
        green: '#00b4ff',
        cyan: '#00b4ff',
        blue: '#3b5bff',
        violet: '#7a4dff',
        dark: '#0b1220',
        body: '#1e293b',
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
