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
    console.log(datos)
    // Lógica para guardar nuevos datos en la base de datos
    await fetch(`http://192.168.1.9:3001/clients/update/${client.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    setEditingClient(false);
  };

  const handleEditCli = () => {
    setEditingClient(true);
  };

  const handleCancelEdit = () => {
    setEditingClient(false);
  };

  return (
    <>
      <div className="info-user">
        <h2>Datos del cliente</h2>
        <div className="user-details">
          <div className="user-image">
            <i className="fa-solid fa-user"></i>
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
            <div className="name-display">
              <div className="password-change">
                <h3>Cambiar contraseña</h3>
                <form>
                  <div>
                    <label>Nombre: </label>
                    <input
                      type="text"
                      name="nombre"
                      value={datos.nombre}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Telefono: </label>
                    <input
                      type="text"
                      name="telefono"
                      value={datos.telefono}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Email: </label>
                    <input
                      type="text"
                      name="email"
                      value={datos.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errorMessage && (
                    <span className="error-message">{errorMessage}</span>
                  )}
                  {successMessage && (
                    <span className="success-message">{successMessage}</span>
                  )}
                  <button onClick={handleSaveClient}>Guardar</button>
                  <button onClick={handleCancelEdit}>Cancelar</button>
                </form>
              </div>
            </div>
          ) : (
            <div className="name-display">
              <button onClick={handleEditCli}>Modificar datos</button>
            </div>
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
