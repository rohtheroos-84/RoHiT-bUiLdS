/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#050505',
        'secondary-bg': '#0a0a0a',
        'card-bg': 'rgba(20, 20, 30, 0.5)',
        'neon-blue': '#00f0ff',
        'neon-purple': '#b026ff',
        'neon-green': '#39ff14',
        'neon-pink': '#ff2ded',
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'matrix-fall': 'matrix-fall 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { 
            textShadow: '0 0 5px rgba(0, 240, 255, 0.5), 0 0 10px rgba(0, 240, 255, 0.3)'
          },
          '100%': { 
            textShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3)'
          }
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'float': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0px)' }
        },
      },
      backgroundImage: {
        'cyber-grid': "url('/images/cyber-grid.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.3)',
        'neon-purple': '0 0 5px #b026ff, 0 0 20px rgba(176, 38, 255, 0.3)',
        'neon-green': '0 0 5px #39ff14, 0 0 20px rgba(57, 255, 20, 0.3)',
      },
    },
  },
  plugins: [],
};