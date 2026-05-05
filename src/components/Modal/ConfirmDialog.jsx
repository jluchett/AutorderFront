import { useConfirmStore } from '../../stores/confirmStore';
import modalStyles from './Modal.module.css';

export const ConfirmDialog = () => {
  const { isOpen, title, message, confirmText, cancelText, isDanger, onConfirm, onCancel } = useConfirmStore();

  if (!isOpen) return null;

  return (
    <div className={modalStyles.overlay} onClick={onCancel} style={{ zIndex: 10000 }}>
      <div 
        className={modalStyles.modal} 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '400px', padding: '1.5rem', textAlign: 'center' }}
      >
        <h2 style={{ marginBottom: '1rem', color: isDanger ? 'var(--error-color)' : 'var(--primary-color)' }}>
          {title}
        </h2>
        
        <p style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            onClick={onCancel} 
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--text-secondary)',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm} 
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: isDanger ? 'var(--error-color)' : 'var(--secondary-color)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};