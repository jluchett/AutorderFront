import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (id, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(id, password);
      // Tu backend devuelve { success: true, message: "...", user: {...} }
      if (response.success && response.user) {
        localStorage.clear();
        set({ user: response.user, isAuthenticated: true, isLoading: false });
        return true;
      }
      throw new Error("Respuesta inválida del servidor");
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al iniciar sesión', 
        isLoading: false 
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      localStorage.clear(); 
      set({ user: null, isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await authService.checkAuth();
      // Validamos estrictamente que la respuesta tenga el formato de tu backend
      if (response.success && response.user) {
        set({ user: response.user, isAuthenticated: true, isLoading: false });
      } else {
        throw new Error("Sesión no válida");
      }
    } catch (error) {
      console.error('Error en checkAuth:', error);
      localStorage.clear();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  }
}));