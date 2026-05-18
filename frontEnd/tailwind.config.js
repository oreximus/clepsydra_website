/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          'navy-deep': '#0D1B3E',
          'navy':      '#1A3A8A',
          'blue':      '#2B5FD9',
          'sky':       '#4A9DE8',
          'sky-light': '#7EC8F4',
          'dot':       '#0D2B6B',
        },
        surface: {
          white:  '#FFFFFF',
          off:    '#F7F9FC',
          muted:  '#EEF2F8',
        },
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display':    ['4.5rem',  { lineHeight: '1.1', fontWeight: '700' }],
        'headline':   ['3rem',    { lineHeight: '1.15', fontWeight: '700' }],
        'title':      ['2rem',    { lineHeight: '1.25', fontWeight: '600' }],
        'subtitle':   ['1.375rem',{ lineHeight: '1.4',  fontWeight: '500' }],
        'label-caps': ['0.75rem', { lineHeight: '1',    fontWeight: '600', letterSpacing: '0.15em' }],
      },
      borderRadius: {
        'card':   '12px',
        'button': '8px',
        'pill':   '9999px',
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.25rem)",
        sm: "calc(var(--radius) - 0.5rem)",
      },
      boxShadow: {
        'brand-sm': '0 1px 3px 0 rgba(26,58,138,0.08), 0 1px 2px -1px rgba(26,58,138,0.06)',
        'brand-md': '0 4px 16px -2px rgba(26,58,138,0.12), 0 2px 8px -2px rgba(26,58,138,0.08)',
        'brand-lg': '0 20px 40px -8px rgba(13,27,62,0.15), 0 8px 20px -4px rgba(26,58,138,0.1)',
        'brand-xl': '0 32px 64px -12px rgba(13,27,62,0.2)',
      },
      backgroundImage: {
        'brand-gradient':      'linear-gradient(135deg, #0D1B3E 0%, #1A3A8A 60%, #2B5FD9 100%)',
        'sky-gradient':        'linear-gradient(135deg, #2B5FD9 0%, #4A9DE8 100%)',
        'hero-gradient':       'linear-gradient(160deg, #0D1B3E 0%, #1A3A8A 50%, #2B5FD9 100%)',
        'subtle-gradient':     'linear-gradient(180deg, #F7F9FC 0%, #FFFFFF 100%)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
