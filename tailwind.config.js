/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Inti
        'primary': '#003629',
        'primary-container': '#1b4d3e',
        'secondary': '#2c694e',
        'kaltim-gold': '#E9A825',
        'gold-light': '#FDF6E7',
        'tertiary': '#402a00',
        'tertiary-container': '#5d3f00',
        'tertiary-fixed': '#ffdeab',
        'tertiary-fixed-dim': '#feba38',
        'on-tertiary-fixed': '#281900',

        // Permukaan dan teks
        'surface': '#f0fdf1',
        'background': '#f0fdf1',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eaf7ec',
        'surface-container': '#e4f1e6',
        'surface-container-high': '#dfebe0',
        'on-surface': '#131e17',
        'on-surface-variant': '#404945',
        'text-muted': '#52655A',
        'outline': '#707974',
        'border-subtle': '#E2E8E4',
        'on-primary': '#ffffff',
        'on-primary-container': '#8abda9',

        // Status & Badge
        'badge-activity-bg': '#ECFDF5',
        'badge-activity-text': '#065F46',
        'badge-opt-bg': '#FEE2E2',
        'badge-opt-text': '#991B1B',
        'error': '#ba1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
