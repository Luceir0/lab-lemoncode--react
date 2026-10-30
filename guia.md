# Tueste · Guía de desarrollo incremental con IA

> Documento de trabajo basado en el laboratorio del módulo 04 de React. Objetivo: construir y entender la aplicación por pasos; nunca generar todo el proyecto de una vez.

## 1. Instrucciones para la IA

1. Lee esta guía completa, pero ejecuta únicamente el paso solicitado.
2. Empieza inspeccionando el repositorio, sus scripts, dependencias y convenciones. No reemplaces un proyecto existente ni borres trabajo ajeno.
3. Antes de editar, explica brevemente el objetivo del paso y los archivos que necesitas tocar.
4. Implementa sólo ese incremento. No adelantes opcionales, desafíos ni la arquitectura final.
5. Mantén el proyecto ejecutable al cerrar cada paso. Ejecuta `npm run build` cuando haya cambios de código y los demás controles pertinentes que existan en el repositorio.
6. Explica el código nuevo: props, estado, datos derivados, efectos, dependencias y limpieza, cuando correspondan. No añadas hooks sin una necesidad concreta.
7. Distingue las comprobaciones que has ejecutado de las que debe realizar la persona en el navegador. No afirmes haber probado lo que no has probado.
8. Resume lo modificado y proporciona una lista concreta de comprobaciones manuales. Plantea una pregunta breve para comprobar la comprensión.
9. Actualiza el registro de progreso y la bitácora con hechos reales. No inventes errores de la IA, capturas, respuestas personales ni resultados de pruebas.
10. **Detente al terminar el paso. No ejecutes el siguiente hasta recibir una instrucción explícita como «continúa con el paso 03».** Si falla una comprobación, corrige el paso actual antes de continuar.

### Prompt para empezar

```text
Usa esta guía como especificación. Empieza únicamente por el paso 00.
Inspecciona lo que ya hay antes de modificarlo. Explica las decisiones y ayúdame
a entender el código. No implementes pasos posteriores ni extras.
Al terminar, indica qué comprobaste, qué debo comprobar yo y detente.
```

### Prompt para continuar

```text
He revisado el paso anterior. Continúa únicamente con el paso XX.
Respeta el alcance, explica los cambios y detente al terminar.
```

### Prompt para corregir

```text
No avances. En el paso XX ocurre lo siguiente: [comportamiento o error].
Investiga la causa, corrige sólo lo necesario y repite la comprobación afectada.
```

## 2. Alcance y reglas técnicas

- Aplicación: catálogo de cafés Tueste, buscador, carrito, detalle, alta y edición.
- Base exigida: copia de la demo `02-react` indicada en el enunciado; Node.js 22.12 o superior; Vite, React, TypeScript y Tailwind.
- Rutas: TanStack Router con archivos. Formularios: TanStack Form y Zod, siguiendo la demo del curso.
- Inspecciona `package.json` y el lockfile para conocer las versiones reales. El ejemplo original menciona React 19, TypeScript 7, Vite 8, Tailwind 4 y Zod 4: no actualices versiones automáticamente para hacerlas coincidir. Si hay incompatibilidades, explica el problema antes de cambiar el stack.
- Usa componentes función, props tipadas y TypeScript estricto. Evita `any` para silenciar errores.
- Estado inmutable; actualizaciones basadas en el valor anterior cuando proceda. Totales, contadores y listas filtradas se calculan durante el render.
- Mantén `StrictMode`, las claves estables y los hooks antes de los retornos condicionales. Nunca edites `routeTree.gen.ts` a mano.
- Peticiones y temporizadores deben tener limpieza. Una cancelación no debe mostrarse como error de carga.
- HTML semántico, botones operables con teclado, foco visible, labels asociados y errores enlazados con `aria-describedby`.
- Sin backend real ni nuevas funciones de producto. La persistencia exigida para el catálogo se resuelve con `localStorage`.
- Un commit por obligatorio es lo recomendado; propone el mensaje al cerrarlo. No publiques el repositorio ni envíes la entrega sin una petición expresa.
- Los opcionales y desafíos sólo se desarrollan cuando se elijan explícitamente.

## 3. Cómo registrar el progreso

Crea `docs/progreso.md` con el estado de cada paso: pendiente, en curso, pendiente de comprobación manual o terminado. Registra cambios, comprobaciones reales y dudas. Empieza también `docs/bitacora-ia.md`; al cerrar O8, incorpora o enlaza su contenido desde el README para que se pueda revisar.

Un paso termina cuando su alcance está implementado, el build pasa cuando corresponde y se han completado sus comprobaciones manuales. Si falta una comprobación humana, déjalo indicado y espera.

## 4. Secuencia obligatoria

### Paso 00 · Preparar el proyecto

**Correspondencia:** Preparación. **Dependencia:** ninguna.

**Instrucciones para este paso**

Inspeccionar el repositorio y Node. Si no hay proyecto, partir de la demo indicada en el anexo. Instalar dependencias, cambiar el name y el title, y preparar app.tsx sin la demo. Conservar StrictMode. Crear public/coffees.json con los seis cafés exactos del anexo y src/model.ts con Roast, Coffee y CoffeeInput. Iniciar los registros de progreso y bitácora.

**Comprobaciones de aceptación**

El servidor arranca con npm start y npm run build termina sin errores. El JSON contiene seis ids únicos.

**Comprensión y documentación**

¿Qué diferencia hay entre los archivos de public y los módulos de src? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 01 · Catálogo y tarjeta

**Correspondencia:** O1. **Dependencia:** paso 00 revisado.

**Instrucciones para este paso**

Definir en app.tsx tres cafés del JSON como Coffee[]. Crear CoffeeCard con props tipadas: nombre, origen y precio con dos decimales. Pintar título, cantidad derivada y tarjetas mediante map con key por id. Aplicar la rejilla y estilos Tailwind del enunciado.

**Comprobaciones de aceptación**

Se ven tres tarjetas. Añadir temporalmente un cuarto café actualiza tarjeta y contador; restaurar los tres. Quitar temporalmente la key para observar el aviso y reponerla.

**Comprensión y documentación**

Explica para qué sirve key y por qué usar el id frente al índice. Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 02 · Añadir y vaciar carrito

**Correspondencia:** O2 · parte 1. **Dependencia:** paso 01 revisado.

**Instrucciones para este paso**

