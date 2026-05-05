import api from './api';

export const authService = {
  login: async (id, password) => {
    const { data } = await api.post('/auth/login', { id, password });
    return data;
  },
  logout: async () => {
    const { data } = await api.post('/auth/logout');
    return data;
  },
  checkAuth: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  }
};