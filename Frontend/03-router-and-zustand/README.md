# LaburoDev — Frontend

Bolsa de trabajo para desarrolladores. React + Vite + react-router + zustand.

## Correr

```bash
npm install
npm run dev
```

La app consume la API en `http://localhost:3000/jobs` (ver `Backend/NodeJs y express/express`).

## Rutas

- `/` home + buscador
- `/search` resultados con filtros y paginación
- `/jobs/:jobId` detalle
- `/login`, `/register`, `/profile` (mock local con zustand, sin backend todavía)
