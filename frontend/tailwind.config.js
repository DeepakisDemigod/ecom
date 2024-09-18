/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      colors: {
    dark: "#141414"
  },
    }
  },
  
  daisyui: {
    themes: ['sunset']
  },
  plugins: [require('daisyui')]
};
