// authStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useStore;