import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import styles from './Login.module.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, error, isLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Si ya está autenticado, sacarlo del login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const success = await login(data.id, data.password);
    if (success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Autorder</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="id">ID de Usuario</label>
            <input
              id="id"
              type="text"
              className={styles.input}
              {...register('id', { 
                required: 'El ID es obligatorio',
                maxLength: { value: 12, message: 'Máximo 12 caracteres' }
              })}
            />
            {errors.id && <p className={styles.error}>{errors.id.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              {...register('password', { 
                required: 'La contraseña es obligatoria',
                minLength: { value: 8, message: 'Mínimo 8 caracteres' }
              })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;