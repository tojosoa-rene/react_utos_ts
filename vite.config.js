import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // afaka miditra avy amin'ny host na IP rehetra
    host: true, // mba hihaino amin'ny 0.0.0.0 (tsy localhost fotsiny)
    port: 5174,
    allowedHosts: [
      'utos_react.local', // hostname tianao ampiasaina amin'ny browser
      'localhost',        // mety ilaina ihany koa
      'frontend_solid',       // anaran'ny container raha proxy ao Nginx
    ],
    hmr: {
      //mba hifandray amin’ny Hot Module Reload (HMR) avy any amin’ny host PC
      host: 'utos_react.local', // hostname ampiasaina ao amin'ny docker-compose / nginx
    }
  }
})
