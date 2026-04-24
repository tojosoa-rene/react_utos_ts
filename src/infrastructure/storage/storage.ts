// fichier de gestion du stockage local (token, user info, etc.)
// - centralise la logique d'accès au localStorage, ce qui facilite la maintenance et l'évolution du code
// - permet de gérer les cas où localStorage n'est pas disponible (ex: SSR)

export const storage = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  getUser: () => {
    if (typeof window === "undefined") return null;

    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setAuth: (token: string, user: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
};