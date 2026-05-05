import { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { useAuthStore } from '../../stores/authStore';
import { Modal } from '../../components/Modal/Modal';
import { UserForm } from './UserForm';
import { useToastStore } from '../../stores/toastStore';
import { TableSkeleton } from '../../components/Skeleton/TableSkeleton';
import styles from '../Clientes/Clientes.module.css'; // Reutilizamos estilos

const Usuarios = () => {
  const { users, isLoading, error, fetchUsers, deleteUser, createUser, updateUser, toggleLockStatus } = useUserStore();
  const { user: currentUser } = useAuthStore(); // Para evitar que el admin se borre o bloquee a sí mismo
  const { addToast } = useToastStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id, nombre) => {
    if (id === currentUser.id) {
      alert("Por seguridad, no puedes eliminar tu propio usuario.");
      return;
    }
    if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente al usuario ${nombre}?`)) {
      const success = await deleteUser(id);
      if (success) {
        addToast('Usuario eliminado correctamente', 'success');
      } else {
        addToast('No se pudo eliminar el usuario', 'error');
      }
    }
  };

  const handleToggleLock = async (id, currentStatus) => {
    if (id === currentUser.id) {
      alert("No puedes bloquear tu propio usuario.");
      return;
    }
    const accion = currentStatus ? "desbloquear" : "bloquear";
    if (window.confirm(`¿Estás seguro de ${accion} a este usuario?`)) {
      const success = await toggleLockStatus(id, currentStatus);
      if (success) {
        if (accion === "bloquear") {
          addToast(`Usuario bloqueado correctamente`, 'success');
        } else {
          addToast(`Usuario desbloqueado correctamente`, 'success');
        }
      } else {
        addToast(`No se pudo ${accion} al usuario`, 'error');
      }
    }
  };

  const handleOpenCreate = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (usuario) => {
    setUserToEdit(usuario);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  };

  const handleFormSubmit = async (data) => {
    // eslint-disable-next-line no-useless-assignment
    let success = false;
    if (userToEdit) {
      // Para editar, enviamos solo name y role según el backend
      const payload = { name: data.name, role: data.role };
      success = await updateUser(userToEdit.id, payload);
      if (success) addToast('Usuario actualizado correctamente', 'info');
    } else {
      success = await createUser(data);
      if (success) addToast('Usuario creado exitosamente', 'success');
    }

    if (success) {
      handleCloseModal();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Administración de Usuarios</h1>
        <button onClick={handleOpenCreate} className={styles.addButton}>+ Nuevo Usuario</button>
      </header>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <div className={styles.tableContainer} style={{ marginTop: '1.5rem' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && users.length === 0 ? (
              <TableSkeleton rows={5} columns={5} />
            ) : users.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No hay usuarios registrados.</td></tr>
            ) : (
              users.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>
                    {usuario.name} {usuario.id === currentUser.id && <span style={{ fontSize: '0.8em', color: 'var(--secondary-color)' }}>(Tú)</span>}
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{usuario.role}</td>
                  <td>
                    <span style={{ 
                      backgroundColor: usuario.locked ? '#fee2e2' : '#dcfce7', 
                      color: usuario.locked ? '#ef4444' : '#22c55e',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontWeight: '600',
                      fontSize: '0.85rem'
                    }}>
                      {usuario.locked ? 'BLOQUEADO' : 'ACTIVO'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.btnEdit} onClick={() => handleOpenEdit(usuario)}>Editar</button>
                      
                      {usuario.id !== currentUser.id && (
                        <>
                          <button 
                            className={styles.btnEdit} 
                            style={{ borderColor: usuario.locked ? '#22c55e' : '#f59e0b', color: usuario.locked ? '#22c55e' : '#f59e0b' }}
                            onClick={() => handleToggleLock(usuario.id, usuario.locked)}
                          >
                            {usuario.locked ? 'Desbloquear' : 'Bloquear'}
                          </button>
                          <button className={styles.btnDelete} onClick={() => handleDelete(usuario.id, usuario.name)}>Eliminar</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UserForm 
          initialData={userToEdit} 
          onSubmit={handleFormSubmit} 
          onCancel={handleCloseModal}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default Usuarios;