// Pourquoi type mais pas class ?
/**
 * plus simple de définir un type pour représenter un utilisateur, plutôt que d'utiliser une classe
 * immuable : les propriétés d'un utilisateur ne changent pas après sa création, donc pas besoin de méthodes pour les modifier
 * parfait pour API responses : les données reçues d'une API sont généralement des objets simples, et un type suffit pour les représenter
 */
export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};