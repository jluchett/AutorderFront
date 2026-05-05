import api from './api';

export const clientService = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/clients', { params });
    return data;
  },
  
  create: async (clientData) => {
    // Forzamos la cabecera para que el backend sepa que es un JSON
    const { data } = await api.post('/clients/add', clientData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  },
  
  update: async (id, clientData) => {
    const { data } = await api.put(`/clients/update/${id}`, clientData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  },
  
  delete: async (id) => {
    const { data } = await api.delete(`/clients/delete/${id}`);
    return data;
  }
};