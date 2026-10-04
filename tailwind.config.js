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
          sage: '#98B4A6',
          'sage-light': '#E8EFEA',
          'sage-dark': '#4F6F60',
          mint: '#BEE7D5',
          'mint-light': '#F0F9F5',
          'mint-dark': '#38785E',
          lavender: '#D8CBEB',
          'lavender-light': '#F4F0FA',
          'lavender-dark': '#69538F',
          blue: '#BFDBFE',
          'blue-light': '#EFF6FF',
          'blue-dark': '#305A94',
          pink: '#FBCFE8',
          'pink-light': '#FDF2F8',
          'pink-dark': '#A04772',
          peach: '#FED7AA',
          'peach-light': '#FFF7ED',
          'peach-dark': '#A15326',
          cream: '#FEF9EF',
          warm: '#FAF7F2',
          beige: '#F5EFEB',
          sand: '#EADBCE',
        },
        brand: {
          dark: '#1E293B',
          navy: '#334155',
          muted: '#64748B',
          subtle: '#94A3B8',
          border: '#E2E8F0',
          card: '#FFFFFF',
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
