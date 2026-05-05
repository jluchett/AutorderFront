import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import styles from './Layout.module.css';

export const Layout = () => {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Dashboard', roles: ['admin', 'ventas', 'mecanico'] },
    { path: '/ordenes', label: 'Órdenes', roles: ['admin', 'ventas', 'mecanico'] },
    { path: '/clientes', label: 'Clientes', roles: ['admin', 'ventas', 'mecanico'] },
    { path: '/vehiculos', label: 'Vehículos', roles: ['admin', 'ventas', 'mecanico'] },
    { path: '/productos', label: 'Productos', roles: ['admin', 'ventas'] },
    { path: '/usuarios', label: 'Usuarios', roles: ['admin'] },
  ];

  const allowedMenuItems = menuItems.filter(item => item.roles.includes(user?.role));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={styles.layout}>
      {/* Cabecera Móvil (Solo visible en pantallas pequeñas) */}
      <div className={styles.mobileHeader}>
        <div className={styles.brand}>AUTORDER</div>
        <button className={styles.menuButton} onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Barra Lateral / Menú Desplegable */}
      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={`${styles.brand} ${styles.desktopOnly}`}>
          AUTORDER
        </div>
        
        <div className={styles.userInfo}>
          <div className={styles.userName}>{user?.name}</div>
          <div className={styles.userRole}>{user?.role}</div>
        </div>

        <nav className={styles.nav}>
          {allowedMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu} // Cierra el menú al navegar en móvil
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button onClick={logout} className={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </aside>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};