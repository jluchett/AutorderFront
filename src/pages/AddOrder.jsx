// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import useStore from "../store";
import { actualClients, actualVehicles } from "../api";

const iniOrderData = {
  fecha_orden: "",
  id_cliente: "",
  placa_vehic: "",
  total_orden: 0,
};
const iniDetalle = {
  producto_id: "",
  cantidad: 0,
  precio_unitario: 0,
};
const iniClientInfo = {
  nombre: "",
  telefono: "",
  email: "",
};
const iniVehicle = {
  placa: "",
  marca: "",
  modelo: "",
  kilometraje: 0,
  cliente_id: "",
};
const AddOrder = () => {
  const setClients = useStore((state) => state.setClients);
  const clients = useStore((state) => state.clients);
  const vehicles = useStore((state) => state.vehicles);
  const setVehicles = useStore((state) => state.setVehicles);
  const [orderData, setOrderData] = useState(iniOrderData);
  const [detalle, setDetalle] = useState([]);
  const [detalleData, setDetalleData] = useState(iniDetalle);
  const [clienteInfo, setClienteInfo] = useState(iniClientInfo);
  const [vehicleInfo, setVehicleInfo] = useState([iniVehicle]);

  useEffect(() => {
    const getClients = async () => {
      const data = await actualClients();
      setClients(data);
    };
    getClients();
    const getVehicles = async () => {
      const data = await actualVehicles();
      setVehicles(data);
    };
    getVehicles();
  }, [setClients, setVehicles]);

  const buscarCliente = () => {
    const { id_cliente } = orderData; // Obtén el ID del cliente desde el estado de datos de orden
    const client = clients.find((cli) => cli.id === id_cliente); //filtramos el cliente del store
    client ? setClienteInfo(client) : setClienteInfo(iniClientInfo);
    const vehiClient = vehicles.filter(
      (vehicle) => vehicle.cliente_id === id_cliente
    );
    vehiClient ? setVehicleInfo(vehiClient) : setVehicleInfo(iniVehicle);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({ ...orderData, [name]: value });
    setClienteInfo(iniClientInfo);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value })
  }

  const handleDetailInputChange = (event) => {
    const { name, value } = event.target;
    setDetalleData({ ...detalleData, [name]: value });
  };

  const handleAddDetail = () => {
    if (
      detalleData.producto_id &&
      detalleData.cantidad > 0 &&
      detalleData.precio_unitario > 0
    ) {
      setDetalle([...detalle, detalleData]);
      setDetalleData(iniDetalle);
    }
  };

  const handleSubmit = () => {
    const orderToSend = {
      ...orderData,
      detalle: [...detalle],
    };
    // Realiza la solicitud POST al backend con orderToSend y maneja la respuesta.
    // Añade aquí tu lógica de solicitud al servidor.
    console.log("Orden a enviar:", orderToSend);

    // Limpia el estado después de enviar la orden.
    setOrderData(iniOrderData);
    setDetalle([]);
    setDetalleData(iniDetalle);
  };
  return (
    <div>
      <h1>Crear Orden</h1>
      <div>
        <label>Fecha de la Orden:</label>
        <input
          type="date"
          name="fecha_orden"
          value={orderData.fecha_orden}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>ID del Cliente:</label>
        <input
          type="text"
          name="id_cliente"
          value={orderData.id_cliente}
          onChange={handleInputChange}
        />
        <button onClick={buscarCliente}>Buscar</button>
      </div>
      <div>
        <div>
          <div>
            <label>Nombre: {clienteInfo.nombre}</label>
          </div>
          <div>
            <label>Teléfono: {clienteInfo.telefono}</label>
          </div>
          <div>
            <label>Dirección: {clienteInfo.email}</label>
          </div>
        </div>
      </div>
      
      <div>
        <label>Placa del Vehículo:</label>
        <select
          name="placa_vehic"
          value={orderData.placa_vehic}
          onChange={handleSelectChange}
        >
          <option value="">Selecciona una placa</option>
          {vehicleInfo.map((vehi) => (
            <option key={vehi.placa} value={vehi.placa}>
              {vehi.placa}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Detalle de la Orden</h2>
        <div>
          <label>ID del Producto:</label>
          <input
            type="text"
            name="producto_id"
            value={detalleData.producto_id}
            onChange={handleDetailInputChange}
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={detalleData.cantidad}
            onChange={handleDetailInputChange}
          />
        </div>
        <div>
          <label>Precio Unitario:</label>
          <input
            type="number"
            name="precio_unitario"
            value={detalleData.precio_unitario}
            onChange={handleDetailInputChange}
          />
        </div>
        <button onClick={handleAddDetail}>Agregar Detalle</button>
        <table>
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            {detalle.map((item, index) => (
              <tr key={index}>
                <td>{item.producto_id}</td>
                <td>{item.cantidad}</td>
                <td>{item.precio_unitario}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <label>Total de la Orden:</label>
          <input
            type="number"
            name="total_orden"
            value={orderData.total_orden}
          />
        </div>
      </div>
      <button onClick={handleSubmit}>Crear Orden</button>
    </div>
  );
};

export default AddOrder;
