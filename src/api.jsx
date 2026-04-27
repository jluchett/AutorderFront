/**
 * Funciones API - Usar apiClient centralizado
 * Todas las llamadas pasan por un único servicio
 */

import { apiClient, ApiError } from "./services/apiClient";

/**
 * Obtiene lista de usuarios
 */
export const actualUsers = async () => {
  try {
    const data = await apiClient.get("/users/");
    return data.users || [];
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

/**
 * Obtiene lista de clientes
 */
export const actualClients = async () => {
  try {
    const data = await apiClient.get("/clients/");
    return data.clients || [];
  } catch (error) {
    console.error("Error fetching clients:", error.message);
    throw error;
  }
};

/**
 * Obtiene lista de vehículos
 */
export const actualVehicles = async () => {
  try {
    const data = await apiClient.get("/vehicles/");
    return data.vehicles || [];
  } catch (error) {
    console.error("Error fetching vehicles:", error.message);
    throw error;
  }
};

/**
 * Obtiene lista de productos
 */
export const actualProducts = async () => {
  try {
    const data = await apiClient.get("/products/");
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

/**
 * Obtiene lista de órdenes
 */
export const actualOrders = async () => {
  try {
    const data = await apiClient.get("/orders/");
    return data.orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};

/**
 * Obtiene detalles de una orden específica
 */
export const actualDetalle = async (idOrder) => {
  try {
    const data = await apiClient.get(`/orders/detail/${idOrder}`);
    return data.detalle || [];
  } catch (error) {
    console.error("Error fetching order detail:", error.message);
    throw error;
  }
};

/**
 * Realiza login - Centralizado con validaciones
 * Guarda el token en localStorage para todas las requests posteriores
 */
export const loginUser = async (id, password) => {
  try {
    const response = await apiClient.post("/auth/login", { id, password });
    
    // El backend retorna { user, token } o { user: {..., token } }
    let user = response.user;
    let token = response.token;

    // Si el token viene dentro del user, extraerlo
    if (user && user.token && !token) {
      token = user.token;
    }

    // Asegurar que el usuario tenga el token
    if (user && token) {
      user.token = token;
    }

    // Guardar usuario (con token incluido)
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    // Guardar token también directamente (para acceso rápido)
    if (token) {
      apiClient.setAuthToken(token);
    }

    return user || response;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

/**
 * Añade un nuevo usuario
 */
export const addUser = async (userData) => {
  try {
    const data = await apiClient.post("/users/", userData);
    return data;
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error;
  }
};

/**
 * Actualiza un usuario existente
 */
export const updateUser = async (userId, userData) => {
  try {
    const data = await apiClient.put(`/users/${userId}`, userData);
    return data;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

/**
 * Obtiene detalles de un usuario
 */
export const getUserDetail = async (userId) => {
  try {
    const data = await apiClient.get(`/users/${userId}`);
    return data;
  } catch (error) {
    console.error("Error fetching user detail:", error.message);
    throw error;
  }
};

/**
 * Manejo de errores de API para mostrar en UI
 */
export const getErrorMessage = (error) => {
  try {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        return "Credenciales inválidas";
      }
      if (error.status === 403) {
        return "No tienes permisos para esto";
      }
      if (error.status === 404) {
        return "Recurso no encontrado";
      }
      if (error.status === 408) {
        return "La solicitud tardó demasiado. Intenta de nuevo";
      }
      if (error.status === 500) {
        return "Error en el servidor. Intenta más tarde";
      }
      return error.message || "Error desconocido";
    }
    return error.message || "Error desconocido";
    
  } catch (error) {
    console.log("Error fetching products", error);
    return [];
  }
}

/**
 * Obtiene detalles de un vehículo
 */
export const getVehicleDetails = async (placa) => {
  try {
    const data = await apiClient.get(`/vehicles/${placa}`);
    return data || {};
  } catch (error) {
    console.error("Error fetching vehicle details:", error.message);
    throw error;
  }
};

/**
 * Actualiza un vehículo
 */
export const updateVehicle = async (placa, vehicleData) => {
  try {
    const data = await apiClient.put(`/vehicles/update/${placa}`, vehicleData);
    return data;
  } catch (error) {
    console.error("Error updating vehicle:", error.message);
    throw error;
  }
};

/**
 * Elimina un vehículo
 */
export const deleteVehicle = async (placa) => {
  try {
    const data = await apiClient.delete(`/vehicles/delete/${placa}`);
    return data;
  } catch (error) {
    console.error("Error deleting vehicle:", error.message);
    throw error;
  }
};