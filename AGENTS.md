# AGENTS.md — FullStack

Repo de aprendizaje fullstack (Node/Express + React). El proyecto desplegado vive en `laburodev/`; el resto es material del curso.

## Estructura

- **`laburodev/`** — proyecto desplegado en Vercel, dos paquetes independientes: `frontend/` (React + Vite) y `backend/` (Express 5). Cada uno con su `package.json`, lockfile y `node_modules`. **Sus reglas propias están en `laburodev/AGENTS.md`. Acá se trabaja.**
- `Backend/node-express/fundamentos-nodejs/` — ejercicio `node:http` (`server.js`), no es la API.
- `Backend/PostreSQL/tutorial documentacion/` — notas de SQL del tutorial oficial.
- `Backend/Roadmap.txt` — plan de 6 etapas (ver abajo).
- No hay CI ni `opencode.json`.

## Comandos

```bash
# API Express (desde laburodev/backend/)
npm start          # node app.js, API en :3000
npm run dev        # node --watch app.js
npm test           # node --test: app.test.js (CRUD, filtros, paginación, errores)

# Frontend (desde laburodev/frontend/)
npm run dev        # :5173 · npm run build · npm run lint
npm run test:ai    # tests con agente Stagehand (ver laburodev/AGENTS.md)
```

En PowerShell usar `npm.cmd` si la policy de ejecución bloquea `npm`.

## Gotchas que cuestan ciclos

- Los tests con Stagehand v4 necesitan `await browser.close()` además de `stagehand.close()`: si no, el proceso queda colgado. Detalle completo en `laburodev/AGENTS.md`.
- `extract()` de Stagehand v4 devuelve `{ data, metadata }`, y su `page` no es un Page de Playwright (no tiene `waitForURL` ni `getByRole`).
- Las carpetas con espacios rompen Vercel (por eso `node-express`, no `NodeJs y express`).
- En Windows, reinstalar `@swc/core` puede fallar con *"Failed to load native binding"* (permisos DACL). Fix: forzar `@swc/core` a `1.13.5` via `overrides` en `frontend/package.json`.

## Convenciones

- ESM (`"type": "module"`) en los paquetes: imports relativos con `.js`.
- Zod valida en **controllers** (backend); no duplicar validación en las rutas.
- Frontend: la **URL manda** el estado de búsqueda y filtros (`useSearchParams`); nunca escribir params desde efectos.
- Diseño frontend: leer `frontend/DESIGN-SYSTEM.md` antes de tocar UI (tokens, Bricolage Grotesque, lucide-react, cero emoji).

## IA — Resumen de empleos (`laburodev/backend/routes/ai.js`)

- Endpoint: `GET /ai/summary/:id` — streaming con Vercel AI SDK + Gemini (`gemini-3.5-flash-lite`).
- Rate limit específico: 5 req/min/IP + rate limit global 100 req/15 min/IP.
- Validación Zod en params (`id` UUID).
- Prompt adaptado a estructura de job (`title`, `company`, `location`, `data.level`, `data.technology`, `content.description`).
- Modelo configurable via `MODEL_AI` en `.env`.
- Requiere `GOOGLE_GENERATIVE_AI_API_KEY` en `.env` (obtener en https://aistudio.google.com/apikey).

Frontend:
- Hook: `hooks/useAISummary.jsx` — fetch streaming con `ReadableStream`.
- Componente: `components/AISummary.jsx` — botón generar/regenerar + `Streamdown` para markdown animado.
- Integrado en `pages/Detail.jsx` tras el header.

1. **ETAPA 1** — SQL + PostgreSQL (tutorial oficial + práctica)
2. **ETAPA 2** — Node + Express + TypeScript (curso JSCamp + docs Express 5)
3. **ETAPA 3** — KIO: Backend inicial (modelado PG, REST, CRUD, auth, transacciones, etc.)
4. **ETAPA 4** — Profundización con libros (PostgreSQL: Up and Running, Web Dev with Node/Express)
5. **ETAPA 5** — Arquitectura + calidad (Node.js Design Patterns, testing, Docker, migrations, logging, deploy)
6. **ETAPA 6** — ORM (Drizzle / Prisma)

## Deploy (Vercel)

Dos projects separados, uno por paquete. Root Directory: `laburodev/frontend` y `laburodev/backend`.

- Frontend: `vercel.json` con rewrite SPA; `VITE_API_URL` en build.
- API: `FRONTEND_URL` en runtime (URLs separadas por coma, tolera slash final) para CORS, más `PORT`.