Añadir cart: Coffee[] en App y callback onAdd en CoffeeCard. Cada pulsación añade una bolsa, incluso del mismo café. Calcular cantidad y total durante el render. Crear resumen y botón Vaciar desactivado cuando no hay bolsas.

**Comprobaciones de aceptación**

Añadir tres bolsas actualiza cantidad y suma; vaciar deja ambos a cero y desactiva el botón. Si se renderizan bolsas repetidas, evitar keys duplicadas.

**Comprensión y documentación**

¿Por qué pasar onAdd={addToCart} y por qué el total no es otro estado? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 03 · Buscador controlado

**Correspondencia:** O2 · parte 2. **Dependencia:** paso 02 revisado.

**Instrucciones para este paso**

Añadir el texto del buscador como segundo estado. Input con value y onChange; filtrar por nombre sin diferenciar mayúsculas. Calcular la lista filtrada en el render. Mostrar Sin resultados si no coincide ningún café.

**Comprobaciones de aceptación**

Con los datos temporales apropiados, ken encuentra Kenia; zzz muestra Sin resultados. Al limpiar vuelve la lista. Sólo cart y texto son estados en este punto.

**Comprensión y documentación**

¿Qué problemas introduce guardar también la lista filtrada en un estado? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 04 · Carga y estados de petición

**Correspondencia:** O3. **Dependencia:** paso 03 revisado.

**Instrucciones para este paso**

Sustituir el array local por fetch de /coffees.json dentro de useEffect. Añadir coffees, loading y error. Comprobar response.ok y manejar carga, fallo y éxito de forma diferenciada. Limpiar la petición al desmontar con AbortController y evitar tratar el aborto como fallo.

**Comprobaciones de aceptación**

Con conexión lenta aparece Cargando…; al bloquear el JSON aparece el error. Restaurar la petición: se ven seis cafés. zzz sigue mostrando Sin resultados, sin confundirse con el error.

**Comprensión y documentación**

¿Por qué usar un efecto y qué significa su array de dependencias vacío? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 05 · Extraer useCoffees

**Correspondencia:** O4 · parte 1. **Dependencia:** paso 04 revisado.

**Instrucciones para este paso**

Mover estados y efecto a src/use-coffees.ts. Devolver coffees, loading y error. Consumir el hook desde el catálogo sin cambiar la interfaz ni el comportamiento.

**Comprobaciones de aceptación**

Carga, error, buscador y carrito funcionan igual que antes.

**Comprensión y documentación**

¿Dos componentes que llaman al hook comparten estado? Distingue las peticiones de cada instancia del ciclo adicional de desarrollo con StrictMode. Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 06 · Foco con useRef

**Correspondencia:** O4 · parte 2. **Dependencia:** paso 05 revisado.

**Instrucciones para este paso**

Crear una ref tipada para el input. Añadir un botón Buscar junto al título que enfoque el campo.

**Comprobaciones de aceptación**

Pulsar Buscar permite escribir directamente. Comprobar también con teclado y verificar foco visible.

**Comprensión y documentación**

¿Por qué la referencia al input no necesita useState? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 07 · Infraestructura de rutas

**Correspondencia:** O5 · parte 1. **Dependencia:** paso 06 revisado.

**Instrucciones para este paso**

Instalar TanStack Router y su plugin de desarrollo según la versión del proyecto. Colocar el plugin antes del de React. Crear __root.tsx con navegación y Outlet, index.tsx con redirección y coffees/index.tsx con el catálogo existente. Crear y registrar el router, montarlo en main.tsx y usar build: vite build && tsc --noEmit.

**Comprobaciones de aceptación**

/ redirige a /coffees; el catálogo mantiene su comportamiento. La generación de rutas y el build funcionan sin editar el árbol generado.

**Comprensión y documentación**

¿Qué responsabilidad tiene el marco raíz? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 08 · Detalle y errores de navegación

**Correspondencia:** O5 · parte 2. **Dependencia:** paso 07 revisado.

**Instrucciones para este paso**

Crear src/api.ts con getCoffees y getCoffee; adaptar el hook de lista para usar la API. Crear useCoffee(id), dependiente de id y con limpieza. Añadir coffees/$coffeeId.tsx y links tipados desde las tarjetas. Mostrar todos los campos, tueste, notas y enlace de vuelta. Distinguir id inexistente, fallo de petición y ruta desconocida.

**Comprobaciones de aceptación**

Detalle, atrás/adelante y recarga directa de /coffees/4 funcionan. /coffees/999 muestra Café no encontrado y /teteras Página no encontrada. Probar temporalmente coffeeID en params y restaurarlo tras observar el error de tipos. Añadir bolsas, navegar y volver para observar la pérdida de estado local; no aplicar P1 todavía.

**Comprensión y documentación**

¿Qué aporta una URL por pantalla? ¿Por qué se pierde el carrito y dónde podría vivir para conservarse? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 09 · Esquema de validación

**Correspondencia:** O6 · parte 1. **Dependencia:** paso 08 revisado.

**Instrucciones para este paso**

Instalar TanStack Form y Zod compatibles con el proyecto. Crear coffee.schema.ts: name y origin con trim y mínimo 2 caracteres; roast enum light/medium/dark; price numérico mayor que cero; notes de hasta 120 caracteres y admitiendo vacío. Mantener CoffeeInput como contrato de entrada coherente.

**Comprobaciones de aceptación**

Comprobar entradas válidas e inválidas con el esquema: espacios, un carácter, precio cero/negativo y notas de 121 caracteres. No añadir una ruta de alta todavía.

**Comprensión y documentación**

¿Qué valida TypeScript y qué comprueba Zod durante la ejecución? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 10 · Formulario reutilizable

**Correspondencia:** O6 · parte 2. **Dependencia:** paso 09 revisado.

**Instrucciones para este paso**

Crear CoffeeForm con TanStack Form y el esquema en onChange y onSubmit. Labels, mensajes asociados, select de tueste e input number que entregue valueAsNumber. Prever el caso NaN al vaciarlo. Preparar callback de guardado asíncrono y deshabilitar el botón mientras se envía. Con Zod 4 usar Standard Schema directamente si la versión instalada lo soporta, siguiendo la demo.

**Comprobaciones de aceptación**

