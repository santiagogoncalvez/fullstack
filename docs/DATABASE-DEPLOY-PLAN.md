# Plan de Arquitectura de Base de Datos y Despliegue (SQLite + Turso + Northflank)

## 🎯 Objetivo
Configurar el backend de Express para utilizar **SQLite** mediante **Turso (libSQL)** en la nube, permitiendo persistencia de datos real, **Database Branching** (ramas `dev` y `main`) y despliegue continuo en un Web Service (Northflank/Koyeb/Render), reemplazando el uso de archivos locales (`jobs.json`).

---

## 🏗️ Estructura de Entornos y Base de Datos

1. **Plataforma DB:** **Turso (libSQL / Cloud SQLite)**
   - **Rama `main`**: Base de datos de Producción (remota).
   - **Rama `dev`**: Base de datos de Desarrollo (remota o local).
2. **Web Service (API):** **Northflank** / **Koyeb** / **Render**
   - Servidor Node.js/Express totalmente stateless (sin archivos `.sqlite` ni `.json` locales dependientes en el contenedor).

---

## 💻 Configuración en el Proyecto (`laburodev/backend`)

### 1. Dependencias necesarias
Instalar el cliente oficial de Turso para SQLite en Node.js (soporta ESM y consultas preparadas seguras):
```bash
npm install @libsql/client
```

### 2. Variables de Entorno (`.env`)
- **Local (`laburodev/backend/.env`)**:
  ```env
  TURSO_DATABASE_URL="libsql://mi-base-dev-usuario.turso.io"
  TURSO_AUTH_TOKEN="token_dev"
  ```
  *(Opcional para desarrollo offline sin internet: `file:local.db`)*
- **Producción (Panel de Northflank / Koyeb / Render)**:
  ```env
  TURSO_DATABASE_URL="libsql://mi-base-main-usuario.turso.io"
  TURSO_AUTH_TOKEN="token_prod"
  ```

### 3. Módulo de Conexión (`laburodev/backend/db/index.js`)
```javascript
import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
```

---

## 📁 Semillas, Esquema y Migraciones (`laburodev/backend/db/`)

Archivos requeridos en el repositorio para control de versiones y sincronización de esquema:

1. **`laburodev/backend/db/schema.sql`**: Definición de tablas relacionales (`jobs`, índices y relaciones).
2. **`laburodev/backend/db/seed.sql`**: Datos iniciales de prueba y migración del contenido de `jobs.json`.
3. **Script de inicialización / seeding**:
   - Agregar comando en `package.json`:
     ```json
     "scripts": {
       "db:seed": "node db/seed.js"
     }
     ```
   - El script `seed.js` leerá `schema.sql` y `seed.sql` y ejecutará `db.executeMultiple(...)` contra Turso.

---

## 🛡️ Seguridad y Buenas Prácticas
- **Prevención de Inyección SQL**: Todas las consultas en `JobModel` deben realizarse exclusivamente mediante sentencias parametrizadas (`?` o parámetros con nombre `:param` / `@param`). Nunca concatenar strings con datos provenientes del usuario (`req.query` o `req.body`).
- **Compatibilidad con la API existente**: Mantener la interfaz de `JobModel` intacta (`getAll`, `getById`, `create`, `update`, `delete`) para que los controladores, middlewares de rate limit, endpoint de IA (`/ai/summary/:id`) y tests pasen sin modificaciones de contrato.

---

## 📋 Checklist de Ejecución Futura
- [x] Crear y guardar documento de arquitectura (`docs/DATABASE-DEPLOY-PLAN.md`).
- [ ] Crear base de datos y branches en Turso (`main` y `dev`).
- [ ] Instalar `@libsql/client` en `laburodev/backend`.
- [ ] Definir `backend/db/schema.sql` y `backend/db/seed.js`.
- [ ] Ejecutar migración inicial de datos desde `jobs.json` a Turso `dev`.
- [ ] Refactorizar `backend/models/jobs.js` para consumir `db` de libSQL con queries seguras.
- [ ] Validar tests de integración (`npm test`).
- [ ] Configurar variables de entorno y despliegue en Northflank/Koyeb.
