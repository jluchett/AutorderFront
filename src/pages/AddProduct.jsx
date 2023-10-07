// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import useStore from "../store";

const initialForm = {
  nombre: "",
  precio: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialForm);
  const [errorMesage, setErrorMesage] = useState("");
  const [succesMesage, setSuccesMesage] = useState("");
  const { ipHost } = useStore();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    setErrorMesage("");
    setSuccesMesage("");
  };

  function validarForm(obj) {
    return Object.values(obj).every((value) => value !== "");
  }

  const handledSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validarForm(product);
    if (!isFormValid) {
      setErrorMesage("Todos los datos son necesarios");
      setSuccesMesage("");
      return;
    }
    // Comprobar aquí si el campo de entrada contiene solo números
    const isNumeric = /^\d+$/.test(product.precio);
    if (!isNumeric) {
      // Muestra un mensaje de error o realiza otra acción en caso de que el campo no contenga solo números
      setErrorMesage("El campo precio debe contener solo números.");
      setSuccesMesage("");
      return;
    }

    fetch(`http://${ipHost}:3001/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: product.nombre,
        precio: product.precio,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.succes
          ? (setSuccesMesage(data.message), setProduct(initialForm))
          : setErrorMesage(data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app">
      <HeaderBar />
      <div className="body">
        <div>
          <div className="info-user">
            <div className="encabezado">
              <div className="user-add">
              <img src="/src/assets/addprod.png" className="imgCli"></img>
              </div>
              <h2>Agregar Producto/Servicio</h2>
            </div>
            <div className="form-add">
              <form>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder=" "
                    required
                    className="input-float"
                    name="nombre"
                    value={product.nombre}
                    onChange={handleChange}
                  />
                  <label className="label-float">Nombre producto o servicio</label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder=" "
                    required
                    className="input-float"
                    name="precio"
                    value={product.precio}
                    onChange={handleChange}
                  />
                  <label className="label-float">Precio producto o servicio</label>
                </div>
                
                {errorMesage && (
                  <span className="error-message">{errorMesage}</span>
                )}
                {succesMesage && (
                  <span className="success-message">{succesMesage}</span>
                )}
                <button className="add-button" onClick={handledSubmit}>
                  Guardar
                </button>
              </form>
            </div>
            <div className="enlaces">
              <Link className="regresar-button" to={"/"}>
                Ir a Home
              </Link>
              <span className="separador"></span>
              <Link className="regresar-button" to={"/products"}>
                Ir a Productos
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
