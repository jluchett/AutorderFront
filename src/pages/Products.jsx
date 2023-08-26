// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../store";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { actualProducts } from "../api";

const Products = () => {
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);
  const { ipHost } = useStore();

  useEffect(() => {
    const getClients = async () => {
      const data = await actualProducts();
      setProducts(data);
    };
    getClients();
  }, [setProducts]);

  const deleteProduct = async (clientId) => {
    // Lógica para eliminar un producto de la base de datos
    try {
      const confirmed = window.confirm(
        "¿Estás seguro de que deseas eliminar este Producto?"
      );
      if (confirmed) {
        await fetch(`http://${ipHost}:3001/products/delete/${clientId}`, {
          method: "DELETE",
        });
        // Actualizar el estado "products" eliminando el producto del estado
        const data = await actualProducts();
        actualProducts(data);
      }
    } catch (error) {
      console.log("Error al eliminar producto:", error);
    }
  };

  return (
    <main className="app">
      <HeaderBar />
      <div className="body">
        <div className="users-page">
          <div className="encabezado">
            <div className="client">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <h2>Productos</h2>
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
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nombre}</td>
                    <td className="actions">
                      <Link to={`/products/${product.id}`}>
                        <button className="edit">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button
                        className="delete"
                        onClick={() => deleteProduct(product.id)}
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
            Agregar Producto
          </Link>
          <Link className="regresar-button" to={"/"}>
            Ir a Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Products;
