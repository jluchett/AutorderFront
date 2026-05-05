import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../Login/Login.module.css';

export const ProductForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData || { nombre: '', precio: '' }
  });

  const isEditing = !!initialData;

  useEffect(() => {
    reset(initialData || { nombre: '', precio: '' });
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
    // Convertimos el precio a número antes de enviarlo
    const payload = {
      nombre: data.nombre,
      precio: parseFloat(data.precio)
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
        {isEditing ? 'Editar Producto/Servicio' : 'Nuevo Producto/Servicio'}
      </h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nombre del Producto/Servicio</label>
        <Controller
          name="nombre"
          control={control}
          rules={{ required: 'El nombre es obligatorio', minLength: 3 }}
          render={({ field }) => (
            <input {...field} type="text" className={styles.input} />
          )}
        />
        {errors.nombre && <p className={styles.error}>{errors.nombre.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Precio</label>
        <Controller
          name="precio"
          control={control}
          rules={{ 
            required: 'El precio es obligatorio',
            min: { value: 0, message: 'El precio no puede ser negativo' }
          }}
          render={({ field }) => (
            <input {...field} type="number" step="0.01" className={styles.input} />
          )}
        />
        {errors.precio && <p className={styles.error}>{errors.precio.message}</p>}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button type="button" onClick={onCancel} className={styles.button} style={{ backgroundColor: 'var(--text-secondary)' }}>
          Cancelar
        </button>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </div>
    </form>
  );
};