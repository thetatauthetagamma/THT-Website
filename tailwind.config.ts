import { url } from 'inspector'
import { DefaultRouteMatcherManager } from 'next/dist/server/future/route-matcher-managers/default-route-matcher-manager'
import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      
      backgroundImage: {
        'tht-main': "url('../public/fratphoto.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Rajdhani','Poppins', 'Arial', 'sans-serif'],
        custom: ['Montserrat', 'Arial', 'sans-serif'],
        
      },
      keyframes: {
        menu: {
          '0%': {transform: 'scaleY(0)'},
          '70%': {transform: 'scaleY(1.1)'},
          '100%': {transform: 'scaleY(1)'},
        },
      },
      animation: {
        'open-menu': 'menu 0.6s ease-in-out forwards',
      },
      
    },
   
  },
  
  plugins: [require("tw-elements/dist/plugin.cjs")],
}
export default config
