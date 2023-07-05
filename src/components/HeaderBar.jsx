// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import '../styles/HeaderBar.css'

const HeaderBar = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/src/assets/LogoH.png" alt="Logo de la empresa" />
      </div>
      <div className="user-info">
        <div className="avatar">
          <i className="fa-solid fa-user"></i>
        </div>
        <p className="user-name">{user.name}</p>
        <button className="logout-button" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;

