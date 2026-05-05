import { useEffect, useState } from 'react';
import { useVehicleStore } from '../../stores/vehicleStore';
import { Modal } from '../../components/Modal/Modal';
import { VehicleForm } from './VehicleForm';
import styles from '../Clientes/Clientes.module.css'; // ¡Reutilizamos los estilos!

const Vehiculos = () => {
  const { vehicles, isLoading, error, fetchVehicles, deleteVehicle, createVehicle, updateVehicle } = useVehicleStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVehicles(searchTerm);
  };

  const handleDelete = async (placa) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el vehículo con placa ${placa}?`)) {
      await deleteVehicle(placa);
    }
  };

  const handleOpenCreate = () => {
    setVehicleToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vehiculo) => {
    setVehicleToEdit(vehiculo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVehicleToEdit(null);
  };

  const handleFormSubmit = async (data) => {
    // eslint-disable-next-line no-useless-assignment
    let success = false;
    if (vehicleToEdit) {
      success = await updateVehicle(vehicleToEdit.placa, data);
    } else {
      success = await createVehicle(data);
    }

    if (success) {
      handleCloseModal();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Gestión de Vehículos</h1>
        <button onClick={handleOpenCreate} className={styles.addButton}>+ Nuevo Vehículo</button>
      </header>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSearch} className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por placa, marca o modelo..."
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
              <th>Placa</th>
              <th>Marca/Modelo</th>
              <th>Año</th>
              <th>Cliente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && vehicles.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Cargando vehículos...</td></tr>
            ) : vehicles.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No se encontraron vehículos.</td></tr>
            ) : (
              vehicles.map((vehiculo) => (
                <tr key={vehiculo.placa}>
                  <td><strong>{vehiculo.placa}</strong></td>
                  <td>{vehiculo.marca} {vehiculo.modelo}</td>
                  <td>{vehiculo.anio}</td>
                  <td>{vehiculo.nombre_cliente}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.btnEdit} onClick={() => handleOpenEdit(vehiculo)}>Editar</button>
                      <button className={styles.btnDelete} onClick={() => handleDelete(vehiculo.placa)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <VehicleForm 
          initialData={vehicleToEdit} 
          onSubmit={handleFormSubmit} 
          onCancel={handleCloseModal}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default Vehiculos;