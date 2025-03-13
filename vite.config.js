import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: process.env.PORT || 5173,
    host: '0.0.0.0',
    allowedHosts: ['alphabet-hover-nav-a113146cee37.herokuapp.com', '.herokuapp.com']
  }
})