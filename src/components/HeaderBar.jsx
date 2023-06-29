// eslint-disable-next-line no-unused-vars
import React from 'react'
import '../styles/HeaderBar.css'

const HeaderBar = ( user, onLogout ) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/path/to/logo.png" alt="Logo de la empresa" />
      </div>
      <div className="user-info">
        <div className="avatar">
          <img src="/path/to/avatar.png" alt="Avatar del usuario" />
        </div>
        <div className="user-details">
          <p className="user-name">{user.name}</p>
          <button className="logout-button" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderBar