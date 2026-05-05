import { create } from 'zustand';
import { orderService } from '../services/orderService';

export const useDashboardStore = create((set) => ({
  stats: null,
  topProducts: [],
  topClients: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async (startDate, endDate) => {
    set({ isLoading: true, error: null });
    try {
      const params = { startDate, endDate };
      
      // Ejecutamos las 3 peticiones al mismo tiempo
      const [statsRes, productsRes, clientsRes] = await Promise.all([
        orderService.getStats(params),
        orderService.getTopProducts(params),
        orderService.getTopClients(params)
      ]);

      set({ 
        stats: statsRes.stats, 
        topProducts: productsRes.report || [], 
        topClients: clientsRes.report || [],
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar los datos del dashboard', isLoading: false });
    }
  }
}));