import { useEffect, useState } from 'react';
import { useProductStore } from '../../stores/productStore';
import { Modal } from '../../components/Modal/Modal';
import { ProductForm } from './ProductForm';
import { useToastStore } from '../../stores/toastStore';
import { TableSkeleton } from '../../components/Skeleton/TableSkeleton';
import { useConfirmStore } from '../../stores/confirmStore';
import styles from '../Clientes/Clientes.module.css'; // Reutilizamos estilos

const Productos = () => {
  const { products, isLoading, error, fetchProducts, deleteProduct, createProduct, updateProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const { addToast } = useToastStore(); // 👈 3. Extraer addToast
  const { askConfirm } = useConfirmStore(); // 👈 4. Extraer askConfirm
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  const handleDelete = async (id, nombre) => {
    const isConfirmed = await askConfirm({
      title: 'Eliminar Producto',
      message: `¿Estás seguro de que deseas eliminar "${nombre}"?`,
      confirmText: 'Sí, eliminar',
      isDanger: true
    });

    if (isConfirmed) {
      const success = await deleteProduct(id);
      if (success) {
        addToast(`Producto "${nombre}" eliminado correctamente`, 'success');
      } else {
        addToast('No se pudo eliminar el producto', 'error');
      }
    }
  };

  const handleOpenCreate = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (producto) => {
    setProductToEdit(producto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleFormSubmit = async (data) => {
    // eslint-disable-next-line no-useless-assignment
    let success = false;
    if (productToEdit) {
      success = await updateProduct(productToEdit.id, data);
      if (success) addToast('Producto actualizado correctamente', 'info'); // 👈 Toast Info
    } else {
      success = await createProduct(data);
      if (success) addToast('Producto creado exitosamente', 'success'); // 👈 Toast Success
    }

    if (success) {
      handleCloseModal();
    } else {
      addToast('Ocurrió un error al guardar', 'error'); // 👈 Toast Error
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Catálogo de Productos y Servicios</h1>
        <button onClick={handleOpenCreate} className={styles.addButton}>+ Nuevo Ítem</button>
      </header>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSearch} className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar producto o servicio..."
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
              <th>ID</th>
              <th>Nombre del Servicio/Producto</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && products.length === 0 ? (
              <TableSkeleton rows={5} columns={4} />
            ) : products.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No se encontraron productos.</td></tr>
            ) : (
              products.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>
                    {/* Formateamos el precio como moneda local */}
                    ${Number(producto.precio).toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.btnEdit} onClick={() => handleOpenEdit(producto)}>Editar</button>
                      <button className={styles.btnDelete} onClick={() => handleDelete(producto.id, producto.nombre)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProductForm 
          initialData={productToEdit} 
          onSubmit={handleFormSubmit} 
          onCancel={handleCloseModal}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default Productos;