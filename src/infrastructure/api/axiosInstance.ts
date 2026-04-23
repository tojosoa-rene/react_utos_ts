// instance typée d'axios pour faire les appels réseau vers l'API
// - configuration de baseURL et headers
// - interceptor pour ajouter le token d'authentification à chaque requête

import axios from "axios";

// instance typée d'axios avec configuration de baseURL et headers
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// interceptor typé pour ajouter le token d'authentification à chaque requête
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
