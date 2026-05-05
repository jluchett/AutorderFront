import { create } from 'zustand';

// Variable externa para guardar la función resolve de la promesa
let resolveCallback = null;

export const useConfirmStore = create((set) => ({
  isOpen: false,
  title: '',
  message: '',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  isDanger: false,

  // Esta es la función que llamaremos en nuestros componentes
  askConfirm: (options) => {
    return new Promise((resolve) => {
      resolveCallback = resolve;
      set({ 
        isOpen: true, 
        title: options.title || '¿Estás seguro?',
        message: options.message || '',
        confirmText: options.confirmText || 'Confirmar',
        cancelText: options.cancelText || 'Cancelar',
        isDanger: options.isDanger || false
      });
    });
  },

  // Función cuando el usuario hace clic en "Confirmar"
  onConfirm: () => {
    set({ isOpen: false });
    if (resolveCallback) resolveCallback(true);
  },

  // Función cuando el usuario hace clic en "Cancelar" o cierra el modal
  onCancel: () => {
    set({ isOpen: false });
    if (resolveCallback) resolveCallback(false);
  }
}));