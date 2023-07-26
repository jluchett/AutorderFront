// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../store";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { actualClients } from "../api";
import '../styles/Clients.css'

const Clients = () => {
  const clients = useStore((state) => state.clients);
  const setClients = useStore((state) => state.setClients);

  useEffect(() => {
    const getClients = async () => {
      const data = await actualClients();
      setClients(data);
    };
    getClients();
  }, [setClients]);

  const deleteClient = async(clientId) => {
    // Lógica para eliminar un cliente de la base de datos
    try {
      const confirmed = window.confirm(
        "¿Estás seguro de que deseas eliminar este Cliente?"
      );
      if (confirmed) {
        await fetch(`http://192.168.1.9:3001/clients/delete/${clientId}`, {
          method: "DELETE",
        });
        // Actualizar el estado "clients" eliminando el cliente 
        const data = await actualClients();
        setClients(data);
      }
    } catch (error) {
      console.log("Error al eliminar cliente:", error);
    }
  };

  return (
    <>
      <HeaderBar />
      <div className="users-page">
        <div className="encabezado">
          <div className="client">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <h2>Clientes</h2>
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
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.nombre}</td>
                  <td className="actions">
                    <Link to={`/clients/${client.id}`}>
                      <button className="edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                    <button
                      className="delete"
                      onClick={() => deleteClient(client.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="agregar-button" to={"/clients/add"}>
          Agregar Cliente
        </Link>
        <Link className="regresar-button" to={"/"}>
          Ir a Home
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Clients;
