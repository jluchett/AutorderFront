import { useEffect, useState } from 'react';
import { useClientStore } from '../../stores/clientStore';
import { Modal } from '../../components/Modal/Modal';
import { ClientForm } from './ClientForm';
import styles from './Clientes.module.css';

const Clientes = () => {
  const { clients, isLoading, error, fetchClients, deleteClient, createClient, updateClient } = useClientStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para el Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);

  // Cargar clientes al montar el componente
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    fetchClients(searchTerm);
  };

  const handleDelete = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al cliente ${nombre}?`)) {
      await deleteClient(id);
    }
  };

  // Abrir modal para crear
  const handleOpenCreate = () => {
    setClientToEdit(null);
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleOpenEdit = (cliente) => {
    setClientToEdit(cliente);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClientToEdit(null);
  };

  // Manejar el envío del formulario
  const handleFormSubmit = async (data) => {
    // eslint-disable-next-line no-useless-assignment
    let success = false;
    if (clientToEdit) {
      // Si estamos editando, tu backend espera { nombre, telefono, email } y el ID por URL
      const payload = { nombre: data.nombre, telefono: data.telefono, email: data.email };
      success = await updateClient(clientToEdit.id, payload);
    } else {
      success = await createClient(data);
    }

    if (success) {
      handleCloseModal();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Gestión de Clientes</h1>
        {/* Conectamos el botón para abrir el modal */}
        <button onClick={handleOpenCreate} className={styles.addButton}>+ Nuevo Cliente</button>
      </header>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSearch} className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por cédula, nombre, teléfono o email..."
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
              <th>ID / Cédula</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && clients.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Cargando clientes...</td>
              </tr>
            ) : clients.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No se encontraron clientes.</td>
              </tr>
            ) : (
              clients.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.email || 'N/A'}</td>
                  <td>
                    <div className={styles.actions}>
                      {/* Conectamos el botón para editar */}
                      <button 
                        className={styles.btnEdit}
                        onClick={() => handleOpenEdit(cliente)}
                      >
                        Editar
                      </button>
                      <button 
                        className={styles.btnDelete}
                        onClick={() => handleDelete(cliente.id, cliente.nombre)}
                      >
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

      {/* Renderizamos el Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ClientForm 
          initialData={clientToEdit} 
          onSubmit={handleFormSubmit} 
          onCancel={handleCloseModal}
          isLoading={isLoading}
        />
      </Modal>
      
    </div>
  );
};

export default Clientes;