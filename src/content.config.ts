import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Un archivo por proyecto. Los que tienen `featured: true` son casos de estudio
 * (su cuerpo MDX es la historia completa y tienen página en /casos/<id>);
 * el resto solo aparece como una línea en el archivo.
 */
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/proyectos' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    /** Agencia o intermediario, p. ej. «BBDO México». */
    via: z.string().optional(),
    year: z.number().int().nullable(),
    yearEnd: z.union([z.number().int(), z.literal('hoy')]).optional(),
    sector: z.string(),
    kind: z.enum(['empleo', 'freelance']),
    /** Bloque freelance de la línea de tiempo al que pertenece. */
    group: z.enum(['goma', 'bbdo', 'empresas', 'novenas']).optional(),
    stack: z.array(z.string()).default([]),
    url: z.url().optional(),
    /** live = en línea · internal = herramienta interna · replaced = ya reemplazado · offline = ya no existe */
    status: z.enum(['live', 'internal', 'replaced', 'offline']).default('live'),
    summary: z.string(),
    featured: z.boolean().default(false),
    /** Orden de los casos de estudio (menor = primero). */
    order: z.number().default(99),
    metric: z.object({ value: z.string(), label: z.string() }).optional(),
    /** Enlaces relacionados (p. ej. las 8 novenas de marca blanca). */
    links: z
      .array(z.object({ name: z.string(), url: z.url(), note: z.string().optional() }))
      .optional(),
  }),
});

export const collections = { proyectos };
