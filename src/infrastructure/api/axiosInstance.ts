// instance typée d'axios pour faire les appels réseau vers l'API
// - configuration de baseURL et headers
// - interceptor pour ajouter le token d'authentification à chaque requête

import axios from "axios";
import { logout } from "../../store/features/auth/authSlice";
import { store } from "../../store/store";
import { storage } from "../../infrastructure/storage/storage";

// instance typée d'axios avec configuration de baseURL et headers
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// interceptor typé pour ajouter le token d'authentification à chaque requête
API.interceptors.request.use((config) => {
  // config.withCredentials = true; // important (“envoye aussi les cookies automatiquement avec chaque requête”)

  // return config;
  const token = storage.getToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// interceptor pour gérer les erreurs d'authentification (token expiré ou invalide)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // token invalide ou expiré -> déconnexion de l'utilisateur
    const status = error.response?.status;

    // console.log("status:", status);

    if (status === 401) {
      
      console.warn("Token expired or unauthorized");

      // clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // reset redux state
      store.dispatch(logout());

      // redirect login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
