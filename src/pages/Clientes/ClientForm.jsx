import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../Login/Login.module.css';

export const ClientForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const { 
    control, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm({
    defaultValues: initialData || {
      id: '',
      nombre: '',
      telefono: '',
      email: ''
    } 
  });

  const isEditing = !!initialData;

  useEffect(() => {
    reset(initialData || { id: '', nombre: '', telefono: '', email: '' });
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
        {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
      </h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>ID / Cédula</label>
        <Controller
          name="id"
          control={control}
          rules={{ 
            required: 'El ID es obligatorio',
            maxLength: { value: 12, message: 'Máximo 12 caracteres' }
          }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={styles.input}
              disabled={isEditing}
            />
          )}
        />
        {errors.id && <p className={styles.error}>{errors.id.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nombre Completo</label>
        <Controller
          name="nombre"
          control={control}
          rules={{ 
            required: 'El nombre es obligatorio', 
            minLength: { value: 3, message: 'Mínimo 3 caracteres' }
          }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={styles.input}
            />
          )}
        />
        {errors.nombre && <p className={styles.error}>{errors.nombre.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Teléfono</label>
        <Controller
          name="telefono"
          control={control}
          rules={{ required: 'El teléfono es obligatorio' }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={styles.input}
            />
          )}
        />
        {errors.telefono && <p className={styles.error}>{errors.telefono.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email (Opcional)</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              className={styles.input}
            />
          )}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button 
          type="button" 
          onClick={onCancel} 
          className={styles.button} 
          style={{ backgroundColor: 'var(--text-secondary)' }}
        >
          Cancelar
        </button>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Cliente'}
        </button>
      </div>
    </form>
  );
};