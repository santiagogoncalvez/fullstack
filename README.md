# Full Stack — Camino a Backend

Repo de mi aprendizaje fullstack con profundización en backend.
Vengo de frontend y estoy construyendo base sólida de backend para un perfil fullstack con foco en frontend.

## 🎯 Objetivo

Pasar de usar APIs a **entender y construir un backend completo desde cero**: HTTP, Node, Express, SQL + PostgreSQL, REST, validación, errores, auth y tests.

Stack principal: Node.js · Express · PostgreSQL · SQL · JavaScript → TypeScript.

## 📍 Punto actual

Estoy en la parte práctica del curso https://www.jscamp.dev/ (`De cero a Full Stack con JavaScript`).

Hecho hasta ahora:

- `laburodev/backend/` — API REST de empleos `/jobs` con Express 5: `GET /jobs` con filtros (`text, title, level, type, technology`) + paginación (`limit/offset`), `GET /jobs/:id`, `POST /`, `PUT /:id`, `PATCH /:id`, `DELETE /:id`. Arquitectura `routes / controllers / models`, validación con Zod en controllers, CORS, `jobs.json` como persistencia temporal.
- `laburodev/frontend/` — app de empleos en React + Vite: router propio + `react-router`, `zustand` para auth y favoritos, búsqueda, paginación, login/register, rutas protegidas.
- `Backend/node-express/fundamentos-nodejs/` — servidor con `node:http`, rutas `/users` y `/health`, query params `limit/offset`, `POST /users`, `.env` con `PORT`.
- `Backend/PostreSQL/tutorial documentacion/` — inicio del tutorial oficial de PostgreSQL.

Ver detalle del plan completo en `Backend/Roadmap.txt`.

## 🛠️ Tecnologías

- Node.js + Express 5
- PostgreSQL + SQL
- React 19 + Vite + react-router + zustand
- JavaScript (TypeScript más adelante)

## 🏗️ Estructura

```text
laburodev/
  frontend/   # app DevJobs (React + Vite)
  backend/    # API jobs (Express, routes/controllers/models)
Backend/
  node-express/
    fundamentos-nodejs/  # node:http base
  PostreSQL/              # práctica SQL
  Roadmap.txt             # plan completo 6 etapas
```

## 🚀 Cómo correr

```bash
# API Express
cd laburodev/backend
npm install
node app.js
# GET http://localhost:3000/jobs

# Frontend
cd ../frontend
npm install
npm run dev
# http://localhost:5173

# Fundamentos Node
cd ../../Backend/node-express/fundamentos-nodejs
node server.js
```

## 🗺️ Siguiente

1. Terminar CRUD Express del curso (DELETE, validación con Zod, manejo de errores).
2. SQL + PostgreSQL fundamento suficiente para modelar.
3. Empezar KIO: `users, products, categories, sales, sale_items, cash_movements`.
4. Libros: `PostgreSQL: Up and Running`, `Web Development with Node and Express`, `Node.js Design Patterns`.

## 📚 Recursos

- https://www.jscamp.dev/
- Documentación oficial Express 5
- PostgreSQL Tutorial oficial
