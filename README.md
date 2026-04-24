# Autorder Front

Aplicación frontend para gestión de órdenes, vehículos, clientes, productos y usuarios.

**Stack:** React 18 + Vite + Zustand + React Router

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 16+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd AutorderFront

# Instalar dependencias
npm install
```

### Configuración

1. **Crear `.env.local`** (no se commitea):
```bash
cp .env .env.local
```

2. **Editar `.env.local`** con tu configuración local:
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_API_TIMEOUT=10000
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3003](http://localhost:3003) en tu navegador.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ErrorBoundary.jsx   # Captura errores de React
│   ├── HeaderBar.jsx
│   ├── Body.jsx
│   ├── Footer.jsx
│   └── Info*.jsx           # Componentes de información
│
├── pages/              # Páginas (una por ruta)
│   ├── Login.jsx
│   ├── Home.jsx
│   ├── Users.jsx, Clients.jsx, etc.
│   ├── *Detail.jsx     # Páginas de detalles
│   └── Add*.jsx        # Páginas de formularios
│
├── services/           # Servicios (API, validación)
│   ├── apiClient.js    # Cliente HTTP centralizado
│   └── validation.js   # Funciones de validación
│
├── hooks/              # Custom hooks
│   └── useApi.js       # Hooks para operaciones async
│
├── styles/             # Estilos CSS
│
├── store.jsx           # Store global (Zustand)
├── api.jsx             # Funciones API (usa apiClient)
├── App.jsx             # Router principal
└── main.jsx            # Punto de entrada

.env                    # Variables (commitear)
.env.local              # Variables locales (NO commitear)
.env.production         # Variables producción (commitear)
```

---

## 🔧 Configuración

### Variables de Entorno

```env
# URL del backend
VITE_API_BASE_URL=http://192.168.1.18:3001

# Timeout para requests (ms)
VITE_API_TIMEOUT=10000
```

### Desarrolladores locales

```bash
# .env.local (NO commitear)
VITE_API_BASE_URL=http://localhost:3001
```

### Producción

```bash
# .env.production (commitear)
VITE_API_BASE_URL=https://api.autorder.com
VITE_API_TIMEOUT=15000
```

---

## 📚 Guía de Uso

### Hacer una llamada API

```javascript
import { apiClient } from './services/apiClient';

// GET
const data = await apiClient.get('/users/');

// POST
const result = await apiClient.post('/auth/login', {
  id: 'user@example.com',
  password: 'password123'
});

// PUT
const updated = await apiClient.put('/users/1', { name: 'John' });

// DELETE
await apiClient.delete('/users/1');
```

### Usar funciones API existentes

```javascript
import { actualUsers, getErrorMessage } from './api';
import { ApiError } from './services/apiClient';

try {
  const users = await actualUsers();
} catch (error) {
  const userMessage = getErrorMessage(error);
  console.error(userMessage);
}
```

### Usar el Store (Zustand)

```javascript
import useStore from './store';

const MyComponent = () => {
  const user = useStore((state) => state.user);
  const setUsers = useStore((state) => state.setUsers);
  const setError = useStore((state) => state.setError);
  
  return <div>Bienvenido, {user.name}</div>;
};
```

### Hooks para Async

```javascript
import { useApiData, useMutation } from './hooks/useApi';
import { actualUsers, addUser } from './api';

// Cargar datos
const Users = () => {
  const { data: users, loading, error, reload } = useApiData(
    actualUsers,
    'users',
    'setUsers'
  );
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{users.map(u => <div key={u.id}>{u.name}</div>)}</div>;
};

// Mutación (POST, PUT, DELETE)
const AddUserForm = () => {
  const { execute, loading, error } = useMutation(addUser);
  
  const handleSubmit = async (userData) => {
    try {
      await execute(userData);
      alert('Usuario agregado');
    } catch (err) {
      // error ya está en state
    }
  };
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({});
    }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button disabled={loading}>
        {loading ? 'Cargando...' : 'Agregar'}
      </button>
    </form>
  );
};
```

### Validaciones

```javascript
import { validation } from './services/validation';

// Email
if (!validation.isValidEmail(email)) {
  setError('Email inválido');
}

// Password
if (!validation.isValidPassword(password)) {
  setError('Mínimo 6 caracteres');
}

// Form completo
const { isValid, errors } = validation.validateLoginForm(id, password);
if (!isValid) {
  setErrors(errors); // { id: "...", password: "..." }
}
```

---

## 🔐 Seguridad

### Token de Autenticación

El cliente automáticamente incluye el token en headers:
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

El token se obtiene de localStorage después del login.

### Logout

```javascript
const logout = useStore((state) => state.logout);

logout(); // Limpia localStorage y state
```

### XSS Prevention

- React escapa automáticamente el HTML
- No usar `dangerouslySetInnerHTML`
- Usar DOMPurify si necesitas renderizar HTML de usuarios

---

## 🐛 Debugging

### Errores de Conexión

```javascript
// Error 408: Timeout
// Error 401: Credenciales inválidas
// Error 403: Sin permisos
// Error 404: No encontrado
// Error 500: Error servidor

import { getErrorMessage } from './api';

try {
  await actualUsers();
} catch (error) {
  console.error(getErrorMessage(error)); // Mensaje amigable
  console.error(error.status); // Código HTTP
}
```

### Error Boundary

Si algo falla, se mostrará página de error en lugar de blanco.

En desarrollo, muestra detalles del error.

### DevTools

- React DevTools (extensión Chrome)
- Redux DevTools (Zustand es compatible)

---

## 📦 Dependencias

- **react**: UI
- **react-router-dom**: Routing
- **zustand**: State management
- **vite**: Build tool
- **react-pdf**: PDF rendering

---

## ✅ Checklist Desarrollo

- [ ] Crear `.env.local` con config local
- [ ] `npm install`
- [ ] `npm run dev`
- [ ] Verificar que Login funciona
- [ ] Probar desconexión
- [ ] Verificar que se guardan tokens

---

## 🤝 Contribuir

1. Crear rama: `git checkout -b feature/mi-feature`
2. Commit: `git commit -m 'Add feature'`
3. Push: `git push origin feature/mi-feature`
4. PR

---

## 📖 Documentación

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 📝 Mejoras Implementadas

Ver [IMPROVEMENTS.md](./IMPROVEMENTS.md) para detalles de cambios de seguridad y arquitectura.

---

## 📞 Soporte

Para problemas, abre un issue o contacta al equipo.

---

**Última actualización:** Abril 2026
