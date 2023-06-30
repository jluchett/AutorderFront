//componente HeaderBar.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import "../styles/HeaderBar.css";

const HeaderBar = (user, onLogout) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/src/assets/LogoH.png" alt="Logo de la empresa" />
      </div>
      <div className="user-info">
        <div className="avatar">
          <i className="fa-solid fa-user"></i>
          
        </div>
        <p className="user-name">Jorge Luchetta</p>
        <button className="logout-button" onClick={onLogout}>
          Salir
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;
