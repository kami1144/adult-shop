import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 莫兰迪色系 - 优雅温柔
        cream: {
          50: '#fdfcfb',
          100: '#faf9f7',
          200: '#f5f3ef',
          300: '#ebe7e0',
        },
        rose: {
          100: '#f7e8e8',
          200: '#edd5d5',
          300: '#d4a5a5',
          400: '#c9b1b1',
          500: '#b89898',
        },
        gold: {
          100: '#faf6ed',
          200: '#f0e6d3',
          300: '#e8d5b5',
          400: '#d4b896',
          500: '#c9a86c',
          600: '#b8956a',
        },
        charcoal: {
          700: '#4a4a4a',
          800: '#3d3d3d',
          900: '#2d2d2d',
        },
      },
    },
  },
  plugins: [],
};

export default config;
