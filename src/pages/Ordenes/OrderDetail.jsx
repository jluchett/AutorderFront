import styles from '../Clientes/Clientes.module.css';

export const OrderDetail = ({ detailData, orderHeader, onClose }) => {
  if (!detailData || !orderHeader) return <p>Cargando detalles...</p>;

  // Función nativa del navegador para abrir la ventana de impresión/PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="factura-imprimible">
      {/* CABECERA DE LA FACTURA (Con datos del Taller) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '2px solid var(--primary-color)', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, color: 'var(--primary-color)', fontSize: '2rem', letterSpacing: '1px' }}>AUTORDER</h1>
          <p style={{ margin: '0.25rem 0', color: 'var(--text-secondary)' }}>Servicio Automotriz Profesional</p>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>NIT: 900.123.456-7</p>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Calle Falsa 123, Ciudad</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>FACTURA / ORDEN</h2>
          <p style={{ margin: '0.25rem 0', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--error-color)' }}>
            N° {String(orderHeader.orden_id).padStart(6, '0')}
          </p>
        </div>
      </div>

      {/* DATOS DEL CLIENTE Y VEHÍCULO */}
      <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Cliente</span>
          <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{orderHeader.nombre_cliente}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Vehículo</span>
          <div style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--secondary-color)' }}>{orderHeader.placa_vehi}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Fecha de Emisión</span>
          <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{orderHeader.fecha_orden}</div>
        </div>
      </div>
      
      {/* DETALLE DE SERVICIOS */}
      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Detalle de Servicios y Repuestos</h3>
      
      <div className={styles.tableContainer} style={{ marginBottom: '2rem', boxShadow: 'none', border: '1px solid var(--border-color)' }}>
        <table className={styles.table}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              <th>Descripción</th>
              <th style={{ textAlign: 'center' }}>Cant.</th>
              <th style={{ textAlign: 'right' }}>V. Unitario</th>
              <th style={{ textAlign: 'right' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {detailData.detalle.map((item) => (
              <tr key={item.detalle_id}>
                <td>{item.producto_nombre}</td>
                <td style={{ textAlign: 'center' }}>{item.cantidad}</td>
                <td style={{ textAlign: 'right' }}>${Number(item.precio_unitario).toLocaleString('es-CO')}</td>
                <td style={{ textAlign: 'right', fontWeight: '600' }}>${Number(item.subtotal).toLocaleString('es-CO')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTALES */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <div style={{ width: '300px', borderTop: '2px solid var(--text-primary)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>TOTAL FACTURADO:</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            ${Number(detailData.total).toLocaleString('es-CO')}
          </span>
        </div>
      </div>

      {/* TÉRMINOS / FOOTER (Solo visible en papel) */}
      <div style={{ marginTop: '4rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <p>Gracias por confiar su vehículo en manos expertas.</p>
        <p>Los repuestos eléctricos no tienen garantía. Validez de esta cotización/orden: 15 días.</p>
      </div>

      {/* BOTONES DE ACCIÓN (Con clase 'no-print' para que desaparezcan al imprimir) */}
      <div className="no-print" style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={onClose} 
          className={styles.addButton} 
          style={{ backgroundColor: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--text-secondary)' }}
        >
          Cerrar
        </button>
        
        <button onClick={handlePrint} className={styles.addButton}>
          🖨️ Imprimir / Guardar PDF
        </button>
      </div>
    </div>
  );
};