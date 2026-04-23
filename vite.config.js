// Ce fichier configure Vite pour le projet React avec TypeScript
// - il utilise le plugin React pour Vite
// - il configure le serveur de développement pour écouter sur toutes les interfaces réseau (host: true) et sur le port 5175
// - il autorise les connexions depuis les hôtes spécifiés (utos_react_ts.local, localhost, frontend_ts)
// - il configure le Hot Module Reload (HMR) pour fonctionner avec le hostname utos_react_ts.local, 
//   ce qui est nécessaire pour que HMR fonctionne correctement dans un environnement Docker/Nginx

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // afaka miditra avy amin'ny host na IP rehetra
    host: true, // mba hihaino amin'ny 0.0.0.0 (tsy localhost fotsiny)
    port: 5175,
    allowedHosts: [
      'utos_react_ts.local', // hostname tianao ampiasaina amin'ny browser
      'localhost',        // mety ilaina ihany koa
      'frontend_ts',       // anaran'ny container raha proxy ao Nginx
    ],
    hmr: {
      //mba hifandray amin’ny Hot Module Reload (HMR) avy any amin’ny host PC
      host: 'utos_react_ts.local', // hostname ampiasaina ao amin'ny docker-compose / nginx
    }
  }
})