El formulario rechaza vacío, espacios y precio no positivo. Los errores son comprensibles y se identifican con el campo. Verificar que el contrato de guardado recibe un número.

**Comprensión y documentación**

¿Por qué valueAsNumber y qué ocurre si al esquema le llega un string? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 11 · Alta y persistencia del catálogo

**Correspondencia:** O6 · parte 3. **Dependencia:** paso 10 revisado.

**Instrucciones para este paso**

Añadir /coffees/new y enlace Añadir café. Ampliar api.ts con saveCoffee y una estrategia común para leer/escribir el catálogo completo en localStorage: usar JSON como semilla si no existe almacenamiento. Asignar ids únicos. Todas las lecturas deben ver los cambios. Al guardar correctamente navegar al detalle nuevo; un error conserva los datos y muestra un mensaje.

**Comprobaciones de aceptación**

Enviar vacío no navega. Datos válidos crean un café visible en detalle y catálogo; recargar lo conserva. Borrar sólo la clave del catálogo restaura los seis iniciales. Mientras guarda el botón está desactivado.

**Comprensión y documentación**

¿Por qué guardar en localStorage no modifica el archivo JSON? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 12 · Edición con el mismo formulario

**Correspondencia:** O7 · parte 1. **Dependencia:** paso 11 revisado.

**Instrucciones para este paso**

Convertir $coffeeId.tsx a $coffeeId/index.tsx según el mapa del anexo y crear $coffeeId/edit.tsx. Reutilizar CoffeeForm con valores iniciales opcionales. Cargar los datos antes de inicializar el formulario o sincronizarlos de forma explícita y segura. Guardar conservando id y reemplazando el elemento, sin duplicarlo. Añadir Editar café en el detalle.

**Comprobaciones de aceptación**

Los campos están precargados; cambiar precio vuelve al detalle actualizado. El café aparece una sola vez y persiste al recargar. /coffees/999/edit muestra Café no encontrado. Alta y edición usan el mismo esquema.

**Comprensión y documentación**

¿Cómo distingues crear de actualizar y evitas que el formulario conserve datos de otro café? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 13 · Separar core y layout

**Correspondencia:** O7 · parte 2. **Dependencia:** paso 12 revisado.

**Instrucciones para este paso**

Mover modelo, esquema, API y hooks a core/coffees. Mover creación/registro del router a core/router/router.ts. Crear layouts/app-layout.tsx con navegación y Outlet. Mantener pequeñas las rutas y corregir importaciones. No cambiar comportamiento ni añadir extras.

**Comprobaciones de aceptación**

Todas las rutas y flujos existentes funcionan y el build pasa tras los movimientos.

**Comprensión y documentación**

¿Qué pertenece a core y qué pertenece a un layout? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 14 · Pods, escenas y componentes comunes

**Correspondencia:** O7 · parte 3. **Dependencia:** paso 13 revisado.

**Instrucciones para este paso**

Aplicar el árbol final del anexo: pods/catalogo para catálogo/detalle y pods/edicion para el formulario; containers para datos y decisión de carga/error, components para pintar props. Escenas componen pantallas y deciden navegación. Cada pod expone index.ts y las escenas sólo importan esa API pública. Extraer mensajes comunes. El formulario recibe onSaved desde la escena y no decide destinos; si se usa onSave para persistir, distinguir ambos contratos. Ningún pod importa al otro.

**Comprobaciones de aceptación**

Repetir alta, edición, detalle y listado. Verificar importaciones sin dependencias cruzadas entre pods. Cambiar temporalmente mínimo de nombre a 4 y comprobar ambas modalidades; restaurar a 2.

**Comprensión y documentación**

¿Dónde cambias diseño de tarjeta, validación de precio y destino tras guardar? ¿Cuándo ayuda separar container y component? Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

### Paso 15 · README, evidencias y revisión final

**Correspondencia:** O8. **Dependencia:** paso 14 revisado.

**Instrucciones para este paso**

Completar README con arranque, mapa de rutas y respuestas O1–O7. Añadir capturas reales en docs o screenshots: catálogo con carrito, detalle, errores de formulario y carga o error. Incluir checklist de obligatorios/opcionales/desafíos y al menos tres entradas reales de bitácora: prompt, qué dio la IA, qué corregí y por qué. No inventar intervenciones. Revisar accesibilidad, consola y exclusión de node_modules/dist.

**Comprobaciones de aceptación**

Ejecutar build y recorrer comprobaciones O1–O7 del anexo, adaptando las transitorias a su etapa. Revisar enlaces a capturas, README y gitignore. Todos los obligatorios están completos o se indican pendientes concretos.

**Comprensión y documentación**

Explica un componente y un hook sin leer la respuesta de la IA. Registra las decisiones y resultados reales.

**Cierre:** resume archivos y verificaciones; actualiza progreso; detente y espera la revisión de este paso.

## 5. Opcionales: elegir antes de ejecutar

No forman parte de la secuencia automática. El enunciado recomienda al menos tres. Cada opción se ejecuta y revisa por separado, siguiendo el mismo protocolo de cierre.

| Paso | Requisito | Orden de trabajo y aceptación |
| --- | --- | --- |
| P1 | Carrito entre rutas | Subir estado a un layout persistente, crear Context y useCart, mostrar bolsas en navegación; comprobar navegación sin pérdida y explicar por qué se usa Context. |
| P2 | Carrito tras recarga | Después de P1, leer localStorage en inicializador perezoso y escribir con efecto; comprobar recarga y explicar la separación lectura/escritura. |
| P3 | Oferta con cuenta atrás | Crear banner MM:SS con intervalo y limpieza; después botón que lo desmonte. Montar/desmontar repetidamente sin aceleración; explicar la limpieza. |
| P4 | Filtros en URL | Validar search params q y roast con TanStack Router; integrar texto y select sin duplicar estados. Abrir enlace compartido y probar atrás/adelante. |
| P5 | Medir useMemo | Preparar 2.000 cafés, medir filtrado con console.count y estado ajeno; introducir useMemo y comparar. Registrar resultados reales y restaurar la fuente normal tras la prueba. |
| P6 | CSS Modules | Migrar sólo la tarjeta a coffee-card.module.css; revisar clase generada y comparar en README dónde se editan estilos con cada enfoque. |
| P7 | Eliminar café | API elimina y persiste catálogo, pod presenta la acción y la escena decide navegación. Confirmar antes de borrar; cancelar no altera nada. Eliminar también un café del JSON inicial y recargar para comprobar que no reaparece. |

