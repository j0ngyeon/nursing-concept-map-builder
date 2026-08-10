import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base defaults to '/' for root-domain hosts (Vercel, Netlify, ...).
// GitHub Pages serves this project from a subpath, so its deploy script
// overrides base with --base=/nursing-concept-map-builder/ at build time.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
