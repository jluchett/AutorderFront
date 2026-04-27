# 🔐 Guía de Autenticación con Tokens

## Flujo General

```
Login
  ↓
Backend genera JWT
  ↓
Frontend recibe { user, token }
  ↓
Guardar token en localStorage
  ↓
Incluir token en headers de todas las requests
  ↓
Si 401 → Token expirado → Logout automático → Redirect a /login
```

---

## 🔧 Implementación en Frontend

### 1. **apiClient.js** - Cliente HTTP

```javascript
// Automáticamente agrega token en headers
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};
```

**Características:**
- ✅ Token auto-incluido en headers
- ✅ Manejo automático de 401 → logout
- ✅ Timeout configurable
- ✅ Errores consistentes

### 2. **loginUser()** - API

```javascript
export const loginUser = async (id, password) => {
  const response = await apiClient.post("/auth/login", { id, password });
  
  // Guardar token en localStorage
  if (user && token) {
    user.token = token;
    localStorage.setItem("user", JSON.stringify(user));
    apiClient.setAuthToken(token);
  }
  
  return user;
};
```

### 3. **authService.js** - Utilidades

```javascript
// Obtener token actual
authService.getToken();

// Verificar si está autenticado
authService.isAuthenticated();

// Obtener información del token
authService.getTokenInfo();

// Segundos hasta expiración
authService.getSecondsTillExpiration();

// Logout
authService.clearAuth();
```

### 4. **App.jsx** - Configuración Global

```javascript
useEffect(() => {
  // Configurar callback para 401 (token expirado)
  apiClient.setUnauthorizedCallback(() => {
    logout(); // Limpia state
    // Router automáticamente redirige a /login
  });
}, [logout]);

// Recovery de sesión al cargar app
const storedUser = localStorage.getItem("user");
if (storedUser?.token) {
  login(userData); // Restaura sesión
}
```

---

## 📋 Respuesta del Backend Esperada

