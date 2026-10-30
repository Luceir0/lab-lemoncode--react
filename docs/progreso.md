# Registro de progreso

Estados: pendiente · en curso · pendiente de comprobación manual · terminado.

| Paso | Corresponde a | Estado |
| --- | --- | --- |
| 00 · Preparar el proyecto | Preparación | terminado |
| 01 · Catálogo y tarjeta | O1 | terminado |
| 02 · Añadir y vaciar carrito | O2 · parte 1 | terminado |
| 03 · Buscador controlado | O2 · parte 2 | terminado |
| 04 · Carga y estados de petición | O3 | terminado |
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

---

## Paso 01 · Catálogo y tarjeta (O1)

**Cambios**

- `src/coffee-card.tsx`: componente `CoffeeCard` con props tipadas (`CoffeeCardProps { coffee: Coffee }`). Muestra nombre, origen y precio con `toFixed(2)`.
- `src/app.tsx`: array `coffees: Coffee[]` con los tres primeros cafés del JSON, título, frase `{coffees.length} cafés este mes` y lista con `map` y `key={coffee.id}`. Rejilla `grid gap-4 sm:grid-cols-2`; tarjeta con fondo, borde y sombra.

**Decisiones**

- El array está fuera de `App`: son datos fijos, no cambian entre renders, así que no hace falta recrearlos en cada render (y no es estado).
- La lista es `<ul>`/`<li>` y la tarjeta un `<article>` con `<h2>`: HTML semántico para lectores de pantalla.
- La `key` va en el `<li>`, que es el elemento que devuelve el `map`, no dentro de `CoffeeCard`.

**Comprobaciones hechas por la IA**

- `npm run build`: sin errores.

**Comprobaciones hechas por la persona**

1. Tres tarjetas y "3 cafés este mes".
2. Cuarto café temporal en el array: aparece la tarjeta y el número cambia solo. (La primera vez se añadió por error al JSON; se restauró.)
3. Sin `key`: aviso en consola. Cambios temporales deshechos después.

**📝 Respuesta O1** (para el README)

> ¿Qué aviso da React sin `key` y para qué la necesita? ¿Por qué `coffee.id` y no el índice?

React avisa en consola: *"Each child in a list should have a unique "key" prop"*. La `key` le sirve para saber qué elemento es cada uno entre un render y el siguiente: así, si la lista cambia, sabe cuál se ha añadido, quitado o movido y sólo toca ese. Usamos `coffee.id` porque identifica siempre al mismo café; el índice depende de la posición, y si se filtra, se borra o se reordena la lista, el mismo índice pasa a ser otro café y React puede reutilizar el elemento equivocado.

---

## Paso 02 · Añadir y vaciar carrito (O2 · parte 1)

**Cambios**

- `CoffeeCard`: nueva prop `onAdd: (coffee: Coffee) => void` y botón "Añadir al carrito" con `onClick={() => onAdd(coffee)}`.
- `App`: estado `cart` (`useState<Coffee[]>([])`); `addToCart` con `setCart((previous) => [...previous, coffee])`; `emptyCart` con `setCart([])`.
- Resumen "N bolsas · total €" y botón "Vaciar" con `disabled={bagCount === 0}`.

**Decisiones**

- `bagCount` y `total` se calculan en el render (`cart.length` y `reduce`): no son estado.
- Actualización funcional (`previous => ...`) y sin mutar: se crea un array nuevo.
- El carrito guarda un café por bolsa (se puede repetir). No se pinta la lista del carrito, así que no hay riesgo de keys duplicadas.
- `aria-live="polite"` en el resumen para que un lector de pantalla anuncie los cambios; botones con `type="button"`.

**Comprobaciones hechas por la IA**

- `npm run build`: sin errores.

**Comprobaciones hechas por la persona**

1. Añadir tres bolsas: cambian contador y total. ✔
2. Vaciar: ambos a 0 y el botón se desactiva. ✔
3. Aviso de consola sin `key` confirmado (paso 01). ✔

**📝 Respuestas O2** (para el README)

> ¿Por qué `onAdd={addToCart}` y no `onAdd={addToCart()}`?

