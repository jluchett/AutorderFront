import axios from 'axios';

const api = axios.create({
  // Le agregamos el || para que si falla el .env, siempre sepa dónde está tu backend
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;