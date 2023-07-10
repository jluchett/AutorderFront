// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import useStore from "../store";
import { actualUsers } from "../api";
import "../styles/Users.css";

const Users = () => {
  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);

  useEffect(() => {
    // Lógica para obtener los usuarios de la base de datos
    // y almacenarlos en el estado "users"
    const getUsers = async () => {
      const data = await actualUsers();
      setUsers(data);
    };

    getUsers();
  }, [setUsers]);

  const deleteUser = async (userId) => {
    // Lógica para eliminar un usuario de la base de datos
    try {
      const confirmed = window.confirm(
        "¿Estás seguro de que deseas eliminar este usuario?"
      );
      if (confirmed) {
        await fetch(`http://192.168.1.20:3001/users/delete/${userId}`, {
          method: "DELETE",
        });
        // Actualizar el estado "users" eliminando el usuario eliminado
        const data = await actualUsers();
        setUsers(data);
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const lockUser = async (userId) => {
    // Lógica para bloquear un usuario en la base de datos
    try {
      // Obtener el usuario actual por su ID
      const user = users.find((user) => user.id === userId);
      // Invertir el valor del campo "locked"
      const newLockedValue = !user.locked;

      const confirmed = window.confirm(
        "Esto cambiará el acceso del usuario la aplicacion \n¿Desea continuar?"
      );
      if (confirmed) {
        await fetch(`http://192.168.1.20:3001/users/lock/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locked: newLockedValue }),
        });
        // Actualizar el estado "users" modificando el campo de estado del usuario bloqueado
        const data = await actualUsers();
        setUsers(data);
      }
    } catch (error) {
      console.log("Error updating user:", error);
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
                    <Link to={`/users/${user.id}`}>
                      <button className="edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="agregar-button" to={"/"}>
          Agregar Usuario
        </button>
        <Link className="regresar-button" to={"/"}>
          Ir a Home
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Users;
