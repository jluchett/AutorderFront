// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import useStore from "./store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./styles/App.css";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import AddUser from "./pages/AddUser";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import AddClient from "./pages/AddClient";
import Vehicles from "./pages/Vehicles";
import VehicleDetail from "./pages/VehicleDetail";
import AddVehicle from "./pages/AddVehicle";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import OrderDeatil from "./pages/OrderDeatil";
import AddOrder from "./pages/AddOrder";
//import MyReport from "./pages/MyReport";


const App = () => {
  const { user, login } = useStore();
  // Verificar si ya hay un usuario autenticado en el estado global
  if (!user) {
    // Si no hay un usuario autenticado, intentar recuperar los datos del almacenamiento local
    const storedUser = localStorage.getItem("user");
    // Si hay datos de usuario almacenados, establecerlos en el estado global
    if (storedUser) {
      login(JSON.parse(storedUser));
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/users" element={user ? <Users /> : <Navigate to="/login" />} />
        <Route path="/users/:userId" element={user ? <UserDetail /> : <Navigate to="/login" />} />
        <Route path="/users/add" element={user ? <AddUser /> : <Navigate to="/login" />} />
        <Route path="/clients" element={user ? <Clients/> : <Navigate to="/login" />} />
        <Route path="/clients/:clientId" element={user ? <ClientDetail/> : <Navigate to="/login" />} />
        <Route path="/clients/add" element={user ? <AddClient /> : <Navigate to="/login" />} />
        <Route path="/vehicles" element={user ? <Vehicles/> : <Navigate to="/login" />} />
        <Route path="/vehicles/:vehicPlaca" element={user ? <VehicleDetail/> : <Navigate to="/login" />} />
        <Route path="/vehicles/add" element={user ? <AddVehicle /> : <Navigate to="/login" />} />
        <Route path="/products" element={user ? <Products/> : <Navigate to="/login" />} />
        <Route path="/products/:productId" element={user ? <ProductDetail/> : <Navigate to="/login" />} />
        <Route path="/products/add" element={user ? <AddProduct /> : <Navigate to="/login" />} />
        <Route path="/orders" element={user ? <Orders/> : <Navigate to="/login" />} />
        <Route path="/orders/:idOrden" element={user ? <OrderDeatil/> : <Navigate to="/login" />} />
        <Route path="/orders/add" element={user ? <AddOrder /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
