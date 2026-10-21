# AGENTS.md — FullStack

Repo de aprendizaje fullstack (Node/Express + React). El proyecto desplegado vive en `laburodev/`; el resto es material del curso.

## Estructura

- **`laburodev/`** — el proyecto desplegado en Vercel, en dos paquetes independientes: `frontend/` (React + Vite) y `backend/` (Express 5). Cada uno con su `package.json`, lockfile y `node_modules`. Sus reglas propias están en `laburodev/AGENTS.md`. **Acá se trabaja.**
- `Backend/node-express/fundamentos-nodejs/` — ejercicio `node:http` (`server.js`), no es la API.
- `Backend/PostreSQL/tutorial documentacion/` y `Backend/Roadmap.txt` — notas de SQL y el plan de 6 etapas.
- No hay CI ni `opencode.json`.

## Comandos

```bash
cd laburodev/backend
npm start          # o npm run dev (node --watch), API en :3000
npm test           # node --test: app.test.js (CRUD, filtros, paginación, errores)

cd ../frontend
npm run dev        # :5173 · npm run build · npm run lint
npm run test:ai    # tests con agente Stagehand
```

No hay script `test` en el frontend: los E2E viven en `laburodev/frontend/e2e/` (Playwright) y `laburodev/frontend/ai-e2e/` (Stagehand).

## Gotchas que cuestan ciclos

- Los tests con Stagehand v4 necesitan `await browser.close()` además de `stagehand.close()`: si no, el proceso queda colgado. Detalle completo en `laburodev/AGENTS.md`.
- `extract()` de Stagehand v4 devuelve `{ data, metadata }`, y su `page` no es un Page de Playwright (no tiene `waitForURL` ni `getByRole`).
- Las carpetas con espacios rompen Vercel (por eso `node-express`, no `NodeJs y express`).

## Convenciones

- ESM (`"type": "module"`) en los paquetes: imports relativos con `.js`.
- Zod valida en **controllers** (backend); no duplicar validación en las rutas.