import axios from "axios";

const API = axios.create({
  baseURL: "http://utos_back.local",
});

// interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;