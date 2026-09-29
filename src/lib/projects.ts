import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import { href, type Lang } from '../i18n';

export type Project = CollectionEntry<'proyectos'>;

/** Newest first; projects without a year go last. Case studies come before the rest of the same year. */
function compare(a: Project, b: Project) {
  const ya = a.data.year ?? -1;
  const yb = b.data.year ?? -1;
  if (ya !== yb) return yb - ya;
  if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
  return a.data.title.localeCompare(b.data.title, 'es');
}

/**
 * Overlays the English text on a project. Spanish entries stay the source of
 * truth for everything else (year, stack, links…), so a missing translation
 * simply falls back to Spanish.
 */
export async function localize(p: Project, lang: Lang): Promise<Project> {
  if (lang === 'es') return p;
  const en = await getEntry('proyectosEn', p.id);
  if (!en) return p;
  const { title, summary, client, metric, linkNotes } = en.data;
  return {
    ...p,
    data: {
      ...p.data,
      title,
      summary,
      client: client ?? p.data.client,
      metric: p.data.metric && { value: metric?.value ?? p.data.metric.value, label: metric?.label ?? p.data.metric.label },
      links: p.data.links?.map((l) => ({ ...l, note: linkNotes?.[l.name] ?? l.note })),
    },
  };
}

const localizeAll = (list: Project[], lang: Lang) => Promise.all(list.map((p) => localize(p, lang)));

export async function getProjects(lang: Lang) {
  const all = await getCollection('proyectos');
  return localizeAll(all.sort(compare), lang);
}

export async function getCases(lang: Lang) {
  const all = await getCollection('proyectos', ({ data }) => data.featured);
  return localizeAll(all.sort((a, b) => a.data.order - b.data.order), lang);
}

/** Renders a case study body in a language (the English file carries its own body). */
export async function renderCase(p: Project, lang: Lang) {
  const en = lang === 'en' ? await getEntry('proyectosEn', p.id) : undefined;
  return render(en ?? p);
}

const present = { es: 'hoy', en: 'present' } as const;

export function formatYears({ year, yearEnd }: Project['data'], lang: Lang) {
  if (year === null) return yearEnd === 'hoy' ? present[lang] : '—';
  if (yearEnd === undefined || yearEnd === year) return String(year);
  return `${year} — ${yearEnd === 'hoy' ? present[lang] : yearEnd}`;
}

/** Where an archive row points: its case study, the live site or nothing. */
export function projectHref(p: Project, lang: Lang) {
  if (p.data.featured) return { href: href(lang, { name: 'case', id: p.id }), external: false };
  if (p.data.url && p.data.status === 'live') return { href: p.data.url, external: true };
  return null;
}

const statusLabels: Record<Lang, Record<Project['data']['status'], string>> = {
  es: {
    live: 'En línea',
    internal: 'Herramienta interna',
    replaced: 'Versión ya reemplazada',
    offline: 'Ya no está en línea',
  },
  en: {
    live: 'Live',
    internal: 'Internal tool',
    replaced: 'Since replaced',
    offline: 'No longer online',
  },
};

export const statusLabel = (status: Project['data']['status'], lang: Lang) => statusLabels[lang][status];

/** Projects of a freelance block, flattened to {name, url, note} rows. */
export function groupItems(projects: Project[], group: string, lang: Lang) {
  return projects
    .filter((p) => p.data.group === group)
    .flatMap((p) =>
      p.data.links?.length
        ? p.data.links.map((l) => ({ name: l.name, url: l.url, note: l.note ?? '', logo: l.logo }))
        : [
            {
              name: p.data.client,
              logo: p.data.logo,
              url: p.data.status === 'live' ? p.data.url : undefined,
              note: [
                p.data.title,
                p.data.stack.slice(0, 2).join(', '),
                p.data.status === 'replaced' || p.data.status === 'offline'
                  ? statusLabel(p.data.status, lang).toLowerCase()
                  : null,
              ]
                .filter(Boolean)
                .join(' · '),
            },
          ],
    );
}
