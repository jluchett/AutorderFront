//componente Body.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import '../styles/Body.css'

const Body = () => {
  return (
    <div className="body">
      <div className="pages">
        <button className="btn-action">
          <i className="fa-solid fa-car"></i>
          <span> </span>
          <i className="fa-solid fa-screwdriver-wrench"></i>
          <p></p>
          Ordenes
        </button>
        <button className="btn-action">
          <i className="fa-solid fa-id-card"></i>
          <p></p>
          Clientes
        </button>
        <button className="btn-action">
          <i className="fa-solid fa-car-side"></i>
          <p></p>
          Vehiculos
        </button>
        <button className="btn-action">
          <i className="fa-solid fa-circle-user"></i>
          <p></p>
          Usuarios
        </button>
      </div>
    </div>
  );
};

export default Body;
