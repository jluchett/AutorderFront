/**
 * Hook personalizado para manejar llamadas API
 * Proporciona loading, error, y automáticamente actualiza el store
 */

import { useState, useCallback } from 'react';
import useStore from '../store';
import { getErrorMessage } from '../api';

/**
 * Hook para realizar operaciones asincrónicas con manejo de estado
 * 
 * @example
 * const { data, loading, error, execute } = useAsync(fetchUsers);
 * 
 * useEffect(() => {
 *   execute();
 * }, []);
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setStatus('pending');
      setError(null);
      try {
        const response = await asyncFunction(...args);
        setValue(response);
        setStatus('success');
        return response;
      } catch (err) {
        const errorMsg = getErrorMessage(err);
        setError(errorMsg);
        setStatus('error');
        throw err;
      }
    },
    [asyncFunction]
  );

  // Ejecutar inmediatamente si es necesario
  if (immediate && status === 'idle') {
    execute();
  }

  return {
    execute,
    status,
    value,
    error,
    loading: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'success',
  };
};

/**
 * Hook para cargar datos y guardarlos en el store
 * 
 * @example
 * const { data, loading, error } = useApiData(
 *   () => actualUsers(),
 *   'users',
 *   'setUsers'
 * );
 */
export const useApiData = (fetchFn, dataKey, setterKey) => {
  const store = useStore();
  const setLoading = store.setLoading;
  const setError = store.setError;
  const setter = store[setterKey];

  const [loading, setLocalLoading] = useState(false);
  const [error, setLocalError] = useState(null);

  const load = useCallback(async () => {
    setLocalLoading(true);
    setLocalError(null);
    setLoading(true);
    try {
      const data = await fetchFn();
      setter(data);
      return data;
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setLocalError(errorMsg);
      setError(errorMsg);
      throw err;
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  }, [fetchFn, setter, setError, setLoading]);

  return {
    data: store[dataKey] || [],
    loading,
    error,
    reload: load,
  };
};

/**
 * Hook para manejar operaciones que modifican datos (POST, PUT, DELETE)
 * 
 * @example
 * const { execute, loading, error } = useMutation(addUser);
 * 
 * const handleSubmit = async (userData) => {
 *   await execute(userData);
 *   // Recargar lista de usuarios
 * };
 */
export const useMutation = (mutationFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const setStoreError = useStore((state) => state.setError);
  const setStoreLoading = useStore((state) => state.setLoading);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      setStoreLoading(true);
      try {
        const result = await mutationFn(...args);
        setData(result);
        return result;
      } catch (err) {
        const errorMsg = getErrorMessage(err);
        setError(errorMsg);
        setStoreError(errorMsg);
        throw err;
      } finally {
        setLoading(false);
        setStoreLoading(false);
      }
    },
    [mutationFn, setStoreError, setStoreLoading]
  );

  return {
    execute,
    loading,
    error,
    data,
  };
};