### Login Response
```json
{
  "user": {
    "id": "123",
    "name": "Juan",
    "email": "juan@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

O también soporta:
```json
{
  "user": {
    "id": "123",
    "name": "Juan",
    "email": "juan@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🔄 Flujo de una Request Autenticada

```
1. Usuario hace click → Component
   
2. Component llama API
   const data = await actualUsers();
   
3. API usa apiClient
   apiClient.get("/users/")
   
4. apiClient obtiene token
   const token = this.getAuthToken();
   
5. apiClient agrega token en headers
   headers: { 'Authorization': `Bearer ${token}` }
   
6. apiClient hace fetch
   fetch(url, { headers, ... })
   
7. Backend valida token
   ↓ Si válido → Procesa request
   ↓ Si expirado → Retorna 401
   
8. Frontend recibe response
   ↓ 401 → apiClient.setUnauthorizedCallback()
        → logout() en store
        → Router redirige a /login
   ↓ 200 → Retorna datos
```

---

## 💾 Estructura de localStorage

```javascript
// Después de login exitoso:

localStorage: {
  "user": {
    "id": "123",
    "name": "Juan",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🛡️ Seguridad - JWT Tokens

### Estructura JWT
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Parte 1: Header   → { "alg": "HS256", "typ": "JWT" }
Parte 2: Payload  → { "sub": "123", "name": "John", "iat": 1516 }
Parte 3: Signature → Validado por backend
```

### Información Disponible en Token
```javascript
// Decodificar token (sin verificar firma)
const info = authService.getTokenInfo();

// Retorna:
{
  subject: "user_id",
  issued: Date,
  expires: Date,
  issuer: "backend.com",
  audience: "frontend"
}
```

### Verificar Expiración
```javascript
// Verificar si expira en próximos 5 minutos
if (authService.isTokenExpiring(5)) {
  console.log("Token a punto de expirar");
  // Aquí se podría implementar refresh token
}

// Segundos hasta expiración
const seconds = authService.getSecondsTillExpiration();
console.log(`Token expira en ${seconds} segundos`);
```

---

## 🔄 Manejo de Token Expirado

### Automático (Implementado)
```
1. Request con token expirado
   ↓
2. Backend retorna 401
   ↓
3. apiClient detecta 401
   ↓
4. apiClient ejecuta callback
   ↓
5. logout() en store
   ↓
6. localStorage limpiado
   ↓
7. Router redirige a /login
   ↓
8. Usuario ve login nuevamente
```

### Con Refresh Token (Futuro)
```javascript
// Próxima mejora a implementar:
if (error.status === 401) {
  const refreshed = await refreshToken();
  if (refreshed) {
    // Reintentar request original
    return apiClient.request(endpoint, options);
  } else {
    // Logout
    logout();
  }
}
```

---

## 📝 Ejemplo de Uso

### En Componentes

```javascript
import { authService } from '../services/authService';

const MyComponent = () => {
  // Obtener token actual
  const token = authService.getToken();
  
  // Verificar si está autenticado
  if (!authService.isAuthenticated()) {
    return <Redirect to="/login" />;
  }
  
  // Ver cuándo expira
  const expires = authService.getTokenInfo()?.expires;
  console.log(`Token expira a las: ${expires}`);
  
  // Mostrar tiempo hasta expiración
  const seconds = authService.getSecondsTillExpiration();
  return <div>Sesión válida por {seconds} segundos</div>;
};
```

### En API Calls

```javascript
import { authService } from '../services/authService';
import { apiClient } from '../services/apiClient';

// Todas las requests automáticamente incluyen token
const data = await apiClient.get("/users/");

// No necesitas hacer nada especial, el token se agrega automáticamente
```

### Para Logout

```javascript
import { authService } from '../services/authService';
import useStore from '../store';

const handleLogout = () => {
  // Opción 1: Usar store (recomendado)
  const logout = useStore((s) => s.logout);
  logout(); // Limpia localStorage y state
  
  // Opción 2: Directamente (si no usas store)
  authService.clearAuth();
};
```

---

## ⚠️ Checklist de Seguridad

- ✅ Token guardado en localStorage (en futuro usar HttpOnly en backend)
- ✅ Token incluido en Authorization header
- ✅ 401 detectado y maneja automáticamente
- ✅ Logout limpia token y localStorage
- ✅ App redirige a /login si no hay token
- ⚠️ TODO: Implementar refresh token
- ⚠️ TODO: HTTPS obligatorio en producción
- ⚠️ TODO: CSP headers para proteger contra XSS

---

## 🐛 Debugging

### Ver Token en Consola
```javascript
// En DevTools Console:
localStorage.getItem('authToken')
// O
JSON.parse(localStorage.getItem('user')).token
```

### Decodificar Token
```javascript
// En DevTools Console:
const token = localStorage.getItem('authToken');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload);
```

### Ver si está autenticado
```javascript
// En DevTools Console:
import { authService } from './src/services/authService';
authService.isAuthenticated()  // true/false
authService.getToken()         // Token string
authService.getTokenInfo()     // Información del token
```

---

## 🚨 Troubleshooting

### "401 Unauthorized" en todo
**Causa:** Token no está siendo enviado o está expirado

**Solución:**
```javascript
// Verificar que el token existe
authService.getToken()

// Verificar que se envía en headers
// Abre DevTools → Network → Click request → Headers
// Busca "Authorization: Bearer ..."

// Si no está, el backend no lo está procesando
```

### "Token no se guarda"
**Causa:** `loginUser()` no está guardando correctamente

**Solución:**
```javascript
// Verificar que loginUser retorna usuario con token
const user = await loginUser(id, password);
console.log(user.token); // Debe tener token

// Verificar que se guardó en localStorage
console.log(localStorage.getItem('user'));
```

### "Se logout automáticamente"
**Causa:** Token expirado o 401 del backend

**Solución:**
```javascript
// Verificar expiración
authService.getSecondsTillExpiration();

// Verificar que el backend está retornando 401
// DevTools → Network → Ver response status
```

---

## 📊 Flujo Completo de Sesión

```
┌─────────────────────────────────────────┐
│ 1. Usuario Abre App                     │
├─────────────────────────────────────────┤
│ App.jsx intenta recuperar sesión        │
│ localStorage.getItem('user')            │
│ ↓                                        │
│ Si tiene token → login(user)            │
│ Si no → Redirige a /login               │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ 2. Usuario Hace Login                   │
├─────────────────────────────────────────┤
│ Usuario ingresa id/password             │
│ ↓                                        │
│ loginUser(id, password)                 │
│ ↓                                        │
│ apiClient.post("/auth/login", ...)      │
│ ↓                                        │
│ Backend valida y retorna token          │
│ ↓                                        │
│ Guardar en localStorage + apiClient     │
│ ↓                                        │
│ login(user) en store                    │
│ ↓                                        │
│ Redirige a /home                        │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ 3. Usuario Navega Aplicación            │
├─────────────────────────────────────────┤
│ Cada request:                           │
│ ↓                                        │
│ apiClient.get("/users/", ...)           │
│ ↓                                        │
│ Agregar token en headers                │
│ ↓                                        │
│ fetch(url, { headers })                 │
│ ↓                                        │
│ Si 401 → logout automático              │
│ Si 200 → Mostrar datos                  │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ 4. Token Expira                         │
├─────────────────────────────────────────┤
│ Request con token expirado              │
│ ↓                                        │
│ Backend retorna 401                     │
│ ↓                                        │
│ apiClient detecta 401                   │
│ ↓                                        │
│ logout() - limpia localStorage          │
│ ↓                                        │
│ Router redirige a /login                │
│ ↓                                        │
│ Usuario hace login nuevamente           │
└─────────────────────────────────────────┘
```

---

**Última actualización:** Abril 2026

Para más información sobre API, ver [README.md](../README.md)
