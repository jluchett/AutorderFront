// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import useStore from "../store";

const initialForm = {
  placa: "",
  marca: "",
  modelo: "",
  anio: "",
  kilometraje: "",
  motor: "",
  transmision: "",
  cliente_id: "",
  nombre_cliente: "",
};

const AddVehicle = () => {
  const [vehicle, setVehicle] = useState(initialForm);
  const [errorMesage, setErrorMesage] = useState("");
  const [succesMesage, setSuccesMesage] = useState("");
  const {ipHost} = useStore()

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
    setErrorMesage("");
    setSuccesMesage("");
  };

  function validarForm(obj) {
    return Object.values(obj).every((value) => value !== "");
  }

  const handledSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validarForm(vehicle);
    if (!isFormValid) {
      setErrorMesage("Todos los datos son necesarios");
      setSuccesMesage("");
      return;
    }
    // Comprobar aquí si el campo de entrada contiene solo números
    const isNumeric = /^\d+$/.test(vehicle.anio);
    if (!isNumeric) {
      // Muestra un mensaje de error o realiza otra acción en caso de que el campo no contenga solo números
      setErrorMesage("El campo año debe contener solo números.");
      setSuccesMesage("");
      return;
    }

    fetch(`http://${ipHost}:3001/vehicles/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        placa: vehicle.placa,
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        anio: vehicle.anio,
        kilometraje: vehicle.kilometraje,
        motor: vehicle.motor,
        transmision: vehicle.transmision,
        cliente_id: vehicle.cliente_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.succes
          ? (setSuccesMesage(data.message), setVehicle(initialForm))
          : setErrorMesage(data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main>
      <HeaderBar />
      <div className="info-user">
        <div className="encabezado">
          <div className="user-add">
            <i className="fa-solid fa-car-side"></i>
          </div>
          <h2>Agregar Vehiculo</h2>
        </div>
        <div className="form-add">
          <form>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="placa"
                value={vehicle.placa}
                onChange={handleChange}
              />
              <label className="label-float">Placa del vehiculo</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="marca"
                value={vehicle.marca}
                onChange={handleChange}
              />
              <label className="label-float">Marca vehiculo</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="modelo"
                value={vehicle.modelo}
                onChange={handleChange}
              />
              <label className="label-float">Modelo vehiculo</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="anio"
                value={vehicle.anio}
                onChange={handleChange}
              />
              <label className="label-float">Año vehiculo</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="kilometraje"
                value={vehicle.kilometraje}
                onChange={handleChange}
              />
              <label className="label-float">Kilometraje</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="motor"
                value={vehicle.motor}
                onChange={handleChange}
              />
              <label className="label-float">Motor cc</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="transmision"
                value={vehicle.transmision}
                onChange={handleChange}
              />
              <label className="label-float">Transmision</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder=" "
                required
                className="input-float"
                name="cliente_id"
                value={vehicle.cliente_id}
                onChange={handleChange}
              />
              <label className="label-float">Id del Cliente</label>
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
          <Link className="regresar-button" to={"/vehicles"}>
            Regresar a vehiculos
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AddVehicle;