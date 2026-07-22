import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitedev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
