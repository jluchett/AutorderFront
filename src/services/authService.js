/**
 * Servicio de Autenticación
 * Centraliza toda la lógica de manejo de tokens
 */

import { apiClient } from './apiClient';

class AuthService {
  /**
   * Obtiene el token actual
   */
  getToken() {
    return apiClient.getAuthToken();
  }

  /**
   * Obtiene el usuario actual del localStorage
   */
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Guarda el token después del login
   */
  setToken(token, user) {
    if (token) {
      apiClient.setAuthToken(token);
      
      // Guardar usuario con token incluido
      if (user) {
        user.token = token;
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  /**
   * Verifica si el token está próximo a expirar (si incluye expiración)
   * Nota: Requiere que el token sea un JWT decodificable
   */
  isTokenExpiring(minutesBuffer = 5) {
    try {
      const token = this.getToken();
      if (!token) return false;

      // Decodificar JWT (sin verificar firma)
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      const decoded = JSON.parse(atob(parts[1]));
      if (!decoded.exp) return false;

      // Convertir exp (segundos) a milisegundos y comparar
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const bufferMs = minutesBuffer * 60 * 1000;

      return (expirationTime - currentTime) < bufferMs;
    } catch {
      return false;
    }
  }

  /**
   * Limpia la autenticación (logout)
   */
  clearAuth() {
    apiClient.clearAuthToken();
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  }

  /**
   * Obtiene los headers de autorización
   */
  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  /**
   * Decodifica un JWT (sin verificar firma)
   * Solo para leer información del token
   */
  decodeToken(token = null) {
    try {
      const tokenToDecode = token || this.getToken();
      if (!tokenToDecode) return null;

      const parts = tokenToDecode.split('.');
      if (parts.length !== 3) return null;

      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  }

  /**
   * Obtiene información del usuario desde el token
   */
  getTokenInfo() {
    const decoded = this.decodeToken();
    if (!decoded) return null;

    return {
      subject: decoded.sub,
      issued: new Date(decoded.iat * 1000),
      expires: new Date(decoded.exp * 1000),
      issuer: decoded.iss,
      audience: decoded.aud,
    };
  }

  /**
   * Calcula segundos hasta que expire el token
   */
  getSecondsTillExpiration() {
    try {
      const token = this.getToken();
      if (!token) return 0;

      const parts = token.split('.');
      if (parts.length !== 3) return 0;

      const decoded = JSON.parse(atob(parts[1]));
      if (!decoded.exp) return 0;

      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const secondsTillExpiration = Math.floor((expirationTime - currentTime) / 1000);

      return Math.max(0, secondsTillExpiration);
    } catch {
      return 0;
    }
  }
}

export const authService = new AuthService();
