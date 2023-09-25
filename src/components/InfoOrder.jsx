// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useStore from "../store";
import { actualDetalle } from "../api";
import "../styles/InfoOrder.css";

const InfoOrder = () => {
  const { orders } = useStore();
  const { idOrden } = useParams();
  const orderNum = parseInt(idOrden);
  const ordenM = orders.find((order) => order.orden_id === orderNum);
  const [ordenD, setOrdenD] = useState([]);

  useEffect(() => {
    const getInfoOrder = async () => {
      const data = await actualDetalle(orderNum);
      setOrdenD(data);
    };
    getInfoOrder();
  }, [orderNum, setOrdenD]);

  return (
    <div className="body">
      <div className="info-user3">
        <div className="order-info">
          <h2>
            Datos de la orden No. <span className="numOrden">{idOrden}</span>
          </h2>
          <div>
            <label>Fecha: </label>
            <span>{ordenM.fecha_orden}</span>
          </div>
          <div>
            <label>Cliente: </label>
            <span>{ordenM.nombre_cliente}</span>
          </div>
          <div>
            <label>Telefono: </label>
            <span>{ordenM.telefono_cliente}</span>
          </div>
          <div>
            <label>C.C ó Nit: </label>
            <span>{ordenM.id_cliente}</span>
          </div>
          <div>
            <label>Placa Vehiculo: </label>
            <span>{ordenM.placa_vehi}</span>
          </div>
        </div>
      </div>

      <div className="info-user3">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Cod</th>
                <th>Descripcion</th>
                <th>Cant</th>
                <th>Precio Und</th>
                <th>Valor Tot</th>
              </tr>
            </thead>
            <tbody>
              {ordenD.map((order) => (
                <tr key={order.codigo}>
                  <td>{order.codigo}</td>
                  <td>{order.descripcion}</td>
                  <td>{order.cant}</td>
                  <td>
                    {parseInt(order.precio_und).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                  <td>
                    {parseInt(order.valor_total).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="total">
          <h3>
            Total:{" "}
            {parseInt(ordenM.total).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </h3>
        </div>
      </div>

      <div className="enlaces">
        <Link className="regresar-button" to={"/"}>
          Regresar a Home
        </Link>
        <span className="separador"></span>
        <Link className="regresar-button" to={"/orders"}>
          Regresar a Ordenes
        </Link>
      </div>
    </div>
  );
};

export default InfoOrder;
