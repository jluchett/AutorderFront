import styles from '../Clientes/Clientes.module.css';

export const OrderDetail = ({ detailData, orderHeader, onClose }) => {
  if (!detailData || !orderHeader) return <p>Cargando detalles...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
        Orden #{orderHeader.orden_id}
      </h2>

      {/* TARJETA DE CABECERA */}
      <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Fecha</span>
          <div style={{ fontWeight: '600' }}>{orderHeader.fecha_orden}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Cliente</span>
          <div style={{ fontWeight: '600' }}>{orderHeader.nombre_cliente}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Vehículo (Placa)</span>
          <div style={{ fontWeight: '600', color: 'var(--secondary-color)' }}>{orderHeader.placa_vehi}</div>
        </div>
      </div>
      
      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Servicios y Productos</h3>
      
      <div className={styles.tableContainer} style={{ marginBottom: '1.5rem', boxShadow: 'none', border: '1px solid var(--border-color)' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ítem</th>
              <th>Cant.</th>
              <th>V. Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {detailData.detalle.map((item) => (
              <tr key={item.detalle_id}>
                <td>{item.producto_nombre}</td>
                <td>{item.cantidad}</td>
                <td>${Number(item.precio_unitario).toLocaleString('es-CO')}</td>
                <td>${Number(item.subtotal).toLocaleString('es-CO')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'right', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
        Total Facturado: ${Number(detailData.total).toLocaleString('es-CO')}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button onClick={onClose} className={styles.addButton} style={{ width: '100%' }}>
          Cerrar Detalle
        </button>
      </div>
    </div>
  );
};