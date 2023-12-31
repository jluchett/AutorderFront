// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Body.css";

const Body = () => {
  const navigate = useNavigate();

  const goToUsers = () => {
    navigate("/users");
  };

  const goToClients = () => {
    navigate("/clients");
  };

  const goToVehicles = () =>{
    navigate("/vehicles")
  }

  const goToProducts = () =>{
    navigate("/products")
  }

  const goToOrders = () => {
    navigate("/orders")
  }
  return (
    <div className="body">
      <div className="pages">
        <button className="btn-action" onClick={goToOrders}>
          <i className="fa-solid fa-car"></i>
          <span> </span>
          <i className="fa-solid fa-screwdriver-wrench"></i>
          <p></p>
          Ordenes
        </button>
        <button className="btn-action" onClick={goToClients}>
          <i className="fa-solid fa-id-card"></i>
          <p></p>
          Clientes
        </button>
        <button className="btn-action" onClick={goToVehicles}>
          <i className="fa-solid fa-car-side"></i>
          <p></p>
          Vehiculos
        </button>
        <button className="btn-action" onClick={goToUsers}>
          <i className="fa-solid fa-circle-user"></i>
          <p></p>
          Usuarios
        </button>
        <button className="btn-action"  onClick={goToProducts}>
        <i className="fa-solid fa-store"></i>
          <p></p>
          Productos
        </button>
      </div>
    </div>
  );
};

export default Body;
