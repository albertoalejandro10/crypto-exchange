/** @type {import('tailwindcss').Config} */

// Change this import to import
import { addDynamicIconSelectors } from '@iconify/tailwind';
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [addDynamicIconSelectors()],
}