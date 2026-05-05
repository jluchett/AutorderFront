import api from './api';

export const userService = {
  getAll: async () => {
    // Tu endpoint GET /api/users no recibe paginación por ahora, trae todos
    const { data } = await api.get('/users');
    return data;
  },
  
  create: async (userData) => {
    const { data } = await api.post('/users/create', userData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  },
  
  update: async (id, userData) => {
    // Para actualizar, tu backend espera { name, role }
    const { data } = await api.put(`/users/update/${id}`, userData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  },
  
  toggleLock: async (id, lockedStatus) => {
    // Tu backend espera un booleano para bloquear/desbloquear
    const { data } = await api.put(`/users/locked/${id}`, { locked: lockedStatus }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  },
  
  delete: async (id) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  }
};