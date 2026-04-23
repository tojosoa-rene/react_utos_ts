// Ce fichier contient les types globaux pour l'environnement de développement avec Vite
// - il permet à TypeScript de comprendre les imports CSS et les variables d'environnement définies dans Vite

/// <reference types="vite/client" />
// permet à TS de comprendre les imports CSS
declare module "*.css";

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}