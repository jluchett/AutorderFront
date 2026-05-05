import { create } from 'zustand';
import { userService } from '../services/userService';

export const useUserStore = create((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await userService.getAll();
      // Tu backend devuelve directamente un array en result.rows, pero el controlador
      // normalmente lo envuelve. Asumimos que llega como un array o en una propiedad.
      // Revisa si es response o response.users
      set({ users: Array.isArray(response) ? response : response.users || [], isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar usuarios', isLoading: false });
    }
  },

  createUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      await userService.create(userData);
      get().fetchUsers();
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al crear usuario', isLoading: false });
      return false;
    }
  },

  updateUser: async (id, userData) => {
    set({ isLoading: true, error: null });
    try {
      await userService.update(id, userData);
      get().fetchUsers();
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al actualizar usuario', isLoading: false });
      return false;
    }
  },

  toggleLockStatus: async (id, currentStatus) => {
    set({ isLoading: true, error: null });
    try {
      await userService.toggleLock(id, !currentStatus);
      get().fetchUsers();
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cambiar estado del usuario', isLoading: false });
      return false;
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await userService.delete(id);
      const currentUsers = get().users;
      set({ users: currentUsers.filter(u => u.id !== id), isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al eliminar usuario', isLoading: false });
      return false;
    }
  }
}));