import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(0 100% 50%)',
          foreground: 'hsl(0 0% 98%)',
        },
        // Wedding-specific colors
        blush: {
          light: 'hsl(351 89% 90%)',
          DEFAULT: 'hsl(351 89% 76%)',
          dark: 'hsl(351 89% 60%)',
        },
        gold: {
          light: 'hsl(43 96% 75%)',
          DEFAULT: 'hsl(43 96% 56%)',
          dark: 'hsl(43 96% 40%)',
        },
        burgundy: {
          light: 'hsl(342 35% 40%)',
          DEFAULT: 'hsl(342 35% 25%)',
          dark: 'hsl(342 35% 15%)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        dancing: ['var(--font-dancing)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      backgroundImage: {
        'wedding-pattern': "url('/images/patterns/floral-bg.png')",
        'gold-gradient': 'linear-gradient(to right, hsl(43 96% 56%), hsl(36 100% 65%))',
      },
    },
  },
  plugins: [],
}
export default config 