// Ce fichier contient le slice Redux pour l'authentification
// - il définit l'état d'authentification, les actions et les reducers pour gérer la connexion, la déconnexion, 
//   la récupération de mot de passe et la réinitialisation de mot de passe
// - il utilise localStorage pour persister le token et les informations de l'utilisateur entre les sessions

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "../../../infrastructure/storage/storage";

const token = storage.getToken();

let user = null;

if (token) {
  const userData = storage.getUser();

  if (userData) {
    user = JSON.parse(userData);
  }
}
// const user  = token ? JSON.parse(localStorage.getItem("user")) : null;

// type de l'utilisateur
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

// type de l'état d'authentification
type AuthState = {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "success" | "error" | null;
  error: string | null;
  message: string | null;
};

// état initial de l'authentification
const initialState: AuthState = {
  user: null,
  token: null,
  status: null,
  error: null,
  message: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  
  reducers: {
    loginStart: (state) => {
      state.status  = "loading";
      state.error   = null;
    },

    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.status = "success";
      state.user   = action.payload.user;
      state.token  = action.payload.token;

      // localStorage.setAuth("user", JSON.stringify(action.payload.user));
      // localStorage.setItem("token", action.payload.token);
      storage.setAuth(action.payload.token, action.payload.user);
    },

    loginError: (state, action: PayloadAction<string>) => {
      state.status = "error";
      state.error  = action.payload;
    },

    logout: (state) => {
      state.user  = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    forgotPasswordStart: (state) => {
      state.status  = "loading";
      state.error   = null;
      state.message = null;
    },

    forgotPasswordSuccess: (state, action: PayloadAction<string>) => {
      state.status  = "success";
      state.message = action.payload;
    },

    forgotPasswordFailure: (state, action: PayloadAction<string>) => {
      state.status  = "error";
      state.error   = action.payload;
    },

    resetPasswordStart: (state) => {
      state.status  = "loading";
      state.error   = null;
    },

    resetPasswordSuccess: (state, action: PayloadAction<string>) => {
      state.status  = "success";
      state.message = action.payload;
    },

    resetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.status  = "error";
      state.error   = action.payload;
    },
  },
});

export const { 
  loginStart, loginSuccess, loginError, logout, 
  forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailure,
  resetPasswordStart, resetPasswordSuccess, resetPasswordFailure } = authSlice.actions;
export default authSlice.reducer;