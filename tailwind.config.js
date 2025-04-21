/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fff4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        secondary: {
          50: '#edfcf9',
          100: '#d1f5ed',
          200: '#a7e9db',
          300: '#6dd5c2',
          400: '#38baa4',
          500: '#24a08d',
          600: '#1b8073',
          700: '#196760',
          800: '#19524f',
          900: '#144342',
          950: '#092a2a',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        dark: {
          100: '#4a4a4a',
          200: '#3a3a3a',
          300: '#2c2c2c',
          400: '#1e1e1e',
          500: '#171717',
          600: '#111111',
          700: '#0a0a0a',
          800: '#050505',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { 
            'box-shadow': '0 0 5px rgb(34 197 94 / 0.2), 0 0 20px rgb(34 197 94 / 0.2), 0 0 30px rgb(34 197 94 / 0.2)'
          },
          '100%': {
            'box-shadow': '0 0 10px rgb(34 197 94 / 0.4), 0 0 40px rgb(34 197 94 / 0.4), 0 0 50px rgb(34 197 94 / 0.4)'
          }
        }
      },
      boxShadow: {
        'glow-sm': '0 0 5px rgb(34 197 94 / 0.2), 0 0 20px rgb(34 197 94 / 0.2)',
        'glow': '0 0 10px rgb(34 197 94 / 0.3), 0 0 40px rgb(34 197 94 / 0.3)',
        'glow-lg': '0 0 15px rgb(34 197 94 / 0.4), 0 0 60px rgb(34 197 94 / 0.4)',
      },
    },
  },
  plugins: [],
}