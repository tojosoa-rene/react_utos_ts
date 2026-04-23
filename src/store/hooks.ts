// Ce fichier contient des hooks personnalisés pour utiliser le store Redux dans les composants React
// - useAppDispatch : hook personnalisé pour utiliser la fonction dispatch typée
// - useAppSelector : hook personnalisé pour utiliser le selector typé

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// maka type an'ny dispatch function avy amin'ny store
export const useAppDispatch = () => useDispatch<AppDispatch>(); //dispatch typé
// maka type an'ny state rehetra avy amin'ny store
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector; //selector typé