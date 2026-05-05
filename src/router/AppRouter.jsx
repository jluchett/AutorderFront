import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Layout } from '../components/Layout/Layout';
import Login from '../pages/Login/Login';
import Clientes from '../pages/Clientes/Clientes';
import Vehiculos from '../pages/Vehiculos/Vehiculos';
import Productos from '../pages/Productos/Productos';
import Ordenes from '../pages/Ordenes/Ordenes';
import Usuarios from '../pages/Usuarios/Usuarios';
import Dashboard from '../pages/Dashboard/Dashboard';

// Componentes temporales para visualizar la navegación
const Unauthorized = () => <div><h1>No tienes permisos para ver esta página</h1></div>;

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/login" element={<Login />} />
      
      {/* Rutas Privadas */}
      <Route element={<PrivateRoute />}>
        {/* Envolvemos las rutas en el Layout principal */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ordenes" element={<Ordenes />} />
          
          {/* Ejemplo de ruta súper protegida: Solo el Admin puede entrar aquí */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/usuarios" element={<Usuarios />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};