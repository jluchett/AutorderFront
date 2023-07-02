// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import "../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Lógica para obtener los usuarios de la base de datos
    // y almacenarlos en el estado "users"
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://192.168.1.9:3001/users/users");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    // Lógica para eliminar un usuario de la base de datos
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
      });
      // Actualizar el estado "users" eliminando el usuario eliminado
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const lockUser = async (userId) => {
    // Lógica para bloquear un usuario en la base de datos
    try {
      await fetch(`http://localhost:3001/users/${userId}/lock`, {
        method: "PUT",
      });
      // Actualizar el estado "users" modificando el campo de estado del usuario bloqueado
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, locked: true } : user
        )
      );
    } catch (error) {
      console.log("Error locking user:", error);
    }
  };

  return (
    <>
      <HeaderBar />
      <div className="users-page">
        <h2 className="title">Usuarios</h2>
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
                    <button className="edit">
                    <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteUser(user.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                    {!user.locked ? (
                      <button
                        className="lock"
                        onClick={() => lockUser(user.id)}
                      >
                        <i className="fa-solid fa-lock"></i>
                      </button>
                    ) : (
                      <span className="locked-status">Bloqueado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="regresar-button">Regresar</button>
      </div>
      <Footer />
    </>
  );
};

export default Users;
