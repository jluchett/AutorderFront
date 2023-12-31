// authStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  ipHost: "192.168.1.18",
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
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
}));

export default useStore;
