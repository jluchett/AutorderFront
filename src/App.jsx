// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import useStore from "./store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./styles/App.css";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import AddUser from "./pages/AddUser";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import AddClient from "./pages/AddClient";

const App = () => {
  const { user, login } = useStore();
  // Verificar si ya hay un usuario autenticado en el estado global
  if (!user) {
    // Si no hay un usuario autenticado, intentar recuperar los datos del almacenamiento local
    const storedUser = localStorage.getItem("user");
    // Si hay datos de usuario almacenados, establecerlos en el estado global
    if (storedUser) {
      login(JSON.parse(storedUser));
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/users" element={user ? <Users /> : <Navigate to="/login" />} />
        <Route path="/users/:userId" element={user ? <UserDetail /> : <Navigate to="/login" />} />
        <Route path="/users/add" element={user ? <AddUser /> : <Navigate to="/login" />} />
        <Route path="/clients" element={user ? <Clients/> : <Navigate to="/login" />} />
        <Route path="/clients/:clientId" element={user ? <ClientDetail/> : <Navigate to="/login" />} />
        <Route path="/clients/add" element={user ? <AddClient /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
