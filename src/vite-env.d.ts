// Ce fichier contient les types globaux pour l'environnement de développement avec Vite
// - il permet à TypeScript de comprendre les imports CSS et les variables d'environnement définies dans Vite

/// <reference types="vite/client" />
// permet à TS de comprendre les imports CSS
declare module "*.css";

// types pour les variables d'environnement définies dans Vite (ex: VITE_API_URL)
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

// types pour l'objet import.meta utilisé dans les modules ESNext
interface ImportMeta {
  readonly env: ImportMetaEnv;
}