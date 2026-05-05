import api from './api';

export const productService = {
  getAll: async (params = {}) => {
    const { data } = await api.get('/products', { params });
    return data;
  },
  
  create: async (productData) => {
    const { data } = await api.post('/products/add', productData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  },
  
  update: async (id, productData) => {
    const { data } = await api.put(`/products/update/${id}`, productData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  },
  
  delete: async (id) => {
    const { data } = await api.delete(`/products/delete/${id}`);
    return data;
  }
};