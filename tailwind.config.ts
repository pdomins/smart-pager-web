import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'custom-bg': '#FAF4EE',
      },
      colors: {
        'custom-blue': '#281952',
        'custom-beige': '#E2D1C3',
        'custom-brown': '#C5B7A7',
        'custom-grey': '#A89F96',
        'custom-vintage': '#8C7B6B',
        'complementary-blue': '#A7B5C5'

      },
      fontFamily: {
        recoleta: ['Recoleta', 'Recoleta Alt', 'serif'],
        averta: ['Averta', 'Recoleta', 'serif'],
      },
    },
  },
  plugins: [],
}

module.exports = config
export default config
