/**
 * Funciones de validación reutilizables
 */

export const validation = {
  /**
   * Valida que un email sea válido
   */
  isValidEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * Valida que una contraseña cumpla requisitos mínimos
   */
  isValidPassword: (password) => {
    // Mínimo 6 caracteres
    return password && password.length >= 6;
  },

  /**
   * Valida que un campo no esté vacío
   */
  isNotEmpty: (value) => {
    return value && value.trim().length > 0;
  },

  /**
   * Valida que un número sea válido
   */
  isValidNumber: (value) => {
    return !isNaN(value) && value !== '';
  },

  /**
   * Valida credenciales de login
   */
  validateLoginForm: (id, password) => {
    const errors = {};

    if (!validation.isNotEmpty(id)) {
      errors.id = 'El ID es requerido';
    }

    if (!validation.isNotEmpty(password)) {
      errors.password = 'La contraseña es requerida';
    } else if (!validation.isValidPassword(password)) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
