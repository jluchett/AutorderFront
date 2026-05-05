import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { AppRouter } from './router/AppRouter';
import { ToastContainer } from './components/Toast/ToastContainer';
import { ConfirmDialog } from './components/Modal/ConfirmDialog';
import './styles/index.css';

function App() {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>Cargando Autorder...</div>;
  }

  return (
    <div className="app-container">
      <ToastContainer />
      <ConfirmDialog />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;