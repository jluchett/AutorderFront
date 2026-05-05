import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useClientStore } from '../../stores/clientStore';
import styles from '../Login/Login.module.css';

export const VehicleForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const { clients, fetchClients } = useClientStore();
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData || {
      placa: '', marca: '', modelo: '', anio: '', kilometraje: '', motor: '', transmision: '', cliente_id: ''
    }
  });

  const isEditing = !!initialData;

  useEffect(() => {
    fetchClients(); // Cargamos los clientes para el selector
    reset(initialData || {
      placa: '', marca: '', modelo: '', anio: '', kilometraje: '', motor: '', transmision: '', cliente_id: ''
    });
  }, [initialData, reset, fetchClients]);

  const onFormSubmit = (data) => {
    // Convertimos datos numéricos antes de enviar
    const payload = {
      ...data,
      anio: parseInt(data.anio, 10),
      kilometraje: data.kilometraje ? parseInt(data.kilometraje, 10) : 0,
      motor: data.motor ? parseFloat(data.motor) : null
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
        {isEditing ? 'Editar Vehículo' : 'Nuevo Vehículo'}
      </h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Cliente (Dueño)</label>
        <Controller
          name="cliente_id"
          control={control}
          rules={{ required: 'Debe seleccionar un cliente' }}
          render={({ field }) => (
            <select {...field} className={styles.input}>
              <option value="">Seleccione un cliente...</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.nombre} ({c.id})</option>
              ))}
            </select>
          )}
        />
        {errors.cliente_id && <p className={styles.error}>{errors.cliente_id.message}</p>}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className={styles.formGroup} style={{ flex: 1 }}>
          <label className={styles.label}>Placa</label>
          <Controller
            name="placa"
            control={control}
            rules={{ required: 'La placa es obligatoria', maxLength: 10 }}
            render={({ field }) => (
              <input {...field} type="text" className={styles.input} disabled={isEditing} />
            )}
          />
          {errors.placa && <p className={styles.error}>{errors.placa.message}</p>}
        </div>

        <div className={styles.formGroup} style={{ flex: 1 }}>
          <label className={styles.label}>Año</label>
          <Controller
            name="anio"
            control={control}
            rules={{ required: 'El año es obligatorio', min: 1950 }}
            render={({ field }) => (
              <input {...field} type="number" className={styles.input} />
            )}
          />
          {errors.anio && <p className={styles.error}>{errors.anio.message}</p>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className={styles.formGroup} style={{ flex: 1 }}>
          <label className={styles.label}>Marca</label>
          <Controller
            name="marca"
            control={control}
            rules={{ required: 'La marca es obligatoria' }}
            render={({ field }) => (
              <input {...field} type="text" className={styles.input} />
            )}
          />
          {errors.marca && <p className={styles.error}>{errors.marca.message}</p>}
        </div>

        <div className={styles.formGroup} style={{ flex: 1 }}>
          <label className={styles.label}>Modelo</label>
          <Controller
            name="modelo"
            control={control}
            rules={{ required: 'El modelo es obligatorio' }}
            render={({ field }) => (
              <input {...field} type="text" className={styles.input} />
            )}
          />
          {errors.modelo && <p className={styles.error}>{errors.modelo.message}</p>}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Kilometraje</label>
        <Controller
          name="kilometraje"
          control={control}
          render={({ field }) => (
            <input {...field} type="number" className={styles.input} />
          )}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button type="button" onClick={onCancel} className={styles.button} style={{ backgroundColor: 'var(--text-secondary)' }}>
          Cancelar
        </button>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Vehículo'}
        </button>
      </div>
    </form>
  );
};