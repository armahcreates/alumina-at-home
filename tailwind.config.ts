import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#235B4E',
          50: '#6DBAAA',
          100: '#5FB2A1',
          200: '#44A18F',
          300: '#398678',
          400: '#2E7163',
          500: '#235B4E',
          600: '#1A453B',
          700: '#122F28',
          800: '#091815',
          900: '#010302',
          950: '#000000',
        },
        accent: {
          DEFAULT: '#EFC2B3',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFF5F2',
          300: '#F9DDD1',
          400: '#EFC2B3',
          500: '#EFC2B3',
          600: '#E5A795',
          700: '#DB8C77',
          800: '#D17159',
          900: '#C7563B',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
