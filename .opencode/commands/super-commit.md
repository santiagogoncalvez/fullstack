# Comando: super-commit
# Descripción: Agrupa cambios en commits semánticos y sincroniza el branch.

## Reglas de Ejecución
1. **Inspección**: Ejecuta `git status --short`, `git diff --stat` y `git log --oneline -10`.
2. **Seguridad**: Escanea cambios en busca de `.env`, tokens o secretos. Si encuentras alguno, detente y alerta.
3. **Planificación**: Agrupa archivos por intención (feat, fix, refactor, etc.). Muestra al usuario el plan: qué archivos irán en qué commit.
4. **Ejecución**: 
   - Espera confirmación del usuario para el plan.
   - Si se aprueba, realiza los `git add` y `git commit` correspondientes.
   - Finaliza con `git push`.
5. **Reporte**: Resume los commits creados.

## Restricciones
- No mezcles cambios independientes en un mismo commit.
- No uses `--no-verify`.
- No amilanes (amend) ni fuerces (force push).
- Mantén mensajes semánticos, claros y concisos.
