// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

const Login = () => {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Realizar la llamada al backend para verificar las credenciales
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        login(user);
        navigate("/");
      } else {
        // Manejo de error de inicio de sesión inválido
        alert("Credenciales inválidas");
      }
    } catch (error) {
      // Manejo de error de conexión o cualquier otro error
      console.error("Error de inicio de sesión:", error);
      alert("Ocurrió un error durante el inicio de sesión");
    }
  };

  return (
    <div>
      <h1>Página de inicio de sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