## 6. Desafíos: elegir antes de ejecutar

| Paso | Requisito | Orden de trabajo y aceptación |
| --- | --- | --- |
| D1 | Búsqueda con debounce | Definir primero cómo se simula o sirve una búsqueda real por consulta: un JSON estático no filtra en servidor por añadir q. Luego debounce de 300 ms, limpieza del temporizador y aborto de petición previa. Con red lenta, sólo la última consulta puede actualizar resultados; solicitudes previas pueden aparecer canceladas en Network. |
| D2 | React Compiler | Después de P5, revisar compatibilidad de las versiones y configuración del curso antes de aplicar oxc-transform-react / compiler: true. Medir con y sin Compiler y explicar qué no corrige. No instalar una configuración incompatible a ciegas. |
| D3 | Contrato y mapper | Definir modelo de API con coffee_name y price_cents, convertirlo al modelo de dominio dentro de core/coffees. Aclarar cómo se adapta la persistencia existente. Comprobar que ningún componente cambia y el precio sigue siendo correcto. |
| D4 | Tests de componentes | Instalar Vitest y Testing Library con entorno DOM apropiado. Probar nombre/precio con dos decimales y error para nombre de un carácter sin ejecutar el callback de guardado (onSave o equivalente real). Consultar por rol/label y ejecutar los tests. |
| D5 | Hacia TanStack Start | Leer documentación de Start y Router; explicar en README qué cambiaría con loaders frente a hooks/efectos. La migración del detalle a loader es otra decisión explícita, no obligatoria para la parte de análisis. |

## 7. Checklist de entrega

- [ ] O1: catálogo por componentes y props tipadas.
- [ ] O2: carrito y buscador con estado mínimo.
- [ ] O3: fetch con carga/error y comprobación HTTP.
- [ ] O4: custom hook y ref para foco.
- [ ] O5: rutas, detalle y errores diferenciados.
- [ ] O6: alta validada y persistente.
- [ ] O7: edición sin duplicados y arquitectura por pods.
- [ ] O8: README, respuestas, capturas y tres ejemplos reales de IA.
- [ ] Build correcto y comprobaciones manuales completadas.
- [ ] Labels, foco, teclado y mensajes de error revisados.
- [ ] Opcionales y desafíos realizados identificados sin marcar pendientes como hechos.
- [ ] Repositorio sin node_modules ni dist, con commits por obligatorio si es posible.
- [ ] Enlace de GitHub preparado; acceso para profesores si es privado.
- [ ] Entrega en academia.lemoncode.net realizada por la persona cuando corresponda.

La entrega se aprueba con todos los obligatorios, sus comprobaciones y build correcto. Pesos originales: O1–O7 50 %, README 10 %, opcionales 20 %, desafíos 15 %, acabado y accesibilidad 5 %. Dedicación orientativa del enunciado: 8–12 horas para obligatorios.

## 8. Anexo de referencia: enunciado original íntegro

Se conserva para consultar los datos exactos, las preguntas, demos, recursos y criterios originales. **Este anexo es especificación de referencia, no una orden para desarrollar todas las fases a la vez.** Si el detalle original es más preciso que el resumen de un paso, conserva ese requisito dentro del paso correspondiente.

---

# 🧪 Laboratorio · Módulo 04 · React

> ⏱️ Dedicación estimada: **8-12 h** para los obligatorios; los opcionales y desafíos, lo que queráis estirar. 📦 Formato: enlace a un **repositorio de GitHub**

## La idea

En el módulo hemos pasado de **actualizar el DOM a mano** a **describir la interfaz con componentes y estado**. Después hemos visto los hooks, hemos montado una aplicación con rutas y un formulario validado y, por último, la hemos organizado en escenas y *pods*.

En este laboratorio vais a recorrer el mismo camino con un ejemplo distinto: el **catálogo de *Tueste***, el tostadero de café de los laboratorios anteriores ☕. En lugar de personas, cafés: una lista con buscador y carrito, el detalle de cada café, un formulario para dar de alta cafés nuevos y otro para editarlos.

Cada obligatorio sigue el mismo esquema que en el laboratorio de bundling:

- 🛠️ **Qué hacer**: lo que hay que construir. Indica en qué sesión y paso del módulo tenéis el ejemplo equivalente.
- 🔎 **Qué comprobar**: lo que tiene que pasar en el navegador. Si pasa, el obligatorio está hecho.
- 📝 **Qué responder**: una o dos preguntas para el README. Con dos o tres frases basta.

La regla del juego (la de siempre):

- ✅ **La IA está permitida y recomendada**.
- ⚠️ Pero **tenéis que entender cada componente y cada hook que entregáis**. Si en la revisión os preguntamos "¿por qué este dato no es un estado?" o "¿qué limpia este efecto?", tenéis que saber responder.

## Punto de partida

Necesitáis **Node.js 22.12 o superior**.

