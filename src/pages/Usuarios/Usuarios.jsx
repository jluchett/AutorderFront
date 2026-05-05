import { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { useAuthStore } from '../../stores/authStore';
import { Modal } from '../../components/Modal/Modal';
import { UserForm } from './UserForm';
import { ChangePasswordForm } from './ChangePasswordForm';
import { useToastStore } from '../../stores/toastStore';
import { TableSkeleton } from '../../components/Skeleton/TableSkeleton';
import { useConfirmStore } from '../../stores/confirmStore';
import styles from '../Clientes/Clientes.module.css'; // Reutilizamos estilos

const Usuarios = () => {
  const { users, isLoading, error, fetchUsers, deleteUser, createUser, updateUser, toggleLockStatus, changePassword } = useUserStore();
  const { user: currentUser } = useAuthStore(); // Para evitar que el admin se borre o bloquee a sí mismo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userForPassword, setUserForPassword] = useState(null);

  const { addToast } = useToastStore();
  const { askConfirm } = useConfirmStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id, nombre) => {
    if (id === currentUser.id) {
      addToast("Por seguridad, no puedes eliminar tu propio usuario.", 'error');
      return;
    }
    const isConfirmed = await askConfirm({
      title: 'Eliminar Usuario',
      message: `¿Estás seguro de que deseas eliminar permanentemente al usuario ${nombre}?`,
      confirmText: 'Sí, eliminar',
      isDanger: true
    });
    if (isConfirmed) {
      const success = await deleteUser(id);
      if (success) {
        addToast(`Usuario ${nombre} eliminado`, 'success');
      } else {
        addToast('No se pudo eliminar el usuario', 'error');
      }
    }
  };

  const handleToggleLock = async (id, currentStatus) => {
    if (id === currentUser.id) {
      addToast("No puedes bloquear tu propio usuario.", 'error');
      return;
    }
    const accion = currentStatus ? "desbloquear" : "bloquear";
    const isConfirmed = await askConfirm({
      title: `${accion.charAt(0).toUpperCase() + accion.slice(1)} Usuario`,
      message: `¿Estás seguro de que deseas ${accion} a este usuario?`,
      confirmText: `Sí, ${accion}`,
      isDanger: !currentStatus
    });
    
    if (isConfirmed) {
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

  const handleOpenPassword = (usuario) => {
    setUserForPassword(usuario);
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setUserForPassword(null);
  };

  const handlePasswordSubmit = async (userId, newPassword) => {
    const success = await changePassword(userId, newPassword);
    if (success) {
      addToast('Contraseña actualizada correctamente', 'success');
      handleClosePasswordModal();
    } else {
      addToast('Error al cambiar la contraseña', 'error');
    }
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
                      <button 
                        className={styles.btnEdit} 
                        style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
                        onClick={() => handleOpenPassword(usuario)}
                      >
                        Clave
                      </button>
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
      
      <Modal isOpen={isPasswordModalOpen} onClose={handleClosePasswordModal}>
        <ChangePasswordForm 
          user={userForPassword} 
          onSubmit={handlePasswordSubmit} 
          onCancel={handleClosePasswordModal}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default Usuarios;