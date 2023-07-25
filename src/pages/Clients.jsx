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

  const deleteClient = () => {
    alert("Hola mundo")
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
        <Link className="agregar-button" to={"/users/add"}>
          Agregar Usuario
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
