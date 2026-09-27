# Portafolio alpacorp.net

Lee `README.md` para la estructura y cómo añadir proyectos. `AGENTS.md` explica cómo arrancar el servidor de Astro en segundo plano.

## Reglas del contenido

- **No inventar datos.** Cifras, años, clientes y logros salen de `_privado/investigacion-proyectos.md`, del CV o de lo que diga Alejandro. Si falta un dato, `year: null` o se omite; nunca un placeholder visible en el sitio.
- `_privado/` está en `.gitignore`: CV, LinkedIn, inventario y notas con información de clientes. Nunca copiar de ahí teléfonos, credenciales ni cifras internas de clientes.
- Textos en español de Colombia, primera persona, tono directo. Casos con la estructura reto → qué hice → resultado.
- Proyectos reemplazados u offline (`status: replaced | offline`) no se enlazan como trabajo propio.

## Reglas del código

- Sin frameworks de UI: la interactividad va en `<script>` de cada componente, con JavaScript nativo y atributos `data-*`.
- Colores solo a través de los tokens de `src/styles/global.css`; cada cambio de color debe funcionar en claro y oscuro.
- Accesibilidad: botones reales con `aria-pressed`, objetivos táctiles de 44 px o más, foco visible, `prefers-reduced-motion`.
- En Astro, un salto de línea entre texto y una etiqueta se come el espacio: usa `{' '}` o deja el texto en la misma línea.
- Antes de dar algo por terminado: `npm run check` y `npm run build` sin errores, y revisar que no haya scroll horizontal a 390 px.
- To check that each commit builds on its own, build it in a separate `git worktree`; never `git stash` untracked files while the dev server is running — it drops content collections from its cache until restarted (`npm run dev:fresh` recovers).
