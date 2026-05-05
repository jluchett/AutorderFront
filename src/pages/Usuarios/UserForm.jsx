import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../Login/Login.module.css';

export const UserForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const isEditing = !!initialData;

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData || { id: '', name: '', role: '', password: '' }
  });

  useEffect(() => {
    reset(initialData || { id: '', name: '', role: '', password: '' });
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
        {isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}
      </h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>ID / Cédula</label>
        <Controller
          name="id"
          control={control}
          rules={{ required: 'El ID es obligatorio', maxLength: 12 }}
          render={({ field }) => (
            <input {...field} type="text" className={styles.input} disabled={isEditing} />
          )}
        />
        {errors.id && <p className={styles.error}>{errors.id.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nombre Completo</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'El nombre es obligatorio', minLength: 5 }}
          render={({ field }) => (
            <input {...field} type="text" className={styles.input} />
          )}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Rol en el Sistema</label>
        <Controller
          name="role"
          control={control}
          rules={{ required: 'Seleccione un rol' }}
          render={({ field }) => (
            <select {...field} className={styles.input}>
              <option value="">Seleccione rol...</option>
              <option value="admin">Administrador (Control Total)</option>
              <option value="ventas">Ventas (Gestión operativa)</option>
              <option value="mecanico">Mecánico (Solo lectura y procesos)</option>
            </select>
          )}
        />
        {errors.role && <p className={styles.error}>{errors.role.message}</p>}
      </div>

      {/* Solo pedimos la contraseña al crear. Tu backend tiene otra ruta para cambiarla después */}
      {!isEditing && (
        <div className={styles.formGroup}>
          <label className={styles.label}>Contraseña Temporal</label>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'La contraseña es obligatoria', minLength: 8 }}
            render={({ field }) => (
              <input {...field} type="password" className={styles.input} />
            )}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button type="button" onClick={onCancel} className={styles.button} style={{ backgroundColor: 'var(--text-secondary)' }}>
          Cancelar
        </button>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Usuario'}
        </button>
      </div>
    </form>
  );
};