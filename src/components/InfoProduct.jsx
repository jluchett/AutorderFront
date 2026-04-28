import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiClient } from "../services/apiClient";
import useStore from "../store.jsx";
import "../styles/AddProduct.css";
import "../styles/InfoUser.css";

const InfoProduct = () => {
  const products = useStore((state) => state.products);
  const { productId } = useParams();
  const idEntero = parseInt(productId);
  const product = products.find((prod) => prod.id === idEntero);
  const [datos, setDatos] = useState(product);
  const [editingProduct, setEditingProduct] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (datos.nombre === "" || datos.precio === "") {
      setErrorMessage("Los datos no pueden estar vacios");
      return;
    }
    // Lógica para guardar nuevos datos en la base de datos
    try {
      const data = await apiClient.put(`/products/update/${product.id}`, datos);
      if (data.success) {
        setSuccessMessage("Datos actualizados");
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Error al actualizar producto");
        setSuccessMessage("");
      }
      setEditingProduct(false);
    } catch (error) {
      setErrorMessage(error.message || "Error al actualizar producto");
      setSuccessMessage("");
      console.error(error);
    }
  };

  const handleEditProd = () => {
    setEditingProduct(true);
    setSuccessMessage("");
  };

  const handleCancelEdit = () => {
    setEditingProduct(false);
    setDatos(product);
  };
  return (
    <div className="body">
      <div className="users-page">
        <div className="info-user">
          <h2>Datos del producto</h2>
          <div className="product-details">
            <div className="client-image">
              <i className="fa-solid fa-store"></i>
            </div>
            <div className="product-data">
              <label>ID: </label>
              <span>{datos.id}</span>
              <div>
                <label>Nombre: </label>
                <span>{datos.nombre}</span>
              </div>
              <label>Precio: </label>
              <span>
                {parseInt(datos.precio).toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })}
              </span>
            </div>
          </div>
          <div>
            {editingProduct ? (
              <div>
                <div className="form-conte">
                  <form>
                    <br />
                    <div className="input-container">
                      <input
                        className="input-float"
                        placeholder=" "
                        type="text"
                        name="nombre"
                        value={datos.nombre}
                        onChange={handleChange}
                      />
                      <label className="label-float">Nombre</label>
                    </div>
                    <div className="input-container">
                      <input
                        placeholder=" "
                        className="input-float"
                        type="text"
                        name="precio"
                        value={datos.precio}
                        onChange={handleChange}
                      />
                      <label className="label-float">Precio</label>
                    </div>

                    {errorMessage && (
                      <span className="error-message">{errorMessage}</span>
                    )}
                    <button onClick={handleSaveProduct} className="add-button">
                      Guardar
                    </button>
                    <button onClick={handleCancelEdit} className="add-button">
                      Cancelar
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="name-display">
                <button onClick={handleEditProd}>Modificar datos</button>
              </div>
            )}
            {successMessage && (
              <span className="success-message">{successMessage}</span>
            )}
          </div>
        </div>
      </div>

      <div className="enlaces">
        <Link className="regresar-button" to={"/"}>
          Regresar a Home
        </Link>
        <span className="separador"></span>
        <Link className="regresar-button" to={"/products"}>
          Regresar a Productos
        </Link>
      </div>
    </div>
  );
};

export default InfoProduct;
