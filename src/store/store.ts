// Ce fichier configure le store Redux pour l'application
// - il combine les reducers de tous les slices (ici, seulement authSlice pour l'authentification)
// - il exporte le store et les types globaux pour le state et le dispatch

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'

// configuration du store Redux
export const store = configureStore({
  reducer: {
    auth: authReducer,  // auth : namespaace, authReducer : reducer function
  },
});

// types globaux (ULTRA IMPORTANT)
// maka type an'ny state rehetra avy amin'ny store
export type RootState   = ReturnType<typeof store.getState>;  //type de tout state Redux
// maka type an'ny dispatch function avy amin'ny store
export type AppDispatch = typeof store.dispatch; //type de la fonction dispatch