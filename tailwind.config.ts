import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#111111',
          charcoal: '#202020',
          dark: '#181818',
          card: '#242424',
          red: '#D62828',
          redDark: '#A31616',
          redLight: '#FBE8E8',
          crimson: '#B71C1C',
          accent: '#E63946',
          grey: '#333333',
          muted: '#666666',
          border: '#E5E7EB',
          borderDark: '#2E2E2E',
          gold: '#E5A93C',
          goldDark: '#B8860B',
          goldLight: '#FEF9C3',
          emerald: '#10B981',
          emeraldLight: '#ECFDF5',
          cream: '#FAFAFA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'meat': '0 10px 30px -10px rgba(214, 40, 40, 0.2)',
        'premium': '0 12px 36px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
