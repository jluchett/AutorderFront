# ⚡ Quick Start - Comienza en 5 Minutos

## 1️⃣ Instalación (1 minuto)

```bash
# Clonar y entrar
git clone <repo>
cd AutorderFront

# Instalar
npm install
```

## 2️⃣ Configuración (1 minuto)

```bash
# Copiar template
cp .env .env.local

# Editar con tu IP/puerto del backend
# Linux/Mac
nano .env.local

# Windows
notepad .env.local
```

**Contenido básico:**
```env
VITE_API_BASE_URL=http://192.168.1.18:3001
```

## 3️⃣ Ejecutar (1 minuto)

```bash
npm run dev
```

Abre: http://localhost:3003

## 4️⃣ Probar (2 minutos)

1. Ir a Login
2. Ingresar credenciales
3. Verificar que redirige a Home
4. Hacer logout

---

## 🔥 Comandos Principales

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Inicia servidor desarrollo |
| `npm run build` | Genera build producción |
| `npm run preview` | Prueba build localmente |
| `npm run lint` | Valida código |

---

## 📍 Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `.env.local` | **EDITA ESTO** - Tu config local |
| `src/App.jsx` | Rutas de la app |
| `src/pages/Login.jsx` | Página de login |
| `src/services/apiClient.js` | Cliente HTTP |
| `src/store.jsx` | Estado global |

---

## 🚨 Problemas Comunes

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "VITE_API_BASE_URL is undefined"
```bash
# Verificar que .env.local existe
ls -la .env.local

# Si no existe:
cp .env .env.local
```

### "Backend connection refused"
```bash
# Backend debe estar corriendo en el puerto 3001
# Verifica que esté iniciado

# Intenta conectar manualmente:
curl http://192.168.1.18:3001/health
```

### "Port 3003 already in use"
```bash
# Cambiar puerto en vite.config.js
# O matar el proceso anterior:

# Linux/Mac
lsof -i :3003
kill -9 <PID>

# Windows
netstat -ano | findstr :3003
taskkill /PID <PID> /F
```

---

## 💡 Tips Rápidos

### Debug en consola
```javascript
// Browser DevTools Console
localStorage  // Ver datos guardados
useStore((s) => s)  // Ver estado (si tienes el objeto)
```

### Ver requests
```
Browser DevTools → Network
Ver todas las llamadas HTTP
```

### Limpiar sesión
```javascript
// En consola del navegador
localStorage.clear()
location.reload()
```

---

## 🎯 Flujo Típico de Desarrollo

```
1. Editar componente
        ↓
2. Guardar archivo (hot reload automático)
        ↓
3. Ver cambios en navegador
        ↓
4. Abrir DevTools para debuggear
        ↓
5. Commit y push (cuando esté listo)
```

---

## 📚 Documentación Rápida

**Para nuevas personas:**
1. Lee: [README.md](./README.md)
2. Lee: [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
3. Mira: [ARCHITECTURE.md](./ARCHITECTURE.md)

**Para cambios de seguridad:**
- Lee: [SECURITY.md](./SECURITY.md)

**Para entender mejoras:**
- Lee: [IMPROVEMENTS.md](./IMPROVEMENTS.md)
- Lee: [RESUMEN.md](./RESUMEN.md)

---

## ✅ Checklist de Inicio

```
[ ] Git clone completado
[ ] npm install sin errores
[ ] .env.local creado
[ ] Backend está corriendo
[ ] npm run dev funciona
[ ] Puedo acceder a localhost:3003
[ ] Login funciona
[ ] No hay errores en consola
```

---

## 🤝 Necesitas Ayuda?

1. **Problema técnico** → Revisar MIGRATION_GUIDE.md
2. **Pregunta sobre API** → Revisar README.md
3. **Entender código** → Revisar ARCHITECTURE.md
4. **Seguridad** → Revisar SECURITY.md

---

## 🚀 Próximo Paso

Una vez que todo funciona:

```bash
# Haz cambios
git checkout -b feature/tu-feature

# Cuando esté listo
git add .
git commit -m "Add feature"
git push origin feature/tu-feature
```

---

**¡Listo! Ahora a desarrollar 🎉**

Cualquier duda: abre un issue o pregunta en el chat del equipo.
