import { useEffect, useState } from 'react';
import { useOrderStore } from '../../stores/orderStore';
import { Modal } from '../../components/Modal/Modal';
import { OrderDetail } from './OrderDetail';
import { OrderForm } from './OrderForm';
import styles from '../Clientes/Clientes.module.css'; // Reutilizamos estilos

const Ordenes = () => {
  const { orders, isLoading, error, fetchOrders, deleteOrder, getOrderDetail } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para el Modal de Detalles
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);

  // 👇 NUEVO ESTADO para guardar la información de cabecera de la orden
  const [selectedOrderHeader, setSelectedOrderHeader] = useState(null);

  // 2. Añade estos estados debajo de los del Detalle (línea 13 aprox):
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrders(searchTerm);
  };

  // 3. Añade la función para enviar el formulario:
  const handleCreateOrder = async (data) => {
    // Usamos createOrder (¡asegúrate de que exista en tu orderStore!)
    const success = await useOrderStore.getState().createOrder(data); 
    if (success) setIsCreateModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm(`¿Estás seguro de anular/eliminar la orden #${id}? Esta acción es irreversible.`)) {
      await deleteOrder(id);
    }
  };

  const handleViewDetail = async (orden) => {
    const data = await getOrderDetail(orden.orden_id);
    if (data) {
      setCurrentDetail(data);
      setSelectedOrderHeader(orden); // Guardamos la info de cabecera
      setIsDetailModalOpen(true);
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setCurrentDetail(null);
    setSelectedOrderHeader(null); // Limpiamos la cabecera al cerrar
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Gestión de Órdenes</h1>
        <button className={styles.addButton} onClick={() => setIsCreateModalOpen(true)}>
          + Nueva Orden
        </button>
      </header>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSearch} className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por ID de orden, cliente o placa..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className={styles.addButton}>Buscar</button>
      </form>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Vehículo (Placa)</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && orders.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Cargando órdenes...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No hay órdenes registradas.</td></tr>
            ) : (
              orders.map((orden) => (
                <tr key={orden.orden_id}>
                  <td><strong>#{orden.orden_id}</strong></td>
                  <td>{orden.fecha_orden}</td>
                  <td>{orden.nombre_cliente}</td>
                  <td>{orden.placa_vehi}</td>
                  <td>${Number(orden.total).toLocaleString('es-CO')}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.btnEdit} onClick={() => handleViewDetail(orden)}>
                        Detalles
                      </button>
                      <button className={styles.btnDelete} onClick={() => handleDelete(orden.orden_id)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isDetailModalOpen} onClose={closeDetailModal}>
        <OrderDetail 
          detailData={currentDetail} 
          orderHeader={selectedOrderHeader} // Pasamos la cabecera al detalle
          onClose={closeDetailModal} 
        />
      </Modal>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <OrderForm 
          onSubmit={handleCreateOrder} 
          onCancel={() => setIsCreateModalOpen(false)} 
          isLoading={isLoading} 
        />
      </Modal>
    </div>
  );
};

export default Ordenes;