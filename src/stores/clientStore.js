import { create } from 'zustand';
import { clientService } from '../services/clientService';

export const useClientStore = create((set, get) => ({
  clients: [],
  isLoading: false,
  error: null,

  fetchClients: async (searchTerm = '') => {
    set({ isLoading: true, error: null });
    try {
      // Normalizamos el término de búsqueda para asegurar una comparación sin problemas de capitalización
      const cleanSearch = searchTerm.trim().toLowerCase();
      const response = await clientService.getAll({ search: cleanSearch });
      set({ clients: response.clients || [], isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al cargar clientes', 
        isLoading: false 
      });
    }
  },

  createClient: async (clientData) => {
    set({ isLoading: true, error: null });
    try {
      await clientService.create(clientData);
      // Recargamos la lista para ver el nuevo cliente
      get().fetchClients(); 
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al crear cliente', 
        isLoading: false 
      });
      return false;
    }
  },

  updateClient: async (id, clientData) => {
    set({ isLoading: true, error: null });
    try {
      await clientService.update(id, clientData);
      get().fetchClients();
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al actualizar cliente', 
        isLoading: false 
      });
      return false;
    }
  },

  deleteClient: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await clientService.delete(id);
      // Actualizamos la lista local eliminando el cliente borrado
      const currentClients = get().clients;
      set({ 
        clients: currentClients.filter(c => c.id !== id),
        isLoading: false 
      });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al eliminar cliente', 
        isLoading: false 
      });
      return false;
    }
  }
}));