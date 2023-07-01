// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import useStore from "./store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./styles/App.css";

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

  console.log(user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
