/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Editorial archive palette — driven by CSS variables so we can
        // theme-shift the entire surface (light <-> dark) without touching
        // every class. Variables are stored as space-separated R G B tuples.
        paper: {
          DEFAULT: 'rgb(var(--c-paper) / <alpha-value>)',
          50: 'rgb(var(--c-paper-50) / <alpha-value>)',
          100: 'rgb(var(--c-paper-100) / <alpha-value>)',
          200: 'rgb(var(--c-paper-200) / <alpha-value>)',
          300: 'rgb(var(--c-paper-300) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          900: 'rgb(var(--c-ink-900) / <alpha-value>)',
          800: 'rgb(var(--c-ink-800) / <alpha-value>)',
          700: 'rgb(var(--c-ink-700) / <alpha-value>)',
          600: 'rgb(var(--c-ink-600) / <alpha-value>)',
        },
        stone: {
          50: '#F5F3EE',
          100: '#EEEAE2',
          200: '#DFD9CC',
          300: '#C8C0AF',
          400: '#A29A87',
          500: '#7E7665',
          600: '#5C5547',
          700: '#403A30',
          800: '#2B271F',
          900: '#1A1714',
        },
        beige: {
          50: '#F2EDE2',
          100: '#E8E0CE',
          200: '#D6CBB1',
          300: '#BBAE8C',
        },
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          50: 'rgb(var(--c-accent-50) / <alpha-value>)',
          100: 'rgb(var(--c-accent-100) / <alpha-value>)',
          200: 'rgb(var(--c-accent-200) / <alpha-value>)',
          300: 'rgb(var(--c-accent-300) / <alpha-value>)',
          400: 'rgb(var(--c-accent-400) / <alpha-value>)',
          500: 'rgb(var(--c-accent-500) / <alpha-value>)',
          600: 'rgb(var(--c-accent-600) / <alpha-value>)',
        },
        moss: 'rgb(var(--c-moss) / <alpha-value>)',
        ocean: '#3A4D5C',
        bone: '#EAE2D0',
        rust: 'rgb(var(--c-rust) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"EB Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', '"Söhne"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 7vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 3.5vw, 2.75rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        editorial: '-0.01em',
        wide: '0.08em',
        widest: '0.18em',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.04)',
        edge: '0 0 0 1px rgba(0, 0, 0, 0.06)',
        lift: '0 24px 60px -20px rgba(0, 0, 0, 0.18)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-editorial both',
        'fade-up': 'fade-up 0.5s ease-editorial both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
