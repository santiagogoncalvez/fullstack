# LaburoDev — Sistema de diseño

Fuente única de verdad visual del frontend. Todo cambio de estilo debe respetar este documento.

## Marca

- Nombre: `laburoDev` (camelCase, solo texto, sin logo).
- Render: `laburo` en color de texto + `Dev` en acento (`Header.jsx`).
- Favicon: cuadrado ámbar con L (inline SVG en `index.html`).

## Tipografía

- Una sola font: **Bricolage Grotesque Variable** (bundled vía `@fontsource-variable/bricolage-grotesque`, funciona offline).
- Pesos permitidos: **400 y 500**. Nada de 600/700/bold en `src`.
- Escala: `display 2.5rem` (hero search) · `h1 2rem` · `h2 1.5rem` · `h3 1.125rem` · `body 1rem` · `small 0.875rem`. Headings con `line-height 1.25`, cuerpo `1.6`.

## Color

Dark (default) — negro verdoso + brasa:

| Token      | Valor     | Uso                                    |
| ---------- | --------- | -------------------------------------- |
| `--bg`     | `#0d1310` | fondo página, header                   |
| `--bg-soft`| `#141c17` | botones ghost/icon, inputs, badges     |
| `--surface`| `#1a231d` | cards, search-bar                      |
| `--text`   | `#ece7d8` | texto principal, íconos (`currentColor`)|
| `--text-2` | `#a9b29b` | secundario, placeholders               |
| `--accent` | `#ea5f31` | CTA, links, nav activa, badge de mode  |
| `--accent-ink` | `#160d08` | texto sobre CTA                    |
| `--green`  | `#3e7d5c` | estado aplicado                        |
| `--danger` | `#e0705c` | errores                                |

Light (opuesto real, papel): `bg #fbfaf5` · `soft #f0e9dc` · `surface #ffffff` · `text #1b1712` · `text2 #655c4e` · `accent #b33a17` · `ink #ffffff` · `green #20603f` · `danger #a8321f`. Sombra de cards solo en light (`--card-shadow`).

Contrastes verificados (mínimo 4.5): dark text 15.2/13.0 · text2 8.5/7.3 · accent 5.5/4.8 · ink/accent 5.6 · blanco/green 4.9 · danger 5.9. Light text 17.0/17.8 · text2 6.2/6.5 · accent 5.6/5.9 · blanco/accent 5.9 · blanco/green 7.4 · danger 6.4.

Mapa de uso: textos sobre `bg`/`surface` · CTA sólido `accent` + `ink`, hover solo brillo · links `accent` con subrayado solo en hover · badge de mode único acento sólido, demás badges `bg-soft` + `text2` · foco visible anillo `accent` en todo.

## Espaciado

Escala cerrada: `--space-1 0.25` · `--space-2 0.5` · `--space-3 0.75` · `--space-4 1` · `--space-5 1.5` · `--space-6 2.5` · `--space-7 4` (rem). Nada fuera de escala salvo tamaños fijos de componente (paddings internos de botón, alto de icon-button).

Mapa: micro (meta, detalles) `space-1` · elementos chicos y filas de botones/links `space-2`/`space-3` · título→contenido `space-2`, título→bloque `space-3` · entre cards y bloques `space-4` · secciones de página `space-5`/`space-6` · aire de página especial (404) `space-7`.

Layout: `--page 70rem` + `--gutter 1.25rem` compartidos por header, footer, home, search, resultados y detalle. Perfil mantiene 44rem de lectura con el mismo gutter. Breadcrumb del detalle: `padding-top space-6`, sin laterales, `margin-bottom space-5`.

## Componentes

- Botones: `btn` + `btn-primary` / `btn-ghost` / `btn-sm`. Icon-buttons circulares 2.5rem (`icon-btn`, activo en acento). Sin transforms en hover.
- Cards: fondo sólido sutil, sin bordes, radius `--r-lg`. Card de empleo entera link (stretched-link en el título, fav por encima con `z-index`, sin anidado).
- Separador de meta: `·` en card y detalle.
- Paginación circular, activa en acento sólido.
- Theme: `useTheme` + `ThemeToggle`, default del sistema, persiste `laburodev-theme`, script anti-flash en `index.html`.
- Favoritos: zustand + `persist` (`laburodev-favorites`). Sin puerta de login hasta auth real. Aplicar eliminado hasta backend real.

## Íconos

Solo **lucide-react** (Search, ChevronLeft/Right, Sun, Moon, User, Heart, X). Cero emojis y cero SVG manuales en `src`. Los íconos heredan `currentColor`.

## Prohibido (patrones IA)

Gradientes violeta/azul · glassmorphism/blur · 3 cards iguales en fila · sans genéricas (Inter) · hero centrado título+subtítulo+botón · itálicas en títulos · labels en mayúsculas con letter-spacing · sobrecarga de etiquetas · bordes fuertes (solo fondos sólidos sutiles) · pesos fuera de 400/500.
