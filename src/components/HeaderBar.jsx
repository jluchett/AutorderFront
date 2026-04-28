// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import '../styles/HeaderBar.css'

const HeaderBar = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src="/src/assets/LogoH.png" alt="Logo de la empresa" />
          </div>
          
          {/* Botón hamburguesa (solo móvil) */}
          <button 
            className="menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Información de usuario (desktop) */}
          <div className="user-info desktop-only">
            <div className="avatar">
              <i className="fa-solid fa-user"></i>
            </div>
            <p className="user-name">{user.name}</p>
            <button className="logout-button" onClick={handleLogout}>
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
      
      <nav className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h3>Menú</h3>
          <button 
            className="close-button"
            onClick={closeMobileMenu}
            aria-label="Cerrar menú"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        
        <div className="mobile-menu-content">
          <div className="mobile-user-info">
            <div className="avatar">
              <i className="fa-solid fa-user"></i>
            </div>
            <p className="user-name">{user.name}</p>
          </div>
          
          <hr />
          
          <button className="logout-button mobile" onClick={handleLogout}>
            <i className="fa-solid fa-sign-out-alt"></i>
            Salir
          </button>
        </div>
      </nav>
    </>
  );
};

export default HeaderBar;

