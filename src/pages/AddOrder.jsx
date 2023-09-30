// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import useStore from "../store";
import { actualClients, actualVehicles, actualProducts } from "../api";

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
  producto_nom: "",
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
const iniProd = {
  id: 0,
  nombre: "",
  precio: 0,
};
const AddOrder = () => {
  const setClients = useStore((state) => state.setClients);
  const clients = useStore((state) => state.clients);
  const vehicles = useStore((state) => state.vehicles);
  const setVehicles = useStore((state) => state.setVehicles);
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);
  //const { ipHost } = useStore();

  const [orderData, setOrderData] = useState(iniOrderData);
  const [detalle, setDetalle] = useState([]);
  const [detalleData, setDetalleData] = useState(iniDetalle);
  const [clienteInfo, setClienteInfo] = useState(iniClientInfo);
  const [vehiclesInfo, setVehiclesInfo] = useState([iniVehicle]);
  const [vehicleInfo, setVehicleInfo] = useState([iniVehicle]);
  const [infoProd, setInfoProd] = useState(iniProd);

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
    const getProds = async () => {
      const data = await actualProducts();
      setProducts(data);
    };
    getProds();
  }, [setClients, setProducts, setVehicles]);

  const buscarCliente = () => {
    const { id_cliente } = orderData; // Obtén el ID del cliente desde el estado de datos de orden
    const client = clients.find((cli) => cli.id === id_cliente); //filtramos el cliente del store
    client ? setClienteInfo(client) : setClienteInfo(iniClientInfo);
    const vehiClient = vehicles.filter(
      (vehicle) => vehicle.cliente_id === id_cliente
    );
    vehiClient ? setVehiclesInfo(vehiClient) : setVehiclesInfo(iniVehicle);
  };

  const buscarProd = () => {
    const dataProd = products.find(
      (prod) => prod.id === parseInt(detalleData.producto_id)
    );
    if(dataProd){
      setInfoProd(dataProd)
      
      setDetalleData({ ...detalleData, ["precio_unitario"]: dataProd.precio, ["producto_nom"]: dataProd.nombre})
      
    }else {
      setInfoProd(iniProd)
    }
    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({ ...orderData, [name]: value });
    setClienteInfo(iniClientInfo);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
    const selectedVehic = vehiclesInfo.find((vehic) => vehic.placa === value);
    selectedVehic ? setVehicleInfo(selectedVehic) : setVehicleInfo(iniVehicle);
  };

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
      setInfoProd(iniProd)
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
          {vehiclesInfo.map((vehi) => (
            <option key={vehi.placa} value={vehi.placa}>
              {vehi.placa}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>
          <label>Marca: {vehicleInfo.marca}</label>
        </div>
        <div>
          <label>Modelo: {vehicleInfo.modelo}</label>
        </div>
        <div>
          <label>Kms anterior: {vehicleInfo.kilometraje}</label>
        </div>
        <div>
          <label>Kms actual: </label>
          <input type="text" />
        </div>
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
          <button onClick={buscarProd}>Buscar</button>
        </div>
        <div>
          <label>Descripcion:</label>
          <input
            type="text"
            name="nombre"
            value={infoProd.nombre}
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
            value={infoProd.precio}
            onChange={handleDetailInputChange}
          />
        </div>
        <button onClick={handleAddDetail}>Agregar Detalle</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripcion</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {detalle.map((item, index) => (
              <tr key={index}>
                <td>{item.producto_id}</td>
                <td>{item.producto_nom}</td>
                <td>{item.cantidad}</td>
                <td>{item.precio_unitario}</td>
                <td>{item.precio_unitario * item.cantidad}</td>
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
