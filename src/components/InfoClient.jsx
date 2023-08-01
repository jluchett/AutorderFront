// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useStore from "../store.jsx";

const InfoClient = () => {
  const clients = useStore((state) => state.clients);
  const { clientId } = useParams();
  const client = clients.find((cli) => cli.id === clientId);
  const [datos, setDatos] = useState(client);
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
    // Lógica para guardar nuevos datos en la base de datos
    await fetch(`http://192.168.1.9:3001/clients/update/${client.id}`, {
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
    setDatos(client);
  };

  return (
    <>
      <div className="info-user">
        <h2>Datos del cliente</h2>
        <div className="user-details">
          <div className="client-image">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <div className="user-data">
            <label>ID: </label>
            <span>{datos.id}</span>
            <div>
              <label>Nombre: </label>
              <span>{datos.nombre}</span>
            </div>
            <label>Telefono: </label>
            <span>{datos.telefono}</span>
            <div>
              <label>Email: </label>
              <span>{datos.email}</span>
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
                      name="nombre"
                      value={datos.nombre}
                      onChange={handleChange}
                    />
                    <label className="label-float">Nombre</label>
                  </div>
                  <div className="input-container">
                    <input
                      placeholder=" "
                      className="input-float"
                      type="text"
                      name="telefono"
                      value={datos.telefono}
                      onChange={handleChange}
                    />
                    <label className="label-float">Telefono</label>
                  </div>
                  <div className="input-container">
                    <input
                      className="input-float"
                      placeholder=" "
                      type="text"
                      name="email"
                      value={datos.email}
                      onChange={handleChange}
                    />
                     <label className="label-float">Email</label>
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
        <Link className="regresar-button" to={"/clients"}>
          Regresar a Clientes
        </Link>
      </div>
    </>
  );
};

export default InfoClient;
