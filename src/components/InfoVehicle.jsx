// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useStore from "../store";

const InfoVehicle = () => {
  const vehicles = useStore((state) => state.vehicles);
  const { vehicPlaca } = useParams();
  const vehicle = vehicles.find((vehic) => vehic.placa === vehicPlaca);
  const [datos, setDatos] = useState(vehicle);
  const [editingClient, setEditingClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();
    if (datos.marca ==="" || datos.modelo ==="" || datos.anio ==="" ){
      setErrorMessage("Los datos no pueden estar vacios")
      return
    }
    // Lógica para guardar nuevos datos en la base de datos
    await fetch(`http://192.168.1.9:3001/vehicles/update/${vehicle.placa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    setEditingClient(false);
    setSuccessMessage("Datos actualizados");
  };

  const handleEditCli = () => {
    setEditingClient(true);
    setSuccessMessage("");
  };

  const handleCancelEdit = () => {
    setEditingClient(false);
    setDatos(vehicle);
  };


  return (
    <>
      <div className="info-user">
        <h2>Datos del Vehiculo</h2>
        <div className="user-details">
          <div className="client-image">
            <i className="fa-solid fa-car-side"></i>
          </div>
          <div className="user-data">
            <label>Placa: </label>
            <span>{datos.placa}</span>
            <div>
              <label>Marca: </label>
              <span>{datos.marca}</span>
            </div>
            <label>Modelo: </label>
            <span>{datos.modelo}</span>
            <div>
              <label>Año: </label>
              <span>{datos.anio}</span>
            </div>
          </div>
          <div className="user-data">
            <label>Kilometros: </label>
            <span>{datos.kilometraje}</span>
            <div>
              <label>Motor: </label>
              <span>{datos.motor}</span>
            </div>
            <label>Transmision: </label>
            <span>{datos.transmision}</span>
            <div>
              <label>Id Cliente: </label>
              <span>{datos.cliente_id}</span>
            </div>
          </div>
        </div>
        <div>
          {editingClient ? (
            <div>
              <div className="form-conte">
                <form>
                  <br />
                  <div className="input-container">
                    <input
                      className="input-float"
                      placeholder=" "
                      type="text"
                      name="marca"
                      value={datos.marca}
                      onChange={handleChange}
                    />
                    <label className="label-float">Marca Vehiculo</label>
                  </div>
                  <div className="input-container">
                    <input
                      placeholder=" "
                      className="input-float"
                      type="text"
                      name="modelo"
                      value={datos.modelo}
                      onChange={handleChange}
                    />
                    <label className="label-float">Modelo Vehiculo</label>
                  </div>
                  <div className="input-container">
                    <input
                      className="input-float"
                      placeholder=" "
                      type="text"
                      name="anio"
                      value={datos.anio}
                      onChange={handleChange}
                    />
                     <label className="label-float">Año del vehiculo</label>
                  </div>
                  <div className="input-container">
                    <input
                      className="input-float"
                      placeholder=" "
                      type="text"
                      name="kilometraje"
                      value={datos.kilometraje}
                      onChange={handleChange}
                    />
                    <label className="label-float">Kilometros recorridos</label>
                  </div>
                  <div className="input-container">
                    <input
                      placeholder=" "
                      className="input-float"
                      type="text"
                      name="motor"
                      value={datos.motor}
                      onChange={handleChange}
                    />
                    <label className="label-float">Cilindaje motor</label>
                  </div>
                  <div className="input-container">
                    <input
                      className="input-float"
                      placeholder=" "
                      type="text"
                      name="transmision"
                      value={datos.transmision}
                      onChange={handleChange}
                    />
                     <label className="label-float">Tipo transmision</label>
                  </div>
                  {errorMessage && (
                    <span className="error-message">{errorMessage}</span>
                  )}
                  <button onClick={handleSaveClient} className="add-button">Guardar</button>
                  <button onClick={handleCancelEdit} className="add-button">Cancelar</button>
                </form>
              </div>  
            </div>
          ) : (
            <div className="name-display">
              <button onClick={handleEditCli}>Modificar datos</button>
            </div>
          )}
          {successMessage && (
            <span className="success-message">{successMessage}</span>
          )}
        </div>
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
    </>
  );
};

export default InfoVehicle;
