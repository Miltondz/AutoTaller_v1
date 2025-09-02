/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#1c1c1e',
        'dark-secondary': '#232326',
        'light-gray': '#bbbbbb',
        'accent-red': '#d92639',
        // Keeping existing status colors for now, can be adjusted later if needed
        success: {
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
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      fontFamily: {
        sans: ['Libre Franklin', 'Franklin Gothic Medium', 'Inter', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        impact: ['Impact', 'sans-serif'],
        fugaz: ['Fugaz One', 'sans-serif'],
        franklin: ['Franklin Gothic Medium', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Industrial-specific sizes
        'industrial-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'industrial-base': ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        'industrial-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'industrial-xl': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'industrial-2xl': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        'industrial-3xl': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'industrial-4xl': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '800' }],
      },
      boxShadow: {
        'industrial': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'tool': 'inset 2px 2px 4px rgba(255,255,255,0.1), inset -2px -2px 4px rgba(0,0,0,0.3)',
        'pressed': 'inset 2px 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'metallic-gradient': 'linear-gradient(145deg, #475569, #334155)',
        'tool-gradient': 'linear-gradient(145deg, #64748b, #475569)',
        'pressed-gradient': 'linear-gradient(145deg, #334155, #475569)',
      },
      animation: {
        'mechanical-spin': 'spin 2s linear infinite',
        'tool-hover': 'tool-hover 0.3s ease-in-out',
      },
      keyframes: {
        'tool-hover': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-2px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      }
    },
  },
  plugins: [],
}