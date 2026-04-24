// authStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  // ========== Autenticación ==========
  user: null,
  login: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    set({ user: null });
  },

  // ========== Estado de Carga y Errores ==========
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
  success: null,
  setSuccess: (success) => set({ success }),

  // ========== Datos Globales ==========
  users: [],
  setUsers: (users) => set({ users }),

  clients: [],
  setClients: (clients) => set({ clients }),

  vehicles: [],
  setVehicles: (vehicles) => set({ vehicles }),

  products: [],
  setProducts: (products) => set({ products }),

  orders: [],
  setOrders: (orders) => set({ orders }),

  // ========== Utilidades ==========
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}));

export default useStore;
