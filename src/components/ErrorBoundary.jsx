/**
 * Error Boundary - Componente que captura errores en React
 * Previene que la app se quede completamente en blanco si hay error
 */

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '500px',
          }}>
            <h1 style={{ color: '#d32f2f', marginTop: 0 }}>¡Oops! Algo salió mal</h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Ha ocurrido un error inesperado. Por favor, recarga la página.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                textAlign: 'left',
                backgroundColor: '#f0f0f0',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '20px',
                fontSize: '12px',
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Detalles del error
                </summary>
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  margin: '10px 0 0 0',
                }}>
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Volver a Inicio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
