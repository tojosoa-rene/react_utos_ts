import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Routes, Route, Navigate } from "react-router-dom";
// import './App.css'

import Login from "./ui/pages/Login";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
    </Routes>
  );
}

export default App
