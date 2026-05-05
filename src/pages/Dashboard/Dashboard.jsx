import { useEffect } from 'react';
import { useDashboardStore } from '../../stores/dashboardStore';
import { useAuthStore } from '../../stores/authStore';
import styles from './Dashboard.module.css';

const formatMoney = (amount) => {
  return `$${Number(amount).toLocaleString('es-CO', { minimumFractionDigits: 0 })}`;
};

const Dashboard = () => {
  const { user } = useAuthStore();
  const { stats, topProducts, topClients, isLoading, error, fetchDashboardData } = useDashboardStore();

  useEffect(() => {
    // Al cargar, traemos los datos sin filtros (histórico completo)
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading && !stats) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando métricas...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '2rem' }}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Panel de Control</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Hola, {user?.name}. Aquí tienes el resumen del negocio.</p>
        </div>
      </div>

      {/* MÉTRICAS PRINCIPALES (KPIs) */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiTitle}>Ingresos Totales</div>
          <div className={styles.kpiValue}>{formatMoney(stats?.total_revenue || 0)}</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiTitle}>Órdenes Procesadas</div>
          <div className={styles.kpiValue}>{stats?.total_orders || 0}</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiTitle}>Ticket Promedio</div>
          <div className={styles.kpiValue}>{formatMoney(stats?.average_order_value || 0)}</div>
        </div>
      </div>

      {/* REPORTES DETALLADOS */}
      <div className={styles.reportsGrid}>
        
        {/* TOP CLIENTES */}
        <div className={styles.reportCard}>
          <h2 className={styles.reportTitle}>Mejores Clientes</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Órdenes</th>
                  <th>Total Comprado</th>
                </tr>
              </thead>
              <tbody>
                {topClients.length === 0 ? (
                  <tr><td colSpan="3" style={{ textAlign: 'center' }}>No hay datos suficientes</td></tr>
                ) : (
                  topClients.map(cliente => (
                    <tr key={cliente.cliente_id}>
                      <td style={{ fontWeight: '500' }}>{cliente.cliente_nombre}</td>
                      <td>{cliente.order_count}</td>
                      <td style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>
                        {formatMoney(cliente.total_revenue)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* TOP PRODUCTOS */}
        <div className={styles.reportCard}>
          <h2 className={styles.reportTitle}>Servicios/Productos más vendidos</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Ítem</th>
                  <th>Cant. Vendida</th>
                  <th>Ingreso Generado</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.length === 0 ? (
                  <tr><td colSpan="3" style={{ textAlign: 'center' }}>No hay datos suficientes</td></tr>
                ) : (
                  topProducts.map(producto => (
                    <tr key={producto.producto_id}>
                      <td style={{ fontWeight: '500' }}>{producto.producto_nombre}</td>
                      <td>{producto.total_quantity}</td>
                      <td style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>
                        {formatMoney(producto.total_revenue)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;