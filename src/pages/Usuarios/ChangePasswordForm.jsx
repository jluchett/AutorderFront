import { useForm, Controller } from 'react-hook-form';
import styles from '../Login/Login.module.css'; // Reutilizamos los estilos de inputs

export const ChangePasswordForm = ({ user, onSubmit, onCancel, isLoading }) => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { password: '', confirmPassword: '' }
  });

  // Observamos el valor de 'password' para compararlo con 'confirmPassword'
  const passwordValue = watch('password');

  const onFormSubmit = (data) => {
    // Solo enviamos el ID y la contraseña final
    onSubmit(user.id, data.password);
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h2 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>
        Cambiar Contraseña
      </h2>
      <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        Actualizando credenciales para: <strong>{user.name}</strong>
      </p>

      <div className={styles.formGroup}>
        <label className={styles.label}>Nueva Contraseña</label>
        <Controller
          name="password"
          control={control}
          rules={{ 
            required: 'La contraseña es obligatoria', 
            minLength: { value: 8, message: 'Mínimo 8 caracteres' } 
          }}
          render={({ field }) => (
            <input {...field} type="password" className={styles.input} placeholder="Escribe la nueva clave..." />
          )}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Confirmar Nueva Contraseña</label>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ 
            required: 'Debes confirmar la contraseña',
            validate: (value) => value === passwordValue || 'Las contraseñas no coinciden'
          }}
          render={({ field }) => (
            <input {...field} type="password" className={styles.input} placeholder="Repite la clave..." />
          )}
        />
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button type="button" onClick={onCancel} className={styles.button} style={{ backgroundColor: 'var(--text-secondary)' }}>
          Cancelar
        </button>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Actualizando...' : 'Cambiar Contraseña'}
        </button>
      </div>
    </form>
  );
};