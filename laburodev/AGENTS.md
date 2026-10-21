# Reglas del proyecto — laburoDev

Bolsa de trabajos para desarrolladores. Frontend (React + Vite) y API (Express 5) desplegadas en Vercel.

## Estructura

- **Paquetes independientes**: `frontend/` y `backend/` son hermanos, sin npm workspaces. Cada uno tiene su `package.json`, su lockfile y su `node_modules`.
- `frontend/` — Vite + React 19 + SWC + Zustand + React Router.
- `backend/` — Express 5 + Zod, persistencia en `jobs.json` (todavía no hay base de datos).

## Comandos

```bash
# API (desde laburodev/backend/)
npm start          # node app.js, API en :3000
npm test           # node --test: app.test.js (CRUD, filtros, paginación, errores)

# Frontend (desde laburodev/frontend/)
npm run dev        # :5173 · npm run build · npm run lint
npm run test:ai    # tests con agente Stagehand (ver abajo)
```

En PowerShell usar `npm.cmd` si la policy de ejecución bloquea `npm`.

## Setup en Windows

Si al reinstalar `@swc/core` falla con *"Failed to load native binding"* (permisos DACL del perfil), el fix es forzar `@swc/core` a `1.13.5`. Hoy resuelve solo, pero si vuelve a pasar: agregar `overrides` en `frontend/package.json`.

## Convenciones

- `"type": "module"` en ambos paquetes: imports relativos con `.js`.
- Zod valida en **controllers** (backend); no duplicar validación en las rutas.
- Frontend: la **URL manda** el estado de búsqueda y filtros (`useSearchParams`); nunca escribir params desde efectos.
- Diseño: leer `frontend/DESIGN-SYSTEM.md` antes de tocar UI (tokens, Bricolage Grotesque, lucide-react, cero emoji).

## Tests con agente (`frontend/ai-e2e/`)

Prereq: API en `:3000` + front en `:5173` + `AI_API_KEY` en `frontend/.env` (gitignoreado). Modelo con `AI_MODEL` (default `google/gemini-3.1-flash-online`).

Gotchas de Stagehand v4:

- `Stagehand.create({ browser, model })` + `localBrowser.launch()`. No existe `agent()`.
- `extract()` devuelve `{ data, metadata }`: desestructurar `data`.
- El `page` **no** es un Page de Playwright: no tiene `waitForURL` ni `getByRole`. Usar `page.evaluate(condicion)` con polling propio (ver el helper `esperar()` en `frontend/ai-e2e/test-laburodev.js`).
- **Siempre** `await browser.close()` además de `stagehand.close()`: si no, el proceso queda colgado y no termina.
- Un `act` con dos instrucciones hace solo la primera (tipea y no aprieta el botón): un `act` por paso.
- Las instrucciones tienen que ser literales; con ambigüedad el modelo devuelve el dato equivocado.

## Deploy (Vercel)

Dos projects separados, uno por paquete. Root Directory: `laburodev/frontend` y `laburodev/backend`.

- Frontend: `vercel.json` con rewrite SPA; `VITE_API_URL` en build.
- API: `FRONTEND_URL` en runtime (URLs separadas por coma, tolera slash final) para CORS, más `PORT`.