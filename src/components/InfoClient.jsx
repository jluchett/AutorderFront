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

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClient = async () => {
    // Lógica para guardar nuevos datos en la base de datos
    await fetch(`http://192.168.1.9:3001/clients/update/${client.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ datos }),
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
            <span>{client.id}</span>
            <div>
              <label>Nombre: </label>
              <span>{client.nombre}</span>
            </div>
            <label>Telefono: </label>
            <span>{client.telefono}</span>
            <div>
              <label>Email: </label>
              <span>{client.email}</span>
            </div>
          </div>
        </div>
        <div>
          {editingClient ? (
            <div className="name-display">
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
              <button onClick={handleSaveClient}>Guardar</button>
              <button onClick={handleCancelEdit}>Cancelar</button>
            </div>
          ) : (
            <div className="name-display">
              <button onClick={handleEditCli}>Cambiar nombre</button>
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