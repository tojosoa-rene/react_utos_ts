import { useState, useEffect } from 'react'
import { useSelector, useDispatch }from "react-redux";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Routes, Route, Navigate } from "react-router-dom";
// import './App.css'

import Login from "./ui/pages/Login";
import Dashboard from "./ui/pages/Dashboard";
import ForgotPassword from "./ui/pages/ForgotPassword";
import ResetPassword from './ui/pages/ResetPassword';
import Signup from './ui/pages/SignUp';

function App() {
  // maka dispatch function avy amin'ny Redux
  const dispatch = useDispatch();
  //maka user avy amin'ny Redux
  const user  = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(getMe()); // miverina fetch user
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

      <Route
        path="/signup"
        element={<Signup />}
      />
    </Routes>
  );
}

export default App
