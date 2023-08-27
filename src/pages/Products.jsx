// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../store";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import { actualProducts } from "../api";

const Products = () => {
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);
  const { ipHost } = useStore();

  const [filterValue, setFilterValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const getProds = async () => {
      const data = await actualProducts();
      setProducts(data);
    };
    getProds();
  }, [setProducts]);

  useEffect(() => {
    // Filter products based on the filterValue (product nombre)
    const filtered = products.filter((product) => {
      return product.nombre.toLowerCase().includes(filterValue.toLowerCase());
    });

    setFilteredProducts(filtered);
  }, [products, filterValue]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(filteredProducts.length / productsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

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
        setProducts(data);
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
              <i className="fa-solid fa-store"></i>
            </div>
            <h2>Productos</h2>
          </div>
          <div className="filter">
            <label htmlFor="">Busqueda: </label>
            <input
              type="text"
              placeholder="Digite nombre del producto o servicio"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
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
                {currentProducts.map((product) => (
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
          <section className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredProducts.length / productsPerPage)
              }
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </section>
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
