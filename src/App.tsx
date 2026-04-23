// Ce fichier est le point d'entrée de l'application React
// - il configure les routes de l'application et utilise les hooks personnalisés pour accéder au store Redux
// - il vérifie si l'utilisateur est authentifié pour protéger les routes privées (Dashboard)

import { useEffect } from 'react'
import { useSelector, useDispatch }from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./store/hooks"; // hooks typés

import Login from "./ui/pages/Login";
import Dashboard from "./ui/pages/Dashboard";
import ForgotPassword from "./ui/pages/ForgotPassword";
import ResetPassword from './ui/pages/ResetPassword';

function App() {
  // maka dispatch function avy amin'ny Redux
  const dispatch = useAppDispatch();
  //maka user avy amin'ny Redux
  const user    = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      // dispatch(getMe()); // miverina fetch user
    }
  }, [dispatch, user]); //dependency array

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}   // auth guard
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />
    </Routes>
  );
}

export default App
