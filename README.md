# alpacorp.net

Portafolio de Alejandro Palacios. Astro 7, MDX y CSS propio, sin frameworks de UI.

## Comandos

| Comando           | Qué hace                                   |
| ----------------- | ------------------------------------------ |
| `npm install`     | Instala dependencias                       |
| `npm run dev`     | Servidor local en `localhost:4321`         |
| `npm run check`   | Revisa tipos y el esquema del contenido    |
| `npm run build`   | Genera el sitio estático en `dist/`        |
| `npm run preview` | Sirve `dist/` para revisarlo antes de subir |

## Dónde está cada cosa

```
src/
├── content/proyectos/   Un archivo por proyecto (la fuente de casos, archivo y línea de tiempo)
├── content.config.ts    Esquema de los proyectos
├── data/profile.ts      Nombre, frase, cifras, «tres idiomas», navegación
├── data/career.ts       Hitos, bloques freelance, experiencia, educación, habilidades
├── components/          Barra lateral, ⌘K, tabla del archivo, secciones de la home
├── layouts/             Base (head, tema) y Shell (dos columnas)
├── pages/               Home, /casos/[id], /archivo, /cv, 404
└── styles/global.css    Tokens de diseño «papel y resaltador» y utilidades
```

## Añadir un proyecto

Crea `src/content/proyectos/<id>.md`:

```yaml
---
title: Qué se hizo, en pocas palabras
client: Nombre del cliente
via: BBDO México          # opcional: agencia o intermediario
year: 2025                # null si no se sabe
yearEnd: hoy              # opcional: año o «hoy»
sector: Fintech
kind: freelance           # empleo | freelance
group: empresas           # opcional: goma | bbdo | empresas | novenas (bloque freelance de la línea de tiempo)
stack: [Astro, TypeScript]
url: https://…            # opcional
status: live              # live | internal | replaced | offline
summary: Una o dos frases.
---
```

Aparece solo en el archivo y, si tiene `group`, en su bloque de la línea de tiempo.

**Convertirlo en caso de estudio:** renómbralo a `.mdx`, añade `featured: true`, `order` y `metric: { value, label }`, y escribe la historia en el cuerpo (`## El reto`, `## Qué hice`, `## Resultado`). Se crea sola su página en `/casos/<id>/`.

## Logos

Cada logo son dos archivos en `src/assets/logos/`: `<id>.webp` (el original a color, que aparece al pasar el cursor en tema claro) y `<id>.mono.webp` (la máscara monocroma que se ve en reposo). Se registran en `src/data/logos.ts` con su alto y, si el original es blanco, `hoverColor: false`. Un proyecto lo usa con `logo: <id>` en su frontmatter.

## Diseño

- **Claro = papel, oscuro = tinta.** El tema sigue al sistema y se puede cambiar con el botón o con ⌘K.
- **Amarillo `#FFDD00`** como resaltador (`.hl`) y en el bloque de contacto. **Magenta** solo en hover y foco.
- **Geist** para textos y **Geist Mono** para datos (fechas, stack, cifras), autoalojadas con Fontsource.
