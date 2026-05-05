import { create } from 'zustand';
import { orderService } from '../services/orderService';

export const useOrderStore = create((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async (searchTerm = '') => {
    set({ isLoading: true, error: null });
    try {
      const cleanSearch = searchTerm.trim().toLowerCase();
      const response = await orderService.getAll({ search: cleanSearch });
      set({ orders: response.orders || [], isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar órdenes', isLoading: false });
    }
  },

  getOrderDetail: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await orderService.getDetail(id);
      set({ isLoading: false });
      return response; // Devolvemos el detalle para que el componente lo use
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar detalle de orden', isLoading: false });
      return null;
    }
  },

  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      await orderService.create(orderData);
      get().fetchOrders(); // Recarga la tabla
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al crear orden', isLoading: false });
      return false;
    }
  },

  deleteOrder: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await orderService.delete(id);
      const currentOrders = get().orders;
      set({ orders: currentOrders.filter(o => o.orden_id !== id), isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al eliminar orden', isLoading: false });
      return false;
    }
  }
}));