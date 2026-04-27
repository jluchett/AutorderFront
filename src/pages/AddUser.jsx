// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import apiClient from "../services/apiClient";
import "../styles/AddUser.css";

const AddUser = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errorMesage, setErrorMesage] = useState("");
  const [succesMesage, setSuccesMesage] = useState("");
  

  const handledSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!id || !name) {
      setErrorMesage("Todos los datos son necesarios");
      setSuccesMesage("");
      return;
    }

    const isNumeric = /^\d+$/.test(id);
    if (!isNumeric) {
      setErrorMesage("El campo Identificación debe contener solo números.");
      setSuccesMesage("");
      return;
    }

    if (password.length < 8) {
      setErrorMesage("La contraseña debe tener al menos 8 caracteres");
      setSuccesMesage("");
      return;
    }

    if (password !== confPassword) {
      setErrorMesage("La confirmación es diferente a la contraseña");
      setSuccesMesage("");
      return;
    }

    try {
      const response = await apiClient.post('/users/create', {  // ← USAR APICLIENT
        id,
        name,
        password,
      });
      
      setSuccesMesage(response.message);
      setErrorMesage("");
      
      // Limpiar formulario
      setId("");
      setName("");
      setPassword("");
      setConfPassword("");
    } catch (error) {
      setErrorMesage(error.message || 'Error al crear usuario');
      setSuccesMesage("");
      console.error("Error:", error);
    }
  };

  return (
    <div className="app">
      <HeaderBar />
      <div className="body">
        <section className="users-page">
          <div className="info-user">
            <div className="encabezado">
              <div className="user-add">
                <i className="fa-solid fa-user-plus"></i>
              </div>
              <h2>Agregar usuario</h2>
            </div>
            <div className="form-add">
              <form>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder=" "
                    required
                    className="input-float"
                    value={id}
                    onChange={(e) => {
                      setId(e.target.value);
                      setErrorMesage("");
                      setSuccesMesage("");
                    }}
                  />
                  <label className="label-float">Número identificación</label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder=" "
                    required
                    className="input-float"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrorMesage("");
                      setSuccesMesage("");
                    }}
                  />
                  <label className="label-float">Nombre usuario</label>
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    placeholder=" "
                    required
                    className="input-float"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMesage("");
                      setSuccesMesage("");
                    }}
                  />
                  <label className="label-float">Contraseña</label>
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    placeholder=" "
                    required
                    className="input-float"
                    value={confPassword}
                    onChange={(e) => {
                      setConfPassword(e.target.value);
                      setErrorMesage("");
                      setSuccesMesage("");
                    }}
                  />
                  <label className="label-float">Confirmar contraseña</label>
                </div>
                {errorMesage && (
                  <span className="error-message">{errorMesage}</span>
                )}
                {succesMesage && (
                  <span className="success-message">{succesMesage}</span>
                )}
                <button className="add-button" onClick={handledSubmit}>
                  Guardar
                </button>
              </form>
            </div>
            <div className="enlaces">
              <Link className="regresar-button" to={"/"}>
                Ir a Home
              </Link>
              <span className="separador"></span>
              <Link className="regresar-button" to={"/users"}>
                Ir a Usuarios
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AddUser;
