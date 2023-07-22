// eslint-disable-next-line no-unused-vars
import React from "react";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import "../styles/AddUser.css";

const AddUser = () => {
  return (
    <>
      <HeaderBar />
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
              />
              <label className="label-float">Número identificación</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
              />
              <label className="label-float">Nombre usuario</label>
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder=" "
                required
                className="input-float"
              />
              <label className="label-float">Contraseña</label>
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder=" "
                required
                className="input-float"
              />
              <label className="label-float">Confirmar contraseña</label>
            </div>
            <button className="add-button">Guardar</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddUser;
