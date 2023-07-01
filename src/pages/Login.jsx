// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Realizar la llamada al backend para verificar las credenciales
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        const user = await response.json();
        login(user.user);
        localStorage.setItem('user', JSON.stringify(user.user));
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
    <div className="login-container">
      <h1 className="login-title">Iniciar sesión</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="id" className="form-label">
            Usuario:
          </label>
          <input
            type="text"
            id="id"
            value={id}
            name="id"
            onChange={(e) => setId(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
