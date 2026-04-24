/**
 * Cliente HTTP centralizado para todas las llamadas API
 * Proporciona manejo consistente de errores, timeouts y headers
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.18:3000';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

class ApiClient {
  /**
   * Realiza una solicitud HTTP con manejo de errores
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Agregar token si existe
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `Error ${response.status}`,
          response.status,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error.name === 'AbortError') {
        throw new ApiError('La solicitud tardó demasiado tiempo', 408, null);
      }
      throw new ApiError(error.message || 'Error desconocido', 0, null);
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  /**
   * Obtiene el token de autenticación del localStorage
   */
  getAuthToken() {
    const user = localStorage.getItem('user');
    if (!user) return null;
    try {
      const userData = JSON.parse(user);
      return userData.token || null;
    } catch {
      return null;
    }
  }

  /**
   * Limpia el token de autenticación
   */
  clearAuthToken() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  }
}

/**
 * Clase personalizada para errores de API
 */
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const apiClient = new ApiClient();
export { ApiError };
