// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { actualVehicles } from "../api";
import useStore from "../store";

const Vehicles = () => {
  const vehicles = useStore((state) => state.vehicles);
  const setVehicles = useStore((state) => state.setVehicles);
  const {ipHost} = useStore()

  useEffect(() => {
    const getVehicles = async () => {
      const data = await actualVehicles();
      setVehicles(data);
    };
    getVehicles();
  }, [setVehicles]);

  const deleteVehicle = async(vehicPlaca) => {
    // Lógica para eliminar un vehiculo de la base de datos
    try {
      const confirmed = window.confirm(
        "¿Estás seguro de que deseas eliminar este Vehiculo?"
      );
      if (confirmed) {
        await fetch(`http://${ipHost}:3001/vehicles/delete/${vehicPlaca}`, {
          method: "DELETE",
        });
        // Actualizar el estado "vehicles" eliminando el vehiculo 
        const data = await actualVehicles();
        setVehicles(data);
      }
    } catch (error) {
      console.log("Error al eliminar vehiculo:", error);
    }
  };
  return (
    <>
      <HeaderBar />
      <div className="users-page">
        <div className="encabezado">
          <div className="vehicle">
            <i className="fa-solid fa-car-side"></i>
          </div>
          <h2>Vehiculos</h2>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.placa}>
                  <td>{vehicle.placa}</td>
                  <td>{vehicle.marca}</td>
                  <td>{vehicle.modelo}</td>
                  <td>{vehicle.nombre_cliente}</td>
                  <td className="actions">
                    <Link to={`/vehicles/${vehicle.placa}`}>
                      <button className="edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                    <button
                      className="delete"
                      onClick={() => deleteVehicle(vehicle.placa)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="agregar-button" to={"/vehicles/add"}>
          Agregar Vehiculo
        </Link>
        <Link className="regresar-button" to={"/"}>
          Ir a Home
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Vehicles;
