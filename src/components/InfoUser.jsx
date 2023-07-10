// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useStore from "../store";
import "../styles/InfoUser.css";

const InfoUser = () => {
  const { userId } = useParams();
  const { users } = useStore();
  const user = users.find((user) => user.id === userId);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSaveName = () => {
    // Lógica para guardar el nuevo nombre en la base de datos
    
    console.log("Nuevo nombre:", newName);
    setEditingName(false);
  };

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleCancelEditName = () => {
    setNewName(user.name);
    setEditingName(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Lógica para cambiar la contraseña del usuario
    // Implementar la lógica de cambio de contraseña según tus necesidades
    console.log("Cambio de contraseña");
  };

  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <>
      <div className="info-user">
        <h2>Datos del usuario</h2>
        <div className="user-details">
          <div className="user-image">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <div className="user-data">
            <label>ID: </label>
            <span>{user.id}</span>
            <div>
              <label>Nombre: </label>
              <span>{newName}</span>
            </div>
            <label>Locked: </label>
            <span>{user.locked.toString()}</span>
          </div>
        </div>
        <div>
          {editingName ? (
            <div className="name-display">
              <input type="text" value={newName} onChange={handleNameChange} />

              <button onClick={handleSaveName}>Guardar</button>
              <button onClick={handleCancelEditName}>Cancelar</button>
            </div>
          ) : (
            <div className="name-display">
              <button onClick={handleEditName}>Cambiar nombre</button>
            </div>
          )}
        </div>
        <div className="password-change">
          <h3>Cambiar contraseña</h3>
          <form>
            <div>
              <label>Nueva contraseña:</label>
              <input type="password" />
            </div>
            <div>
              <label>Confirmar contraseña:</label>
              <input type="password" />
            </div>
            <button onClick={handlePasswordChange}>Guardar</button>
          </form>
        </div>
      </div>
      <div className="enlaces">
        <Link className="regresar-button" to={"/"}>
          Regresar a Home
        </Link>
        <span className="separador"></span> 
        <Link className="regresar-button" to={"/users"}>
          Regresar a Usuarios
        </Link>
      </div>
    </>
  );
};

export default InfoUser;
