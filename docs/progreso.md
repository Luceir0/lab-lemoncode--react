# Registro de progreso

Estados: pendiente · en curso · pendiente de comprobación manual · terminado.

| Paso | Corresponde a | Estado |
| --- | --- | --- |
| 00 · Preparar el proyecto | Preparación | pendiente de comprobación manual |
| 01 · Catálogo y tarjeta | O1 | pendiente |
| 02 · Añadir y vaciar carrito | O2 · parte 1 | pendiente |
| 03 · Buscador controlado | O2 · parte 2 | pendiente |
| 04 · Carga y estados de petición | O3 | pendiente |
| 05 · Extraer useCoffees | O4 · parte 1 | pendiente |
| 06 · Foco con useRef | O4 · parte 2 | pendiente |
| 07 · Infraestructura de rutas | O5 · parte 1 | pendiente |
| 08 · Detalle y errores de navegación | O5 · parte 2 | pendiente |
| 09 · Esquema de validación | O6 · parte 1 | pendiente |
| 10 · Formulario reutilizable | O6 · parte 2 | pendiente |
| 11 · Alta y persistencia del catálogo | O6 · parte 3 | pendiente |
| 12 · Edición con el mismo formulario | O7 · parte 1 | pendiente |
| 13 · Separar core y layout | O7 · parte 2 | pendiente |
| 14 · Pods, escenas y componentes comunes | O7 · parte 3 | pendiente |
| 15 · README, evidencias y revisión final | O8 | pendiente |

---

## Paso 00 · Preparar el proyecto

**Cambios**

- Copiada la demo `04-framework-react/01-de-javascript-a-react/demos/02-react` (rama `04-framework-react` del repo del curso) en la raíz del proyecto.
- `package.json`: `name` → `tueste-lab-react`.
- `index.html`: `<title>` → `Tueste · Catálogo de cafés`.
- `src/app.tsx`: vaciado; sólo pinta un `<h1>Tueste</h1>` provisional.
- `src/main.tsx`: sin cambios (se conserva `<StrictMode>`).
- Creados `public/coffees.json` (6 cafés del enunciado) y `src/model.ts` (`Roast`, `Coffee`, `CoffeeInput`).

**Versiones instaladas** (sin actualizar nada): Node 24.21.0, React 19.3.0, TypeScript 7.0.2, Vite 8.3.4, Tailwind 4.3.3, @vitejs/plugin-react 6.1.2.

**Comprobaciones hechas por la IA**

- `npm install`: 0 vulnerabilidades.
- `npm run build` (`tsc --noEmit && vite build`): sin errores.
- `coffees.json`: 6 elementos, 6 ids únicos.
- Servidor de desarrollo arrancado en un puerto de prueba: `/` devuelve el título nuevo y `/coffees.json` responde 200. Servidor parado después.

**Comprobaciones pendientes (persona)**

- `npm start` y abrir la URL: se ve "Tueste" y la pestaña muestra el título nuevo.

**Comprensión: ¿qué diferencia hay entre los archivos de `public/` y los módulos de `src/`?**

En `src/` está el código que se compila: Vite lo transforma (TypeScript → JavaScript, los tipos desaparecen) y lo empaqueta; se usa con `import`. En `public/` están los archivos estáticos: se copian tal cual y se piden por URL mientras la app funciona (por eso `coffees.json` va ahí: en O3 se pedirá con `fetch`).

**Dudas / decisiones**

- La carpeta no era repositorio git: se inicializa en local para hacer un commit por obligatorio.
