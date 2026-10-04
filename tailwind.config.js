/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          sage: '#F19A56',
          'sage-light': '#FFF2E5',
          'sage-dark': '#C96A2F',
          mint: '#F6B98D',
          'mint-light': '#FFF7F1',
          'mint-dark': '#B65D25',
          lavender: '#F0D7C8',
          'lavender-light': '#FFF6F0',
          'lavender-dark': '#8F5B45',
          blue: '#EFC59B',
          'blue-light': '#FFF5EE',
          'blue-dark': '#AA6233',
          pink: '#F9D5C7',
          'pink-light': '#FFF1ED',
          'pink-dark': '#AF5E52',
          peach: '#F7C7A3',
          'peach-light': '#FFF3EC',
          'peach-dark': '#C36C3A',
          cream: '#FFFAF7',
          warm: '#F8F0E9',
          beige: '#F4E7DE',
          sand: '#EED7C5',
        },
        brand: {
          dark: '#362C2A',
          navy: '#5B453F',
          muted: '#7E665D',
          subtle: '#B4998C',
          border: '#F1DCCF',
          card: '#FFFDFB',
        }
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(100, 116, 139, 0.08), 0 2px 6px -1px rgba(100, 116, 139, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(100, 116, 139, 0.12), 0 4px 12px -2px rgba(100, 116, 139, 0.06)',
        'soft-xl': '0 20px 40px -6px rgba(100, 116, 139, 0.15), 0 8px 16px -4px rgba(100, 116, 139, 0.08)',
        'glow-mint': '0 0 25px rgba(190, 231, 213, 0.6)',
        'glow-lavender': '0 0 25px rgba(216, 203, 235, 0.6)',
        'glow-peach': '0 0 25px rgba(254, 215, 170, 0.6)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
