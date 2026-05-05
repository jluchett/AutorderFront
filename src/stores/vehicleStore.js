import { create } from 'zustand';
import { vehicleService } from '../services/vehicleService';

export const useVehicleStore = create((set, get) => ({
  vehicles: [],
  isLoading: false,
  error: null,
  vehiclesByClient: [],

  fetchVehicles: async (searchTerm = '') => {
    set({ isLoading: true, error: null });
    try {
      const cleanSearch = searchTerm.trim().toLowerCase();
      const response = await vehicleService.getAll({ search: cleanSearch });
      set({ vehicles: response.vehicles || [], isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar vehículos', isLoading: false });
    }
  },

  fetchVehiclesByClient: async (idClient) => {
    if (!idClient) {
      set({ vehiclesByClient: [] });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const response = await vehicleService.getByClient(idClient);
      set({ vehiclesByClient: response.vehiclesClient || [], isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar vehículos del cliente', isLoading: false });
    }
  },

  createVehicle: async (vehicleData) => {
    set({ isLoading: true, error: null });
    try {
      await vehicleService.create(vehicleData);
      get().fetchVehicles();
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al crear vehículo', isLoading: false });
      return false;
    }
  },

  updateVehicle: async (placa, vehicleData) => {
    set({ isLoading: true, error: null });
    try {
      await vehicleService.update(placa, vehicleData);
      get().fetchVehicles();
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al actualizar vehículo', isLoading: false });
      return false;
    }
  },

  deleteVehicle: async (placa) => {
    set({ isLoading: true, error: null });
    try {
      await vehicleService.delete(placa);
      const currentVehicles = get().vehicles;
      set({ vehicles: currentVehicles.filter(v => v.placa !== placa), isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al eliminar vehículo', isLoading: false });
      return false;
    }
  }
}));