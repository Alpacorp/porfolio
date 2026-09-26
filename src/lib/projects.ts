import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'proyectos'>;

/** Más recientes primero; los que aún no tienen año van al final. Los casos, antes que el resto del mismo año. */
function compare(a: Project, b: Project) {
  const ya = a.data.year ?? -1;
  const yb = b.data.year ?? -1;
  if (ya !== yb) return yb - ya;
  if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
  return a.data.title.localeCompare(b.data.title, 'es');
}

export async function getProjects() {
  const all = await getCollection('proyectos');
  return all.sort(compare);
}

export async function getCases() {
  const all = await getCollection('proyectos', ({ data }) => data.featured);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export function formatYears({ year, yearEnd }: Project['data']) {
  if (year === null) return yearEnd === 'hoy' ? 'hoy' : '—';
  if (yearEnd === undefined || yearEnd === year) return String(year);
  return `${year} — ${yearEnd}`;
}

/** Destino de una fila del archivo: su caso de estudio, el sitio en vivo o nada. */
export function projectHref(p: Project) {
  if (p.data.featured) return { href: `/casos/${p.id}/`, external: false };
  if (p.data.url && p.data.status === 'live') return { href: p.data.url, external: true };
  return null;
}

export const statusLabel: Record<Project['data']['status'], string> = {
  live: 'En línea',
  internal: 'Herramienta interna',
  replaced: 'Versión ya reemplazada',
  offline: 'Ya no está en línea',
};

/** Proyectos de un bloque freelance, aplanados a filas {nombre, url, nota}. */
export function groupItems(projects: Project[], group: string) {
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
                  ? statusLabel[p.data.status].toLowerCase()
                  : null,
              ]
                .filter(Boolean)
                .join(' · '),
            },
          ],
    );
}
