// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import useStore from "../store";
import { actualUsers } from "../api";
import apiClient from "../services/apiClient";
import "../styles/Users.css";

const Users = () => {
  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);
  useEffect(() => {
    // Lógica para obtener los usuarios de la base de datos y almacenarlos en el estado "users"
    const getUsers = async () => {
      const data = await actualUsers();
      setUsers(data);
    };

    getUsers();
  }, [setUsers]);

  const deleteUser = async (userId) => {
    try {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (confirmed) {
      await apiClient.delete(`/users/${userId}`);  // ← CAMBIO PRINCIPAL
      // Actualizar estado
      const data = await actualUsers();
      setUsers(data);
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    // Mostrar error al usuario
  }
  };

  const lockUser = async (userId) => {
    try {
      const user = users.find((u) => u.id === userId);
      const newLockedValue = !user.locked;

      const confirmed = window.confirm(
        "Esto cambiará el acceso del usuario en la aplicación\n¿Desea continuar?"
      );
      
      if (confirmed) {
        await apiClient.put(`/users/locked/${userId}`, { locked: newLockedValue });  // ← CAMBIO
        const data = await actualUsers();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error al cambiar estado del usuario:", error);
    }
  };

  return (
    <div className="app">
      <HeaderBar />
      <div className="users-page">
        <div className="encabezado">
          <div className="users">
            <i className="fa-solid fa-users"></i>
          </div>
          <h2>Usuarios</h2>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td className="actions">
                    <Link to={`/users/${user.id}`}>
                      <button className="edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                    {!user.locked ? (
                      <button
                        className="lock"
                        onClick={() => lockUser(user.id)}
                      >
                        <i className="fa-solid fa-lock-open"></i>
                      </button>
                    ) : (
                      <button
                        className="locked-status"
                        onClick={() => lockUser(user.id)}
                      >
                        <i className="fa-solid fa-lock"></i>
                      </button>
                    )}
                    <button
                      className="delete"
                      onClick={() => deleteUser(user.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="agregar-button" to={"/users/add"}>
          Agregar Usuario
        </Link>
        <Link className="regresar-button" to={"/"}>
          Ir a Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Users;
