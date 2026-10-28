# Health Check: Laburodev - 28/10/2026

## 1. Diagnóstico Técnico (Resumen @explore)
La arquitectura actual presenta riesgos críticos de escalabilidad y estabilidad:

- **Acoplamiento a JSON:** El modelo `jobs.js` parsea dinámicamente columnas de la base de datos. Un cambio en el esquema romperá la aplicación en tiempo de ejecución.
- **Persistencia en Turso (SQLite):** Aunque se ha migrado a Turso (SQLite distribuido), la capa de persistencia aún carece de abstracción suficiente, dejando lógica de acceso a datos dispersa en los modelos.
- **Riesgos de ejecución (sin TypeScript):**
    - Casting inseguro de objetos (posibles errores con valores `undefined` o `null`).
    - Mapeo manual de filas a objetos (error humano en nombres de campos).
    - Falta de validación estricta en filtros de parámetros de la API.

## 2. Plan de Acción (Estrategia @general)
Objetivo: Consolidar la persistencia en Turso y migrar a TypeScript de forma incremental, protegiendo la funcionalidad de IA existente.

### Fase 1: Optimización de Persistencia con Turso
1.  **Capa de Acceso a Datos (DAL):** Crear `services/jobService.js`. Aislar las consultas SQL (que ya apuntan a Turso) para que los controladores de IA no deban conocer la estructura interna de la BD.
2.  **Gestión de Esquema:** Implementar una gestión formal de migraciones para mantener el esquema de Turso sincronizado entre entornos.
3.  **Integración:** Refactorizar controladores para centralizar el acceso a Turso a través de la nueva capa de servicios.

### Fase 2: Migración a TypeScript
1.  **Configuración:** Inicializar `tsconfig.json` e instalar `ts-node`/`tsx`.
2.  **Tipado Incremental:** Renombrar `.js` a `.ts` empezando por modelos y servicios. Definir interfaces basadas en los esquemas de Zod existentes.
3.  **Refactorización de Controladores de IA:** Asegurar la integridad del contrato de datos hacia Gemini (streaming).
4.  **Verificación:** Ejecutar `npm test` para asegurar que el sistema sigue íntegro.