Con `addToCart` le pasamos la función a la tarjeta para que la llame cuando se pulse el botón. Con `addToCart()` la función se ejecutaría en ese momento, durante el render, y la tarjeta recibiría lo que devuelve (`undefined`) en lugar de la función. Además, como llama a `setCart`, provocaría un nuevo render que la volvería a ejecutar: un bucle infinito.

> ¿Por qué el total no necesita su propio `useState`? ¿Qué problema habría si lo fuera?

Porque se puede calcular a partir de `cart` en cada render: es un dato derivado, no información nueva. Si fuera un estado tendríamos el mismo dato guardado dos veces y habría que actualizar los dos a la vez; si en algún sitio se olvida (por ejemplo al vaciar), el total y el carrito dejarían de coincidir.

---

## Paso 03 · Buscador controlado (O2 · parte 2)

**Cambios**

- `App`: segundo estado `search` (`useState("")`) e input controlado (`value={search}` + `onChange`), con `<label htmlFor>`.
- `filteredCoffees` se calcula en el render con `filter` + `toLowerCase().includes(...)` (sin distinguir mayúsculas; se ignoran espacios a los lados).
- Si `filteredCoffees` está vacío: "Sin resultados"; si no, la rejilla.

**Decisiones**

- La frase "N cafés este mes" sigue contando el catálogo completo, no los resultados del filtro.
- Estados en este punto: sólo `cart` y `search`.

**Comprobaciones hechas por la IA**

- `npm run build`: sin errores.

**Comprobaciones hechas por la persona**

1. "ken" → sólo Kenia AA. ✔
2. "zzz" → "Sin resultados". ✔
3. Borrar el texto → vuelven los tres. ✔

**Comprensión: ¿qué problemas introduce guardar también la lista filtrada en un estado?**

La lista filtrada depende de dos datos, `coffees` y `search`. Si fuera un estado, habría que actualizarla a mano cada vez que cambiara cualquiera de los dos; basta con olvidarse en un sitio para que la lista mostrada no coincida con la búsqueda ni con los cafés reales. Además, si se sincronizase con un `useEffect`, cada tecla provocaría dos renders y el primero pintaría la lista antigua. Como filtrar es un cálculo barato, es más simple y seguro recalcularla en cada render: así siempre es correcta.

---

## Paso 04 · Carga y estados de petición (O3)

**Cambios**

- Eliminado el array escrito a mano de `app.tsx`.
- Tres estados nuevos: `coffees` (`[]`), `loading` (`true`), `error` (`string | null`).
- `useEffect(..., [])` con `fetch("/coffees.json", { signal })`; se comprueba `response.ok` y se lanza un error si no lo es.
- Limpieza: el efecto devuelve `() => controller.abort()`. En el `catch`, si la señal está abortada se ignora (no es un error de carga).
- Render: "Cargando…" (`role="status"`), mensaje de error (`role="alert"`) o la lista con "N cafés este mes" y el filtro.

**Decisiones**

- `loading` empieza en `true` porque la petición sale nada más montar.
- No se usa `.finally(() => setLoading(false))`: con `StrictMode` la primera petición se aborta y el `finally` pondría `loading` a `false` antes de que llegue la segunda, mostrando un instante "0 cafés / Sin resultados".
- El buscador y el carrito siguen visibles mientras carga; la frase de número de cafés sólo aparece cuando hay datos.

**Comprobaciones hechas por la IA**

- `npm run build`: sin errores.

**Comprobaciones hechas por la persona**

1. Network: desactivar caché + Slow 4G/3G → se ve "Cargando…" antes de la lista. ✔
2. Bloquear `coffees.json` y recargar → mensaje de error. Desbloquear → seis cafés. ✔
3. "zzz" → "Sin resultados" (no el error). ✔

**📝 Respuesta O3** (para el README)

> ¿Por qué la petición va dentro de un `useEffect` y no directamente en el cuerpo del componente? ¿Qué significa el `[]` del final?

El cuerpo del componente se ejecuta en cada render. Si el `fetch` estuviera ahí, al llegar los datos `setCoffees` provocaría un nuevo render, que lanzaría otro `fetch`, y así en bucle. `useEffect` saca la petición del render: React pinta primero y ejecuta el efecto después, sólo cuando cambian sus dependencias. El `[]` es la lista de dependencias: al estar vacía, el efecto se ejecuta una sola vez, al montar el componente (y su limpieza, al desmontarlo).
