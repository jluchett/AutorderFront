// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useStore from "../store";
import "../styles/InfoUser.css";

const InfoUser = () => {
  const { userId } = useParams();
  const { users } = useStore();
  const user = users.find((user) => user.id === userId);
  const { ipHost } = useStore();
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    setShowSuccessMessage(false);
  };

  const handleSaveName = async () => {
    // Lógica para guardar el nuevo nombre en la base de datos
    await fetch(`http://${ipHost}:3001/users/update/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });
    user.name = newName;
    setEditingName(false);
    setShowSuccessMessage(true);
  };

  const handleEditName = () => {
    setEditingName(true);
    setShowSuccessMessage(false);
  };

  const handleCancelEditName = () => {
    setNewName(user.name);
    setEditingName(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    // Lógica para cambiar la contraseña del usuario
    await fetch(`http://${ipHost}:3001/users/update/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName, password }),
    });
    // Implementar la lógica de cambio de contraseña según tus necesidades
    setSuccessMessage("Contraseña cambiada exitosamente");
  };

  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div className="body">
      <div className="users-page">
        <div className="info-user">
          <h2>Datos del usuario</h2>
          <div className="user-details">
            <div className="user-image">
              <i className="fa-solid fa-user"></i>
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
          {showSuccessMessage && (
            <div className="success-message">
              Nombre modificado exitosamente
            </div>
          )}
          <div>
            {editingName ? (
              <div className="name-display">
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                />

                <button onClick={handleSaveName}>Guardar</button>
                <button onClick={handleCancelEditName}>Cancelar</button>
              </div>
            ) : (
              <div className="name-display">
                <button onClick={handleEditName}>Cambiar nombre</button>
              </div>
            )}
          </div>
          <div className="password">
            <h3>Cambiar contraseña</h3>
            <form>
              <div className="input-container">
                <input
                  type="password"
                  className="input-float"
                  placeholder=" "
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                />
                <label className="label-float">Nueva contraseña</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  className="input-float"
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                />
                <label className="label-float">Confirmar contraseña</label>
              </div>
              {errorMessage && (
                <span className="error-message">{errorMessage}</span>
              )}
              {successMessage && (
                <span className="success-message">{successMessage}</span>
              )}
              <button onClick={handlePasswordChange} className="add-button">
                Guardar
              </button>
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
      </div>
    </div>
  );
};

export default InfoUser;
