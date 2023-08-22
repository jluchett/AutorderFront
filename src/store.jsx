// authStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  users: [],
  setUsers: (users) => set({ users }),
  clients: [],
  setClients: (clients) => set({ clients }),
  vehicles: [],
  setVehicles: (vehicles) => set({ vehicles }),
  ipHost: "192.168.1.19",
}));

export default useStore;
