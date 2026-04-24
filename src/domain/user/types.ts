// types liés à l'authentification et à la gestion des utilisateurs
// - ils définissent les structures de données utilisées dans l'application pour représenter les utilisateurs et les résultats d'authentification
// - ils permettent de garantir la cohérence des données à travers l'application et facilitent le développement en fournissant des types clairs et précis

export type AuthResult = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};