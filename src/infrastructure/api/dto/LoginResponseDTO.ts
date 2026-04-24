// Ce fichier définit le type de données pour la réponse de l'API lors d'une connexion réussie. 
// Il inclut les informations de l'utilisateur et le token d'accès.

export type LoginResponseDTO = {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
};