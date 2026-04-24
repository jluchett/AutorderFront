# 🔄 Guía de Migración para Desarrolladores

Esta guía te ayudará a actualizar tu código local con las nuevas mejoras.

---

## ✅ Requisitos Previos

- [ ] Git actualizado
- [ ] Node.js 16+
- [ ] npm o yarn

---

## 📥 Paso 1: Obtener los Cambios

```bash
# Actualizar desde el repositorio
git pull origin main

# Instalar dependencias nuevas (si las hay)
npm install
```

---

## 🔧 Paso 2: Crear .env.local

```bash
# Copiar template de .env
cp .env .env.local
```

**Editar `.env.local` con tu configuración local:**

```env
# Para desarrollo local con backend en localhost
VITE_API_BASE_URL=http://localhost:3001
VITE_API_TIMEOUT=10000
```

**O para desarrollo en la LAN:**

```env
# Para desarrollo en la LAN con IP local
VITE_API_BASE_URL=http://192.168.1.18:3001
VITE_API_TIMEOUT=10000
```

⚠️ **IMPORTANTE:** `.env.local` NO debe hacer commit (está en .gitignore)

---

## 📝 Paso 3: Actualizar Código Existente

Si tienes componentes que usan el `api.jsx` antiguo, actualízalos:

### Antes:
```javascript
import { actualUsers } from '../api';

const MyComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    actualUsers()
      .then(users => setUsers(users))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);
};
```

### Después (Opción 1 - Con Hook):
```javascript
import { useApiData } from '../hooks/useApi';
import { actualUsers } from '../api';

const MyComponent = () => {
  const { data: users, loading, error, reload } = useApiData(
    actualUsers,
    'users',
    'setUsers'
  );
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* ... */}</div>;
};
```

### Después (Opción 2 - Manual):
```javascript
import { actualUsers, getErrorMessage } from '../api';
import useStore from '../store';

const MyComponent = () => {
  const [users, setUsers] = useState([]);
  const setLoading = useStore(s => s.setLoading);
  const setError = useStore(s => s.setError);
  
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await actualUsers();
        setUsers(data);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);
};
```

---

## 🔐 Paso 4: Validar Cambios

### Ejecutar el servidor
```bash
npm run dev
```

Abre [http://localhost:3003](http://localhost:3003)

### Pruebas manuales

1. **Login**
   - [ ] Campos vacíos → Validación funciona
   - [ ] Contraseña corta → Error mostrado
   - [ ] Credenciales válidas → Login exitoso

2. **Errores**
   - [ ] Desconectar backend → Error amigable
   - [ ] Esperar timeout → "Solicitud tardó demasiado"
   - [ ] Error 401 → "Credenciales inválidas"

3. **Sesión**
   - [ ] Recargar página → Mantiene sesión
   - [ ] Logout → Limpia localStorage
   - [ ] Logout + Recargar → Redirige a login

4. **Componentes**
   - [ ] No hay errores en consola
   - [ ] Datos cargandocorrectamente
   - [ ] Errores mostrados amigablemente

---

## 🆘 Solución de Problemas

### Error: "Cannot find module 'apiClient'"

```bash
# Verifica que exista el archivo
ls src/services/apiClient.js

# Si no existe, actualiza desde git
git pull origin main
npm install
```

---

### Error: "VITE_API_BASE_URL is undefined"

Crear `.env.local`:
```bash
cp .env .env.local
```

Editar con tu URL del backend.

---

### Error: "fetch failed" o "Cannot reach server"

1. Verificar que `.env.local` tiene URL correcta
2. Verificar que backend está corriendo
3. Verificar CORS en backend

```bash
# Backend debe estar escuchando
curl http://localhost:3001/health
```

---

### Error: "localhost:3001 refused connection"

```bash
# Backend no está corriendo
# Iniciar backend
cd ../AutorderBack
npm run dev
```

---

### localStorage muestra datos pero no funciona login

1. Limpiar localStorage
2. Limpiar cookies del navegador
3. Abrir en incógnito

```javascript
// En consola del navegador
localStorage.clear();
location.reload();
```

---

## 📦 Archivos Nuevos Importantes

```
.env                           # Variables de entorno (commitear)
.env.local                     # Tu config local (NO commitear)
src/services/apiClient.js      # Cliente HTTP centralizado
src/services/validation.js     # Funciones de validación
src/hooks/useApi.js            # Custom hooks
src/components/ErrorBoundary.jsx # Captura errores
```

---

## 🚀 Ejecutar en Producción

1. **Generar build**
   ```bash
   npm run build
   ```

2. **Preview**
   ```bash
   npm run preview
   ```

3. **Deploy**
   ```bash
   # Seguir instrucciones de tu servidor
   # (Vercel, Netlify, etc.)
   ```

---

## 📚 Referencia Rápida

### Usar apiClient
```javascript
import { apiClient } from './services/apiClient';

await apiClient.get('/endpoint');
await apiClient.post('/endpoint', data);
await apiClient.put('/endpoint', data);
await apiClient.delete('/endpoint');
```

### Usar Store
```javascript
import useStore from './store';

const loading = useStore(s => s.loading);
const setError = useStore(s => s.setError);
const user = useStore(s => s.user);
```

### Usar Validaciones
```javascript
import { validation } from './services/validation';

validation.isValidEmail(email);
validation.isValidPassword(password);
validation.validateLoginForm(id, password);
```

### Usar Hooks
```javascript
import { useApiData, useMutation } from './hooks/useApi';

const { data, loading, error, reload } = useApiData(fetchFn, key, setter);
const { execute, loading, error } = useMutation(mutationFn);
```

---

## ✅ Checklist Final

- [ ] `.env.local` creado con URL correcta
- [ ] Backend está corriendo
- [ ] `npm install` ejecutado
- [ ] `npm run dev` funciona
- [ ] Login funciona
- [ ] No hay errores en consola
- [ ] localStorage se limpia en logout
- [ ] Código antiguo actualizado a nuevos patrones

---

## 🎓 Tips Útiles

### Ver logs del apiClient
```javascript
// En apiClient.js, agregar después de cada request
console.log(`Request: ${endpoint}`, config);
console.log(`Response:`, data);
```

### Modo debug en Dev Tools
```javascript
// En main.jsx
window.__DEBUG__ = true;

// Luego en apiClient.js
if (window.__DEBUG__) {
  console.log('API Debug:', ...);
}
```

### Testing manual con Postman
```
GET http://localhost:3001/users/
Headers: 
  Authorization: Bearer YOUR_TOKEN
  Content-Type: application/json
```

---

## 💬 Preguntas Frecuentes

**P: ¿Debo cambiar mis componentes existentes?**  
R: No es obligatorio, pero se recomienda para consistencia.

**P: ¿Qué pasa si elimino .env.local?**  
R: El proyecto usará `.env` por defecto.

**P: ¿Puedo commitear .env.local?**  
R: NO, está en .gitignore. Usa `.env` para defaults.

**P: ¿Qué hacen los custom hooks?**  
R: Evitan repetir lógica de loading/error en componentes.

**P: ¿Es obligatorio TypeScript ahora?**  
R: No, pero se recomienda en futuro.

---

## 📞 Soporte

Si tienes problemas:
1. Revisar `README.md`
2. Revisar `SECURITY.md`
3. Revisar `IMPROVEMENTS.md`
4. Abrir issue en GitHub

---

**Última actualización:** Abril 2026  
¡Bienvenido a la versión mejorada! 🎉
