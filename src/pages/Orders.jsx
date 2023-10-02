// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { actualOrders } from "../api";
import useStore from "../store";

const Orders = () => {
  const orders = useStore((state) => state.orders);
  const setOrders = useStore((state) => state.setOrders);
  const { ipHost } = useStore();

  useEffect(() => {
    const getOrders = async () => {
      const data = await actualOrders();
      setOrders(data);
    };
    getOrders();
  }, [setOrders]);

  const deleteOrder = async(idOrder) => {
    // Lógica para eliminar una orden de la base de datos
    try {
      const confirmed = window.confirm(
        `¿Estás seguro de que deseas eliminar esta orden #${idOrder} ?`
      );
      if (confirmed) {
        await fetch(`http://${ipHost}:3001/orders/delete/${idOrder}`, {
          method: "DELETE",
        });
        // Actualizar el estado "Orders" eliminando la orden 
        const data = await actualOrders();
        setOrders(data);
      }
    } catch (error) {
      console.log("Error al eliminar Orden:", error);
    }
  };
  return (
    <>
      <HeaderBar />
      <div className="users-page">
        <div className="encabezado">
          <div className="vehicle">
          <i className="fa-solid fa-car"></i>
          <span> </span>
          <i className="fa-solid fa-screwdriver-wrench"></i>
          </div>
          <h2>Ordenes</h2>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Placa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.orden_id}</td>
                  <td>{order.fecha_orden}</td>
                  <td>{order.nombre_cliente}</td>
                  <td>{order.placa_vehi}</td>
                  <td className="actions">
                    <Link to={`/orders/${order.orden_id}`}>
                      <button className="edit">
                        <i className="fa-brands fa-searchengin"></i>
                      </button>
                    </Link>
                    <button
                      className="delete"
                      onClick={() => deleteOrder(order.orden_id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="agregar-button" to={"/orders/add"}>
          Agregar Orden
        </Link>
        <Link className="regresar-button" to={"/"}>
          Ir a Home
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
