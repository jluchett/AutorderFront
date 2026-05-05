import api from './api';

export const orderService = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/orders', { params });
    return data;
  },
  
  getDetail: async (id) => {
    const { data } = await api.get(`/orders/detail/${id}`);
    return data;
  },
  
  create: async (orderData) => {
    const { data } = await api.post('/orders/add', orderData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  },
  
  delete: async (id) => {
    const { data } = await api.delete(`/orders/delete/${id}`);
    return data;
  },

  // 👇 NUEVOS ENDPOINTS PARA EL DASHBOARD 👇
  getStats: async (params = {}) => {
    const { data } = await api.get('/orders/stats', { params });
    return data;
  },

  getTopProducts: async (params = {}) => {
    const { data } = await api.get('/orders/reports/top-products', { params });
    return data;
  },

  getTopClients: async (params = {}) => {
    const { data } = await api.get('/orders/reports/top-clients', { params });
    return data;
  }
};