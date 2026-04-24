// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import Footer from "../components/Footer";
import { loginUser, getErrorMessage } from "../api";
import { validation } from "../services/validation";
import { ApiError } from "../services/apiClient";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const setError = useStore((state) => state.setError);
  const setLoading = useStore((state) => state.setLoading);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    const validationResult = validation.validateLoginForm(id, password);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setLoading(true);
    setError(null);

    try {
      // Realizar login con el nuevo cliente API
      const user = await loginUser(id, password);
      login(user);
      navigate("/");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      setErrors({ general: errorMessage });
      console.error("Error de inicio de sesión:", error);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/src/assets/LogoH.png" alt="Logo de la empresa" />
        </div>
      </header>
      <div className="body">
        <div className="login-container">
          <i className="fa-solid fa-user-lock"></i>
          <h1>Inicia Sesión</h1>
          
          {/* Mostrar error general si existe */}
          {errors.general && (
            <div className="error-message" style={{ 
              backgroundColor: '#fee', 
              color: '#c00', 
              padding: '10px', 
              borderRadius: '4px', 
              marginBottom: '15px',
              border: '1px solid #fcc'
            }}>
              {errors.general}
            </div>
          )}

          <div className="form-container">
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="id" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  id="id"
                  value={id}
                  placeholder="Numero de identificacion"
                  onChange={(e) => setId(e.target.value)}
                  className="form-input"
                  disabled={isLoading}
                />
                {errors.id && (
                  <span className="error-text" style={{ color: '#c00', fontSize: '12px' }}>
                    {errors.id}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  disabled={isLoading}
                />
                {errors.password && (
                  <span className="error-text" style={{ color: '#c00', fontSize: '12px' }}>
                    {errors.password}
                  </span>
                )}
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Iniciar sesión"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
