// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../store";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import "../styles/AddUser.css";

const AddUser = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errorMesage, setErrorMesage] = useState("");
  const [succesMesage, setSuccesMesage] = useState("");
  const { ipHost } = useStore();

  const handledSubmit = (e) => {
    e.preventDefault();
    if (!id || !name) {
      setErrorMesage("Todos los datos son necesarios");
      setSuccesMesage("");
      return;
    }
    // Comprobar aquí si el campo de entrada contiene solo números
    const isNumeric = /^\d+$/.test(id);
    if (!isNumeric) {
      // Muestra un mensaje de error o realiza otra acción en caso de que el campo no contenga solo números
      setErrorMesage("El campo Identificacion debe contener solo números.");
      setSuccesMesage("");
      return;
    }
    if (password.length < 8) {
      setErrorMesage("La contraseña debe tener al menos 8 caracteres");
      setSuccesMesage("");
      return;
    }
    if (password != confPassword) {
      setErrorMesage("La confrmacion es diferente a la contraseña");
      setSuccesMesage("");
      return;
    }
    fetch(`http://${ipHost}:3001/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.succes
          ? setSuccesMesage(data.message)
          : setErrorMesage(data.message);
        setId("");
        setName("");
        setPassword("");
        setConfPassword("");
      })
      .catch((error) => {
        console.log(error);
      });
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
