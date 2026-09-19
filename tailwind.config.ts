import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* The brand runs on ink-on-paper. Everything else is a whisper. */
        ink: '#101010',
        soot: '#1C1C1C',
        graphite: '#3A3A3A',
        smoke: '#6E6A65',
        ash: '#A5A09A',
        mist: '#DCD8D2',
        bone: '#F1EEE9',
        paper: '#FBFAF8',
        white: '#FFFFFF',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.18em',
        brand: '0.32em',
      },
      maxWidth: {
        shell: '96rem',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1.14)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'slide-in': 'slide-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'ken-burns': 'ken-burns 18s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
