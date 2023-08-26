// authStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  ipHost: "172.37.131.193",
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
}));

export default useStore;
