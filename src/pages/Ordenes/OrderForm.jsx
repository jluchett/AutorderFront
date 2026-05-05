import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useClientStore } from '../../stores/clientStore';
import { useVehicleStore } from '../../stores/vehicleStore';
import { useProductStore } from '../../stores/productStore';
import { useToastStore } from '../../stores/toastStore';
import styles from '../Login/Login.module.css';

export const OrderForm = ({ onSubmit, onCancel, isLoading }) => {
  // Traemos los stores globales
  const { clients, fetchClients } = useClientStore();
  const { addToast } = useToastStore();
  const { vehiclesByClient, fetchVehiclesByClient } = useVehicleStore();
  const { products, fetchProducts } = useProductStore();

  // Estado local para el "carrito" de detalles
  const [cart, setCart] = useState([]);
  
  // Estados para los inputs temporales de agregar producto
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      fecha_orden: new Date().toISOString().split('T')[0], // Fecha de hoy por defecto
      id_cliente: '',
      placa_vehic: ''
    }
  });

  // Observamos el cliente seleccionado para buscar sus vehículos
  const watchClienteId = watch('id_cliente');

  // Cargar datos iniciales
  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, [fetchClients, fetchProducts]);

  // Si cambia el cliente, buscamos sus vehículos y reseteamos el select de placa
  useEffect(() => {
    if (watchClienteId) {
      fetchVehiclesByClient(watchClienteId);
      setValue('placa_vehic', ''); // Resetea el vehículo anterior
    } else {
      fetchVehiclesByClient(null);
    }
  }, [watchClienteId, fetchVehiclesByClient, setValue]);

  // Lógica para agregar al carrito
  const addToCart = () => {
    if (!selectedProductId || selectedQuantity < 1) return;

    const productoOriginal = products.find(p => p.id.toString() === selectedProductId);
    if (!productoOriginal) return;

    const newItem = {
      producto_id: productoOriginal.id,
      producto_nombre: productoOriginal.nombre,
      cantidad: Number(selectedQuantity),
      precio_unitario: Number(productoOriginal.precio),
      subtotal: Number(selectedQuantity) * Number(productoOriginal.precio)
    };

    setCart([...cart, newItem]);
    
    // Reseteamos los campos temporales
    setSelectedProductId('');
    setSelectedQuantity(1);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);

  const onFormSubmit = (data) => {
    if (cart.length === 0) {
      addToast("Debe agregar al menos un producto o servicio a la orden.", 'error');
      return;
    }

    // Estructuramos los datos exactamente como tu backend los espera
    const payload = {
      fecha_orden: data.fecha_orden,
      id_cliente: data.id_cliente,
      placa_vehic: data.placa_vehic,
      total_orden: cartTotal,
      detalle: cart.map(item => ({
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario
      }))
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} style={{ maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Nueva Orden de Servicio</h2>

      {/* BLOQUE DE CABECERA APILADO */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        
        <div className={styles.formGroup} style={{ margin: 0 }}>
          <label className={styles.label}>Fecha</label>
          <Controller
            name="fecha_orden"
            control={control}
            rules={{ required: 'La fecha es obligatoria' }}
            render={({ field }) => <input {...field} type="date" className={styles.input} />}
          />
          {errors.fecha_orden && <p className={styles.error}>{errors.fecha_orden.message}</p>}
        </div>

        <div className={styles.formGroup} style={{ margin: 0 }}>
          <label className={styles.label}>Cliente</label>
          <Controller
            name="id_cliente"
            control={control}
            rules={{ required: 'Seleccione un cliente' }}
            render={({ field }) => (
              <select {...field} className={styles.input}>
                <option value="">Seleccione un cliente...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            )}
          />
          {errors.id_cliente && <p className={styles.error}>{errors.id_cliente.message}</p>}
        </div>

        <div className={styles.formGroup} style={{ margin: 0 }}>
          <label className={styles.label}>Vehículo</label>
          <Controller
            name="placa_vehic"
            control={control}
            rules={{ required: 'Seleccione el vehículo' }}
            render={({ field }) => (
              <select {...field} className={styles.input} disabled={!watchClienteId}>
                <option value="">Seleccione vehículo...</option>
                {vehiclesByClient.map(v => <option key={v.placa} value={v.placa}>{v.placa} - {v.marca}</option>)}
              </select>
            )}
          />
          {errors.placa_vehic && <p className={styles.error}>{errors.placa_vehic.message}</p>}
        </div>
        
      </div>

      {/* SECCIÓN DEL CARRITO DE SERVICIOS */}
      <div style={{ border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.5rem', backgroundColor: '#f8fafc' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Servicios y Repuestos</h3>
        
        {/* Controles para agregar apilados en móvil, en línea en PC */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', alignItems: 'end' }}>
          <div style={{ gridColumn: '1 / -1' }}> {/* El select del producto ocupa todo el ancho disponible */}
            <label className={styles.label}>Ítem</label>
            <select 
              className={styles.input} 
              value={selectedProductId} 
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Buscar en catálogo...</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.nombre} (${Number(p.precio).toLocaleString('es-CO')})</option>)}
            </select>
          </div>
          <div>
            <label className={styles.label}>Cantidad</label>
            <input 
              type="number" 
              className={styles.input} 
              min="1" 
              value={selectedQuantity} 
              onChange={(e) => setSelectedQuantity(e.target.value)}
            />
          </div>
          <div>
            <button type="button" onClick={addToCart} className={styles.button} style={{ width: '100%', padding: '0.75rem' }}>
              Agregar
            </button>
          </div>
        </div>

        {/* TABLA DEL CARRITO */}
        {cart.length > 0 && (
          <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '0.5rem' }}>Descripción</th>
                  <th style={{ padding: '0.5rem' }}>Cant.</th>
                  <th style={{ padding: '0.5rem' }}>V. Unit.</th>
                  <th style={{ padding: '0.5rem' }}>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{item.producto_nombre}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{item.cantidad}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>${item.precio_unitario.toLocaleString('es-CO')}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: '600' }}>${item.subtotal.toLocaleString('es-CO')}</td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                      <button type="button" onClick={() => removeFromCart(index)} style={{ color: 'var(--error-color)', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem' }}>
                        ✖
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ textAlign: 'right', marginTop: '1.5rem', fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
          Total: ${cartTotal.toLocaleString('es-CO')}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="button" onClick={onCancel} className={styles.button} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-secondary)' }}>
          Cancelar
        </button>
        <button type="submit" className={styles.button} style={{ flex: 2 }} disabled={isLoading}>
          {isLoading ? 'Generando...' : 'Confirmar Orden'}
        </button>
      </div>
    </form>
  );
};