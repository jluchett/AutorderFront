import api from './api';

export const vehicleService = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/vehicles', { params });
    return data;
  },
  
  getByClient: async (idClient) => {
    const { data } = await api.get(`/vehicles/client/${idClient}`);
    return data;
  },
  
  create: async (vehicleData) => {
    const { data } = await api.post('/vehicles/add', vehicleData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  },
  
  update: async (placa, vehicleData) => {
    const { data } = await api.put(`/vehicles/update/${placa}`, vehicleData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  },
  
  delete: async (placa) => {
    const { data } = await api.delete(`/vehicles/delete/${placa}`);
    return data;
  }
};