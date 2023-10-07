// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../store";
import { actualClients, actualVehicles, actualProducts } from "../api";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import "../styles/AddOrder.css";

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
  const { ipHost } = useStore();
  const [errorMesage, setErrorMesage] = useState("");
  const [succesMesage, setSuccesMesage] = useState("");
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
    getFecha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setClients, setProducts, setVehicles]);

  const getFecha = () => {
    const fechaAct = new Date();
    const fechaFormato = fechaAct.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setOrderData({ ...orderData, fecha_orden: fechaFormato });
  };
  const buscarCliente = () => {
    const { id_cliente } = orderData; // Obtén el ID del cliente desde el estado de datos de orden
    const client = clients.find((cli) => cli.id === id_cliente); //filtramos el cliente del store
    client ? setClienteInfo(client) : setClienteInfo(iniClientInfo);
    const vehiClient = vehicles.filter(
      (vehicle) => vehicle.cliente_id === id_cliente
    );
    vehiClient ? setVehiclesInfo(vehiClient) : setVehiclesInfo(iniVehicle);
    getFecha();
  };

  const buscarProd = () => {
    const dataProd = products.find(
      (prod) => prod.id === parseInt(detalleData.producto_id)
    );
    if (dataProd) {
      setInfoProd(dataProd);

      setDetalleData({
        ...detalleData,
        ["precio_unitario"]: dataProd.precio,
        ["producto_nom"]: dataProd.nombre,
      });
    } else {
      setInfoProd(iniProd);
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
      setInfoProd(iniProd);
      const acu = orderData.total_orden;
      const subTotal = parseInt(
        detalleData.precio_unitario * detalleData.cantidad
      );
      const total = acu + subTotal;
      setOrderData({ ...orderData, ["total_orden"]: total });
    }
  };

  function validarObj(obj) {
    return Object.values(obj).every((value) => value !== "");
  }

  function validarArrayDeObjetos(arr) {
    if (arr.length === 0) {
      return false; // Si el array está vacío, considerarlo inválido
    }

    for (const obj of arr) {
      for (const value of Object.values(obj)) {
        if (value === "") {
          return false; // Si se encuentra un valor vacío, el array no es válido
        }
      }
    }
    return true; // Si no se encontraron valores vacíos en ningún objeto, el array es válido
  }

  const handleSubmit = () => {
    getFecha();
    const isMainValid = validarObj(orderData);
    if (!isMainValid) {
      setErrorMesage("Todos los datos son necesarios");
      setSuccesMesage("");
      return;
    }
    const isDetValid = validarArrayDeObjetos(detalle);
    if (!isDetValid) {
      setErrorMesage("Debe agregar por lo menos un producto");
      setSuccesMesage("");
      return;
    }

    const orderToSend = {
      ...orderData,
      detalle: [...detalle],
    };

    // Realiza la solicitud POST al backend con orderToSend y maneja la respuesta.
    fetch(`http://${ipHost}:3001/orders/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        data.succes
          ? setSuccesMesage(data.message)
          : setErrorMesage(data.message);
      })
      .catch((error) => {
        console.log(error);
      });
    // Añade aquí tu lógica de solicitud al servidor.
    console.log("Orden a enviar:", orderToSend);

    // Limpia el estado después de enviar la orden.
    setOrderData(iniOrderData);
    setDetalle([]);
    setDetalleData(iniDetalle);
    setClienteInfo(iniClientInfo);
    setVehicleInfo(iniVehicle);
    setVehiclesInfo([iniVehicle]);
  };
  return (
    <main className="app">
      <HeaderBar />
      <article className="container-addor">
        <div className="wrap-addor">
          <div className="encabezado">
            <div className="user-add">
              <i className="fa-solid fa-file-circle-plus"></i>
            </div>
            <h2>Crear Orden</h2>
          </div>
          <div>
            <label>Fecha de la Orden: {orderData.fecha_orden}</label>
          </div>
          <section className="addor-data">
            <div className="addor-input">
              <label>ID del Cliente:</label>
              <input
                type="text"
                name="id_cliente"
                value={orderData.id_cliente}
                onChange={handleInputChange}
              />
              <button onClick={buscarCliente}>Buscar</button>
            </div>
            <div className="addor-input rs1-addor-input">
              <label>Nombre: {clienteInfo.nombre}</label>
            </div>
            <div className="addor-input rs1-addor-input">
              <label>Teléfono: {clienteInfo.telefono}</label>
            </div>
            <div className="addor-input">
              <label>Dirección: {clienteInfo.email}</label>
            </div>
          </section>
          <section className="addor-data">
            <div className="addor-input">
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
            <div className="addor-input rs1-addor-input">
              <label>Marca: {vehicleInfo.marca}</label>
            </div>
            <div className="addor-input rs1-addor-input">
              <label>Modelo: {vehicleInfo.modelo}</label>
            </div>
            <div className="addor-input rs1-addor-input">
              <label>Kms anterior: {vehicleInfo.kilometraje}</label>
            </div>
            <div className="addor-input rs1-addor-input">
              <label>Kms actual: </label>
              <input type="text" />
            </div>
          </section>

          <section className="addor-data">
            <h1>Detalle de la Orden</h1>
            <div className="addor-input">
              <label>ID del Producto:</label>
              <input
                type="text"
                name="producto_id"
                value={detalleData.producto_id}
                onChange={handleDetailInputChange}
              />
              <button onClick={buscarProd}>Buscar</button>
            </div>
            <div className="addor-input rs1-addor-input">
              <label>Descripcion: {infoProd.nombre}</label>
            </div>
            <div className="addor-input rs1-addor-input">
              <label>Precio Unitario: {infoProd.precio}</label>
              
            </div>
            <div className="addor-input rs1-addor-input">
              <label>Cantidad:</label>
              <input
                type="number"
                name="cantidad"
                value={detalleData.cantidad}
                onChange={handleDetailInputChange}
              />
            </div>
            <div className="addor-input rs1-addor-input">
              <button onClick={handleAddDetail}>Agregar Detalle</button>
            </div>
            <div className="table-container-order">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Descripcion</th>
                    <th>Cant</th>
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
                      <td>
                        {parseInt(item.precio_unitario).toLocaleString(
                          "es-CO",
                          {
                            style: "currency",
                            currency: "COP",
                            maximumFractionDigits: 0,
                          }
                        )}
                      </td>
                      <td>
                        {(
                          parseInt(item.precio_unitario) *
                          parseInt(item.cantidad)
                        ).toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="addor-input">
              <label>
                Total de la Orden:{" "}
                {orderData.total_orden.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  maximumFractionDigits: 0,
                })}
              </label>
            </div>
            {errorMesage && (
              <span className="error-message">{errorMesage}</span>
            )}
            {succesMesage && (
              <span className="success-message">{succesMesage}</span>
            )}
            <div></div>
          </section>

          <button onClick={handleSubmit}>Crear Orden</button>
          <div className="enlaces">
            <Link className="regresar-button" to={"/"}>
              Ir a Home
            </Link>
            <span className="separador"></span>
            <Link className="regresar-button" to={"/orders"}>
              Ir a Ordenes
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default AddOrder;
