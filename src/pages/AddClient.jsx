// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const initialForm = {
  id: "",
  nombre: "",
  telefono: "",
  email: "",
};

const AddClient = () => {
  const [client, setClient] = useState(initialForm);
  const [errorMesage, setErrorMesage] = useState("");
  const [succesMesage, setSuccesMesage] = useState("");

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  function validarForm(obj) {
    return Object.values(obj).every((value) => value !== "");
  }

  const handledSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validarForm(client);
    if (!isFormValid) {
      setErrorMesage("Todos los datos son necesarios");
      setSuccesMesage("");
      return;
    }
    // Comprobar aquí si el campo de entrada contiene solo números
    const isNumeric = /^\d+$/.test(client.id);
    if (!isNumeric) {
      // Muestra un mensaje de error o realiza otra acción en caso de que el campo no contenga solo números
      setErrorMesage("El campo Identificacion debe contener solo números.");
      setSuccesMesage("");
      return;
    }
    console.log("Hola enviaste el form");
    setErrorMesage("");
    setSuccesMesage("Hola enviaste el form");
  };
  return (
    <>
      <HeaderBar />
      <div className="info-user">
        <div className="encabezado">
          <div className="user-add">
            <img src="/src/assets/client.png" className="imgCli"></img>
          </div>
          <h2>Agregar Cliente</h2>
        </div>
        <div className="form-add">
          <form>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="id"
                value={client.id}
                onChange={handleChange}
              />
              <label className="label-float">Número identificación</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="nombre"
                value={client.nombre}
                onChange={handleChange}
              />
              <label className="label-float">Nombre cliente</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="telefono"
                value={client.telefono}
                onChange={handleChange}
              />
              <label className="label-float">Numero celular</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="email"
                value={client.email}
                onChange={handleChange}
              />
              <label className="label-float">Email cliente</label>
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
            Regresar a Home
          </Link>
          <span className="separador"></span>
          <Link className="regresar-button" to={"/clients"}>
            Regresar a Clientes
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddClient;
