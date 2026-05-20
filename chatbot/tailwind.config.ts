import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6750A4',
        'primary-container': '#EADDFF',
        secondary: '#625B71',
        'secondary-container': '#E8DEF8',
        tertiary: '#7D5260',
        'tertiary-container': '#FFD8E4',
        surface: '#FFFBFE',
        background: '#FFFBFE',
        outline: '#79747E',
        'outline-variant': '#CAC4D0',
        error: '#B3261E',
        'on-primary': '#FFFFFF',
        'on-secondary': '#FFFFFF',
        'on-tertiary': '#FFFFFF',
        'on-surface': '#1C1B1F',
        'on-background': '#1C1B1F',
        'on-error': '#FFFFFF',
      },
      fontSize: {
        'headline-md-mobile': ['1.5rem', '2rem'],
        'code-md': ['1.125rem', '1.75rem'],
      },
      spacing: {
        'layout-gutter': '1.5rem',
        'sidebar-width': '320px',
      },
      boxShadow: {
        'inner-glow-primary': '0 0 0 2px #EADDFF',
      },
    },
  },
  plugins: [require('tailwindcss-filters')],
};
export default config;
