import { create } from 'zustand';
import { productService } from '../services/productService';

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async (searchTerm = '') => {
    set({ isLoading: true, error: null });
    try {
      const cleanSearch = searchTerm.trim().toLowerCase();
      const response = await productService.getAll({ search: cleanSearch });
      set({ products: response.products || [], isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar productos', isLoading: false });
    }
  },

  createProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      await productService.create(productData);
      get().fetchProducts();
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al crear producto', isLoading: false });
      return false;
    }
  },

  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null });
    try {
      await productService.update(id, productData);
      get().fetchProducts();
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al actualizar producto', isLoading: false });
      return false;
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await productService.delete(id);
      const currentProducts = get().products;
      set({ products: currentProducts.filter(p => p.id !== id), isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al eliminar producto', isLoading: false });
      return false;
    }
  }
}));