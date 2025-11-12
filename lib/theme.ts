import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: '#E6F2F0' },
          100: { value: '#B8DAD4' },
          200: { value: '#8AC2B8' },
          300: { value: '#5CAA9C' },
          400: { value: '#2E9280' },
          500: { value: '#235B4E' },
          600: { value: '#1C493E' },
          700: { value: '#15372F' },
          800: { value: '#0E251F' },
          900: { value: '#071210' },
        },
        accent: {
          50: { value: '#FEF8F6' },
          100: { value: '#FCE9E3' },
          200: { value: '#F9D9CF' },
          300: { value: '#F7CABC' },
          400: { value: '#F4BAA8' },
          500: { value: '#EFC2B3' },
          600: { value: '#EA9B82' },
          700: { value: '#E57451' },
          800: { value: '#E04D20' },
          900: { value: '#B83D1A' },
        },
      },
      fonts: {
        heading: { value: 'var(--font-geist-sans), system-ui, sans-serif' },
        body: { value: 'var(--font-geist-sans), system-ui, sans-serif' },
        mono: { value: 'var(--font-geist-mono), monospace' },
      },
    },
  },
  globalCss: {
    body: {
      bg: 'primary.500',
      color: 'accent.500',
    },
  },
})

export const system = createSystem(defaultConfig, config)

export default system