Partid de una copia de la demo [`01-de-javascript-a-react/demos/02-react`](https://github.com/Lemoncode/luckia-front-end-moderno-ia/tree/04-framework-react/04-framework-react/01-de-javascript-a-react/demos/02-react) del módulo: ya trae **Vite, TypeScript, React y Tailwind** configurados (lo que montasteis a mano en el laboratorio 3).

```bash
# Copiad la carpeta 02-react a vuestro repositorio, con el nombre que queráis
cd lab-react
npm install
npm start

```

- Cambiad el `name` del `package.json` y el `<title>` del `index.html`.
- Vaciad `src/app.tsx`: empezáis vosotros.
- Recomendado: **un commit por obligatorio**, como en el laboratorio 3.

> 💡 La demo trae `<StrictMode>` en `main.tsx`. Dejadlo: en desarrollo hace que React ejecute dos veces algunas cosas a propósito (tema 02, "Montaje, actualización y desmontaje"). Si veis un `console.log` repetido, no es un error vuestro.

### Los datos de partida

A partir de O3 los cafés se leen de un JSON. Creadlo ya:

*./public/coffees.json*

```json
[
  {
    "id": 1,
    "name": "Etiopía Yirgacheffe",
    "origin": "Etiopía",
    "roast": "light",
    "price": 14.9,
    "notes": "Floral, bergamota y té negro."
  },
  {
    "id": 2,
    "name": "Colombia Huila",
    "origin": "Colombia",
    "roast": "medium",
    "price": 12.9,
    "notes": "Caramelo y manzana roja."
  },
  {
    "id": 3,
    "name": "Kenia AA",
    "origin": "Kenia",
    "roast": "light",
    "price": 15.5,
    "notes": "Frutos rojos y pomelo."
  },
  {
    "id": 4,
    "name": "Brasil Cerrado",
    "origin": "Brasil",
    "roast": "dark",
    "price": 10.5,
    "notes": "Chocolate y avellana."
  },
  {
    "id": 5,
    "name": "Guatemala Antigua",
    "origin": "Guatemala",
    "roast": "medium",
    "price": 13.2,
    "notes": "Cacao y especias."
  },
  {
    "id": 6,
    "name": "Sumatra Mandheling",
    "origin": "Indonesia",
    "roast": "dark",
    "price": 13.9,
    "notes": "Tierra, cedro y chocolate negro."
  }
]

```

Y el modelo (lo vais a usar desde el primer obligatorio):

*./src/model.ts*

```ts
export type Roast = "light" | "medium" | "dark";

export interface Coffee {
  id: number;
  name: string;
  origin: string;
  roast: Roast;
  price: number;
  notes: string;
}

export type CoffeeInput = Omit<Coffee, "id">;

```

### Reglas para todo el laboratorio

- ✅ Componentes como **funciones**, con las props **tipadas**.
- ✅ El estado **nunca se muta**: nada de `push`, `splice` ni `cafe.price = …`. Spread, `map` y `filter` (laboratorio 2).
- ✅ **Lo que se puede calcular no es estado**: el total del carrito o la lista filtrada se calculan durante el render.
- ✅ Cada `.map` que pinte una lista lleva su `key`.
- ✅ `npm run build` sin errores (el script ya comprueba los tipos con `tsc`).

---

## ✅ Parte 1 · Obligatorios

Todos son necesarios para aprobar. Id en orden: cada uno parte del anterior.

### Bloque 1 · Componentes, props y estado (sesión 01)

#### O1 · El catálogo con componentes

🛠️ **Qué hacer**

- En `app.tsx`, un array `coffees: Coffee[]` con **tres** cafés escritos a mano (copiadlos del JSON).
- Un componente `CoffeeCard` que reciba **un café por props** y muestre su nombre, su origen y su precio con dos decimales.
- `App` pinta un título, una frase con el **número de cafés** ("3 cafés este mes") y la lista de tarjetas con `map`.
- Dadle estilo con Tailwind: las tarjetas en una rejilla (`grid sm:grid-cols-2 gap-4`), con fondo, borde o sombra.

🔎 **Qué comprobar**

1. Se ven las tres tarjetas y la frase dice "3 cafés".
2. Añadid un cuarto café al array y guardad: aparece la tarjeta **y** cambia el número. Ese número no lo habéis tocado.
3. Quitad la `key` del `map` y mirad la consola del navegador. Volved a ponerla.

📝 **Qué responder**

- ¿Qué aviso da React sin `key` y para qué la necesita? ¿Por qué usáis `coffee.id` y no el índice del `map`?

#### O2 · Un carrito con estado y eventos

🛠️ **Qué hacer**

- Un estado `cart` con los cafés añadidos: `useState<Coffee[]>([])`.
- Cada `CoffeeCard` tiene un botón **"Añadir al carrito"**. El estado vive en `App`, así que la tarjeta recibe **una función por props** (`onAdd`) y la llama con su café (tema 01, "Vamos a añadir también Eliminar").
- Un resumen del carrito: "**N** bolsas · **total** €" y un botón **"Vaciar"** que se desactiva cuando el carrito está vacío.
- Un **buscador**: un input **controlado** (`value` + `onChange`) que filtra las tarjetas por nombre. Si no hay coincidencias, "Sin resultados".

🔎 **Qué comprobar**

1. Añadid tres bolsas: el contador y el total cambian. Vaciad: vuelven a 0 y el botón se desactiva.
2. Escribid "ken" en el buscador: sólo queda Kenia. Escribid "zzz": "Sin resultados".
3. Revisad vuestro código: tenéis **dos** estados (`cart` y el texto del buscador). Ni el total, ni el número de bolsas, ni la lista filtrada son estados.

📝 **Qué responder**

- ¿Por qué escribís `onAdd={addToCart}` y no `onAdd={addToCart()}`?
- ¿Por qué el total del carrito no necesita su propio `useState`? ¿Qué problema podríais tener si lo fuera?

### Bloque 2 · Hooks (sesión 02)

#### O3 · Cargar los cafés con `useEffect`

🛠️ **Qué hacer**

- Quitad el array escrito a mano. Ahora los cafés se piden a `/coffees.json` con `fetch` dentro de un `useEffect`.
- Tres estados para la petición: `coffees`, `loading` y `error`.
- Comprobad `response.ok`: un error HTTP no hace fallar a `fetch` por sí solo.
- La pantalla muestra **"Cargando…"**, el **error** o la lista, según toque.

🔎 **Qué comprobar**

1. Con *Network* abierto, desactivad la caché y elegid una conexión lenta (*Slow 4G* o *3G*): se ve "Cargando…" antes de la lista.
2. Bloquead `coffees.json` en *Network* (botón derecho → *Block request URL*) y recargad: sale vuestro mensaje de error. Desbloqueadlo.
3. Buscad "zzz": "Sin resultados". **Vacío no es lo mismo que error.**

📝 **Qué responder**

- ¿Por qué la petición va dentro de un `useEffect` y no directamente en el cuerpo del componente? ¿Qué significa el `[]` del final?

#### O4 · Un custom hook y una ref

🛠️ **Qué hacer**

- Moved los tres estados y el efecto a `src/use-coffees.ts`, en un hook `useCoffees()` que devuelva `{ coffees, loading, error }` (tema 02, paso 5).
- En el componente sólo queda: `const { coffees, loading, error } = useCoffees();`
- Un botón **"Buscar"** junto al título que lleve el foco al input del buscador con `useRef` (tema 02, paso 6).

🔎 **Qué comprobar**

1. Todo sigue funcionando igual que en O3: el componente es más corto y no ha cambiado su comportamiento.
2. Pulsad "Buscar" y escribid directamente: el foco está en el campo.

📝 **Qué responder**

- Si dos componentes distintos llaman a `useCoffees()`, ¿comparten los mismos datos o cada uno tiene los suyos? ¿Cuántas peticiones se hacen?
- ¿Por qué el foco se hace con una ref y no con un estado?

### Bloque 3 · Una aplicación con rutas y formularios (sesión 03)

#### O5 · Lista y detalle con TanStack Router

🛠️ **Qué hacer**

Seguid los pasos 0-4 de la sesión 03:

- Instalad `@tanstack/react-router` y, para desarrollo, `@tanstack/router-plugin`. Añadid el plugin a `vite.config.ts` **antes** del de React.
- Las rutas, con archivos:
  ```text
  src/routes/
    __root.tsx           marco común: nombre de la tienda, navegación y <Outlet />
    index.tsx            "/" redirige a "/coffees"
    coffees/
      index.tsx          "/coffees": el catálogo de O4
      $coffeeId.tsx      "/coffees/1", "/coffees/2"…: el detalle de un café

  ```
- Registrad el router con `declare module ... Register` (paso 2) y montadlo en `main.tsx`.
- El nombre de cada tarjeta pasa a ser un `<Link to="/coffees/$coffeeId" params={…}>`.
- El detalle muestra todos los datos del café (también el tueste y las notas de cata) y un enlace para volver. Para leerlo, un segundo hook `useCoffee(id)`, igual que `useCoffees` pero que depende de `[id]`.
- Una ruta desconocida muestra "Página no encontrada", y un café que no existe, "Café no encontrado".
- **Cambiad el script de `build`** a `"vite build && tsc --noEmit"`: el plugin genera `routeTree.gen.ts` al construir, y `tsc` lo necesita (tema 03, "Cerramos el recorrido").

> 💡 Cread `src/api.ts` con `getCoffees` y `getCoffee` adaptando el `api.ts` de la demo `03-aplicacion/demos/01-rutas` (cambiad personas por cafés y `/members.json` por `/coffees.json`), y que vuestros hooks lo usen.

🔎 **Qué comprobar**

1. Pulsad un café: la URL cambia a `/coffees/3` y se ve su detalle. **Atrás** y **Adelante** del navegador funcionan.
2. Escribid directamente `/coffees/4` en la barra y recargad: se abre ese café.
3. `/coffees/999` → "Café no encontrado". `/teteras` → "Página no encontrada".
4. En el `Link`, escribid mal el parámetro (`coffeeID`): TypeScript da error. Corregidlo.
5. Añadid dos bolsas al carrito, entrad en un detalle y volved al catálogo. 🤔 ¿Qué ha pasado con el carrito?

📝 **Qué responder**

- ¿Qué ganamos con una URL por pantalla frente a mostrar el detalle con un booleano en el estado?
- Según la comprobación 5: ¿por qué se ha vaciado el carrito? (tema 02, "Montaje, actualización y desmontaje"). ¿Dónde tendría que vivir ese estado para no perderse? (Arreglarlo es el opcional P1).

#### O6 · Alta de cafés con TanStack Form y Zod

🛠️ **Qué hacer**

Seguid los pasos 5-8 de la sesión 03:

- Una ruta nueva `coffees/new.tsx` y un enlace "Añadir café" en la navegación.
- Instalad `@tanstack/react-form` y `zod`. Un `src/coffee.schema.ts` con estas reglas:
  | Campo    | Regla                                                   |
  | -------- | ------------------------------------------------------- |
  | `name`   | Texto, sin espacios a los lados, al menos 2 caracteres  |
  | `origin` | Texto, sin espacios a los lados, al menos 2 caracteres  |
  | `roast`  | Sólo `"light"`, `"medium"` o `"dark"` (`z.enum`)        |
  | `price`  | Número mayor que 0 (y, si queréis, un máximo razonable) |
  | `notes`  | Texto, como mucho 120 caracteres (puede ir vacío)       |
- Un componente `CoffeeForm` con `useForm`, validado con el esquema en `onChange` y `onSubmit`. Partid del `member-form.tsx` de la demo `03-formulario`. Cada campo con su `<label>` y su mensaje de error.
- Dos campos son distintos de los de la demo:
  - **El tueste** es un `<select>` con las tres opciones.
  - **El precio** es un `<input type="number">`. Su valor en el formulario tiene que ser un **número**, no un texto: usad `event.target.valueAsNumber` en el `onChange`.
- Al guardar, se navega al **detalle del café nuevo**.
- Para guardar, ampliad vuestro `api.ts` con el `saveCoffee` de la demo (guarda en `localStorage`).

🔎 **Qué comprobar**

1. Enviad el formulario vacío: salen los errores y **no** se navega.
2. Un nombre con sólo espacios **no** vale. Un precio de `0` o negativo, tampoco.
3. Con datos válidos, se abre el detalle del café nuevo y el café aparece en el catálogo.
4. Recargad la página: el café sigue ahí. En DevTools → *Application* → *Local Storage* veréis vuestra clave. Borradla y recargad: vuelven los 6 cafés iniciales.
5. Mientras se guarda, el botón está desactivado.

📝 **Qué responder**

- Ya teníais la interfaz `Coffee` en TypeScript. ¿Para qué hace falta además un esquema de Zod?
- ¿Por qué el precio necesita `valueAsNumber`? ¿Qué pasaría con el esquema si llegase como texto?

### Bloque 4 · Arquitectura (sesión 04)

#### O7 · Edición y organización en pods

🛠️ **Qué hacer**

Dos cosas a la vez, como en la sesión 04:

**1. Editar un café.** Una ruta `/coffees/$coffeeId/edit` y un enlace "Editar café" en el detalle. Se **reutiliza el mismo formulario** de O6, que ahora recibe unos valores iniciales opcionales. Al guardar se conserva el `id`: **editar no crea un café nuevo**.

**2. Reorganizar el código** siguiendo el mapa de la demo `04-arquitectura/demos/01-pods`:

```text
src/
  routes/                  sólo navegación: leen parámetros y pintan una escena
    coffees/
      index.tsx
      new.tsx
      $coffeeId/
        index.tsx          (antes era $coffeeId.tsx)
        edit.tsx
  core/
    router/router.ts       crear y registrar el router
    coffees/               lo que comparten los dos pods
      model.ts
      coffee.schema.ts
      api.ts
      hooks.ts
  layouts/app-layout.tsx   navegación + <Outlet />
  scenes/                  componen una pantalla y deciden adónde navegar
  pods/
    catalogo/              lista, buscador, carrito y detalle
    edicion/               formulario de alta y edición
  common/components/       mensajes de carga y error

```

Las reglas:

- Cada pod tiene **container** (pide los datos y decide qué mostrar) y **component** (recibe props y pinta).
- Cada pod tiene un `index.ts` con lo que exporta. Las escenas importan **sólo** de ahí.
- **Ningún pod importa al otro.** El catálogo enlaza a la edición con un `Link`, no importando su formulario.
- El formulario no sabe adónde ir después de guardar: recibe un `onSaved` de la escena.

🔎 **Qué comprobar**

1. Entrad en un café, pulsad "Editar": los campos ya tienen sus valores.
2. Cambiad el precio, guardad: volvéis al detalle con el precio nuevo. En el catálogo el café aparece **una sola vez**.
3. Recargad: el cambio se conserva.
4. `/coffees/999/edit` → "Café no encontrado".
5. Cambiad la regla del nombre en `coffee.schema.ts` (por ejemplo, mínimo 4 caracteres): **el alta y la edición** la aplican a la vez. Dejadla como estaba.
6. Buscad en `pods/catalogo` algún `import` de `pods/edicion`: no tiene que haber ninguno.

📝 **Qué responder**

- Imaginad estos tres cambios: el diseño de la tarjeta de café, la regla de validación del precio y adónde se va después de guardar. ¿En qué fichero haríais cada uno?
- ¿Qué ventaja tiene separar el container del component? ¿Lo haríais en todos los componentes?

### O8 · README + bitácora de IA

El `README.md` del repo tiene que incluir:

1. **Cómo arrancarlo**: `npm install`, `npm start` y `npm run build`.
2. Un **mapa de la aplicación**: las rutas que hay y qué muestra cada una.
3. Las **respuestas 📝** de O1 a O7.
4. **Capturas**: el catálogo con el carrito, el detalle, el formulario mostrando errores y la pantalla de "Cargando…" o de error.
5. **Checklist** de obligatorios / opcionales / desafíos hechos.
6. 🤖 **Bitácora de IA**: qué herramienta(s) habéis usado y **al menos 3 ejemplos** con este formato:

```md
### Prompt

"Añade un total del carrito que se actualice cuando añado cafés"

### Qué me dio

Un useState para el total y un useEffect que lo recalculaba cada vez que cambiaba el carrito.

### Qué corregí y por qué

Lo quité: el total se calcula durante el render con reduce. Con el efecto se pintaba
primero el total antiguo y había dos estados que podían no coincidir.

```

> 💡 Lo interesante de la bitácora **no** es que la IA lo hiciera bien, sino **lo que tuvisteis que arreglar**. En React hay mucho material: la IA ha aprendido de años de componentes de clase, Create React App y React Router.

---

## ⭐ Parte 2 · Opcionales

Suben nota. Haced los que más os apetezcan (recomendamos **al menos 3**).

### P1 · Un carrito que no se pierde

Arreglad lo que visteis en O5: que el carrito sobreviva al navegar. Subid el estado a un sitio que no se desmonte (el layout) y hacedlo llegar a quien lo necesite con **Context** (`createContext` + un hook `useCart()`). Mostrad el número de bolsas en la navegación, visible desde cualquier pantalla. Explicad en el README por qué el módulo no usaba Context y vosotros sí. ([Documentación de React](https://es.react.dev/learn/passing-data-deeply-with-context)).

### P2 · Y que sobreviva también a recargar

Guardad el carrito en `localStorage`: leedlo al iniciar el estado (`useState(() => …)`) y guardadlo con un `useEffect` cuando cambie. Explicad por qué la lectura va en la inicialización y la escritura en un efecto.

### P3 · Una cuenta atrás para la oferta ⏱️

Un banner "🎉 Envío gratis: quedan **MM:SS**" con un `setInterval` dentro de un `useEffect` **que se limpie** (tema 02, paso 2). Un botón "Ocultar oferta" lo desmonta. Comprobad que, al montarlo y desmontarlo varias veces, la cuenta **no** va cada vez más rápido. Explicad qué pasaría sin la limpieza.

### P4 · Filtros que viven en la URL

Además del buscador, un filtro por tueste (claro / medio / oscuro). Guardad los dos en la URL como *search params* (`/coffees?roast=dark&q=bra`) con la validación de búsqueda de TanStack Router. Así un enlace compartido abre el catálogo ya filtrado. ([Documentación](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)).

### P5 · Memorizar… con cabeza

Generad un catálogo de prueba de 2.000 cafés y repetid la experiencia de la demo `02-memorizacion`: `console.count` en el filtrado, un cambio de estado que no tenga nada que ver y `useMemo`. Contad en el README qué medisteis, si mejoró algo y por qué **no** hay que memorizarlo todo.

### P6 · CSS Modules

Rehaced la tarjeta de café con un `coffee-card.module.css` en lugar de Tailwind (tema 03, "Solo si hay tiempo"). Mirad en DevTools el nombre de clase que genera Vite. Comparad en el README los dos enfoques: dónde editáis el aspecto en cada caso.

### P7 · Eliminar un café

Un botón "Eliminar" en el detalle que pida confirmación y lo quite del catálogo. Pensad dónde va cada pieza: ¿en qué pod? ¿quién decide adónde navegar después? ¿cómo lo guardáis en `localStorage` si el café venía del JSON inicial?

---

## 🔥 Parte 3 · Desafíos

Para quien quiera sufrir un poco (y aprender mucho). Cada uno cuenta como un plus importante.

### D1 · Una búsqueda con *debounce*

Haced que el buscador **pida los datos** al servidor en cada búsqueda (como en el paso 3 de la sesión 02), pero esperando 300 ms desde la última tecla. Tenéis que limpiar **dos cosas**: el temporizador y la petición anterior. Comprobadlo en *Network* con una conexión lenta: sólo debe quedar la última petición.

### D2 · React Compiler

Activad React Compiler en el proyecto (tema 02, "¿Y React Compiler?": `oxc-transform-react` y `react({ compiler: true })`). Repetid la medición de P5 con y sin él y contad qué cambia. Explicad qué **no** arregla el Compiler.

### D3 · Un contrato de API distinto

Simulad que el servidor cambia: el JSON pasa a enviar `coffee_name` y `price_cents` (el precio en céntimos, entero). Escribid un **modelo de API** y un **mapper** en `core/coffees` (tema 04, "Si queda tiempo") para que **nada** fuera de `core` tenga que cambiar. Demostradlo: ningún componente modificado.

### D4 · Tests de componentes

Instalad [Vitest](https://vitest.dev/) y [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) y probad, como mínimo:

- Que `CoffeeCard` muestra el nombre y el precio con dos decimales.
- Que el formulario muestra un error con un nombre de un carácter y no llama a `onSave`.

Buscad los elementos como lo haría una persona (`getByRole`, `getByLabelText`), no por clases.

### D5 · Hacia TanStack Start

La siguiente sesión del curso es TanStack Start. Leed su documentación y, en el README, explicad qué partes de vuestra aplicación cambiarían: ¿qué pasaría con `useCoffees` y el `useEffect` si los datos se cargasen con un *loader* de la ruta? Si os atrevéis, migrad la carga del detalle a un `loader` de TanStack Router.

---

## 🤖 Cómo sacarle partido a la IA (sin que os la cuele)

**Dadle contexto.** React ha cambiado mucho y la IA mezcla épocas:

```text
Estoy con React 19, TypeScript 7 en modo estricto, Vite 8 y Tailwind 4.
Uso TanStack Router con rutas por archivos (plugin de Vite) y TanStack Form
con Zod 4 (Standard Schema, sin adaptador). Componentes como funciones.

Tengo este modelo: [pegad model.ts]. Hazme el campo de precio del formulario:
input type="number", el valor en el formulario tiene que ser un número,
con su label y sus errores enlazados con aria-describedby.

```

**Pedidle que os explique**, no sólo que haga: *"¿por qué esto es un estado y no un cálculo?"*, *"¿cuándo se ejecuta este efecto y qué limpia?"*, *"¿esto se vuelve a ejecutar en cada render?"*.

**Revisad siempre esta lista**, porque es lo que la IA suele hacer mal:

| ❌ Lo que suele hacer                                                     | ✅ Qué hacer                                                            |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Componentes de clase (`class extends React.Component`, `this.setState`)  | Componentes función y hooks                                            |
| React Router (`react-router-dom`, `<BrowserRouter>`, `useParams()`)      | TanStack Router: `createFileRoute`, `Route.useParams()`, `Link` tipado |
| Escribir o "arreglar" `routeTree.gen.ts` a mano                          | Lo genera el plugin: no se toca                                        |
| Un `useState` + `useEffect` para datos derivados (total, lista filtrada) | Calcularlos durante el render                                          |
| `cart.push(coffee); setCart(cart)`                                       | `setCart(previous => [...previous, coffee])`                           |
| `key={index}` en listas que cambian                                      | `key={coffee.id}`                                                      |
| `useEffect` sin limpieza para intervalos o peticiones                    | Devolver la función que limpia: `clearInterval`, `controller.abort()`  |
| Llamar a un hook dentro de un `if` o después de un `return`              | Hooks siempre arriba, antes de los returns condicionales               |
| `useMemo` y `useCallback` en todas partes "por rendimiento"              | Sólo cuando se ha medido un problema y hay alguien que lo aprovecha    |
| `@hookform/resolvers` o `zodValidator` para conectar Zod                 | TanStack Form acepta el esquema de Zod 4 directamente                  |
| `onClick={addToCart(coffee)}`                                            | `onClick={() => addToCart(coffee)}`                                    |

**Usad las React DevTools** (extensión del navegador): la pestaña *Components* muestra el árbol, las props y el estado de cada componente. Es la forma más rápida de ver dónde vive cada dato.

---

## 📬 Entrega

1. Repositorio **público** en GitHub (o privado dando acceso a los profesores), con **un commit por obligatorio** si puede ser.
2. En la raíz: el proyecto + el `README.md` de O8.
3. Capturas en una carpeta `docs/` o `screenshots/`.
4. En el portal academia.lemoncode.net id a los laboratorios del módulo 4 y pegad el enlace a vuestro repo.

> ✋ No subáis `node_modules` ni `dist` (el `.gitignore` de la demo ya los excluye).

## 📊 Evaluación

| Bloque                                                             | Peso |
| ------------------------------------------------------------------ | ---- |
| Obligatorios O1-O7 (la aplicación funciona y `build` sin errores)  | 50 % |
| README: respuestas, capturas y bitácora de IA (O8)                 | 10 % |
| Opcionales (P1-P7)                                                 | 20 % |
| Desafíos (D1-D5)                                                   | 15 % |
| Acabado: que se vea bien y sea accesible (labels, foco, errores) ✨ | 5 %  |

- Para **aprobar**: todos los obligatorios hechos, las comprobaciones 🔎 funcionando y `npm run build` sin errores.
- En la revisión podemos pediros que **expliquéis un componente** o que hagáis un **cambio pequeño en directo** (p. ej. "añade el campo de tueste a la tarjeta", "que el carrito no deje añadir un café agotado" o "añade una regla al esquema"). Es la forma de comprobar que el código es vuestro, lo haya escrito quien lo haya escrito.

## 📚 Recursos

- Los apuntes del módulo: [04-framework-react](https://github.com/Lemoncode/luckia-front-end-moderno-ia/tree/04-framework-react/04-framework-react). Cada obligatorio indica la sesión y el paso.
- [React en español](https://es.react.dev/learn): sobre todo [Pensar en React](https://es.react.dev/learn/thinking-in-react), [Elegir la estructura del estado](https://es.react.dev/learn/choosing-the-state-structure) y [Quizás no necesites un Effect](https://es.react.dev/learn/you-might-not-need-an-effect).
- [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview) y [rutas por archivos](https://tanstack.com/router/latest/docs/routing/file-based-routing).
- [TanStack Form: validación](https://tanstack.com/form/latest/docs/framework/react/guides/validation) y [Zod](https://zod.dev/).
- [React DevTools](https://es.react.dev/learn/react-developer-tools).
- Material complementario: [React en el máster de Lemoncode](https://github.com/Lemoncode/master-frontend-lemoncode/tree/master/04-frameworks/01-react).

¡A tostar componentes! ☕⚛️