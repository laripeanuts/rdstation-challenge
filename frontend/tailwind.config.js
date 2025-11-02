/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
        'rd-primary': 'var(--primary)',
        'rd-secondary': 'rgb(var(--rd-secondary))',
        'rd-accent': 'rgb(var(--rd-accent))',
        'category-sales': 'rgb(var(--category-sales))',
        'category-marketing': 'rgb(var(--category-marketing))',
        'category-omnichannel': 'rgb(var(--category-omnichannel))',
        'category-ai': 'rgb(var(--category-ai))',
        'category-data': 'rgb(var(--category-data))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'sans-serif', 'system-ui'],
        display: [
          'var(--font-display)',
          'ui-sans-serif',
          'sans-serif',
          'system-ui',
        ],
      },
    },
  },
  // Note: In Tailwind 4, theme customizations can also be done via @theme directive in CSS
  // This config file provides compatibility with shadcn/ui components
};
