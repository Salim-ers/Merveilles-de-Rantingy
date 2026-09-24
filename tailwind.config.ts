import type { Config } from 'tailwindcss';

/** Les tokens vivent dans app/globals.css ; Tailwind les relaie en utilitaires. */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: { DEFAULT: 'var(--orange)', hot: 'var(--orange-hot)', deep: 'var(--orange-deep)' },
        noir: 'var(--noir)',
        anthracite: 'var(--anthracite)',
        charbon: 'var(--charbon)',
        craie: 'var(--craie)',
        clair: 'var(--gris-clair)',
      },
      fontFamily: {
        display: ['var(--font-display-next)', 'Haettenschweiler', 'Impact', 'sans-serif'],
        sans: ['var(--font-ui-next)', 'system-ui', 'sans-serif'],
      },
      borderRadius: { none: '0px' },
      maxWidth: { wrap: 'var(--max)' },
    },
  },
  plugins: [],
};
export default config;
