import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { logoIds } from './data/logos';

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
    /** Logo del cliente (ver src/data/logos.ts). */
    logo: z.enum(logoIds).optional(),
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
      .array(z.object({ name: z.string(), url: z.url(), note: z.string().optional(), logo: z.enum(logoIds).optional() }))
      .optional(),
  }),
});

/**
 * One file per employer. Each company has a page at /experiencia/<id> that tells
 * the full story by phases; the home page only shows its summary and highlights.
 */
const empresas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/empresas' }),
  schema: z.object({
    company: z.string(),
    /** Latest role; a career inside the company can be written as «A → B». */
    role: z.string(),
    logo: z.enum(logoIds),
    /** Display dates, e.g. «oct 2024» and «hoy». */
    start: z.string(),
    end: z.string(),
    /** Used for ordering. */
    startYear: z.number().int(),
    current: z.boolean().default(false),
    location: z.string(),
    summary: z.string(),
    /** The 2–3 achievements shown on the home page. */
    highlights: z.array(z.string()).min(1).max(3),
    stack: z.array(z.string()).default([]),
    /** Home page experience filters this company belongs to. */
    filters: z.array(z.string()).default([]),
    phases: z
      .array(
        z.object({
          /** Anchor on the company page, e.g. /experiencia/servientrega/#webmaster */
          id: z.string(),
          period: z.string(),
          title: z.string(),
          role: z.string().optional(),
          text: z.string(),
          achievements: z.array(z.string()).default([]),
          stack: z.array(z.string()).default([]),
          projects: z.array(reference('proyectos')).default([]),
        }),
      )
      .min(1),
  }),
});

/**
 * English translations. Each file mirrors a Spanish entry with the same id and
 * only carries the text: dates, stack, logos and links stay in the Spanish file,
 * which remains the single source of truth.
 */
const proyectosEn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/en/proyectos' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** Only when the Spanish client is a description rather than a name. */
    client: z.string().optional(),
    metric: z.object({ value: z.string().optional(), label: z.string() }).optional(),
    /** Notes for the `links` list, keyed by the link name. */
    linkNotes: z.record(z.string(), z.string()).optional(),
  }),
});

const empresasEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/en/empresas' }),
  schema: z.object({
    role: z.string(),
    start: z.string(),
    end: z.string(),
    location: z.string(),
    summary: z.string(),
    highlights: z.array(z.string()).min(1).max(3),
    /** Matched to the Spanish phases by id. */
    phases: z.array(
      z.object({
        id: z.string(),
        period: z.string(),
        title: z.string(),
        role: z.string().optional(),
        text: z.string(),
        achievements: z.array(z.string()).default([]),
      }),
    ),
  }),
});

export const collections = { proyectos, empresas, proyectosEn, empresasEn };
