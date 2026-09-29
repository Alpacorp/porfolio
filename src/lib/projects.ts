import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import { href, type Lang } from '../i18n';
import { sectorName } from '../i18n/ui';
import { normalize } from './filters';

export type Project = CollectionEntry<'proyectos'>;
type ProjectData = Project['data'];

/** Newest first; projects without a year go last. Case studies come before the rest of the same year. */
function byRecency(lang: Lang) {
  return (first: Project, second: Project) => {
    const firstYear = first.data.year ?? -1;
    const secondYear = second.data.year ?? -1;
    if (firstYear !== secondYear) return secondYear - firstYear;
    if (first.data.featured !== second.data.featured) return first.data.featured ? -1 : 1;
    return first.data.title.localeCompare(second.data.title, lang);
  };
}

/**
 * Overlays the English text on a project. Spanish entries stay the source of
 * truth for everything else (year, stack, links…), so a missing translation
 * simply falls back to Spanish.
 */
export async function localize(project: Project, lang: Lang): Promise<Project> {
  if (lang === 'es') return project;
  const translation = await getEntry('proyectosEn', project.id);
  if (!translation) return project;
  const { title, summary, client, via, metric, linkNotes } = translation.data;
  const source = project.data;
  return {
    ...project,
    data: {
      ...source,
      title,
      summary,
      client: client ?? source.client,
      via: via ?? source.via,
      metric: source.metric && {
        value: metric?.value ?? source.metric.value,
        label: metric?.label ?? source.metric.label,
      },
      links: source.links?.map((link) => ({ ...link, note: linkNotes?.[link.name] ?? link.note })),
    },
  };
}

const localizeAll = (projects: Project[], lang: Lang) =>
  Promise.all(projects.map((project) => localize(project, lang)));

export async function getProjects(lang: Lang) {
  const projects = await localizeAll(await getCollection('proyectos'), lang);
  return projects.sort(byRecency(lang));
}

export async function getCases(lang: Lang) {
  const cases = await getCollection('proyectos', ({ data }) => data.featured);
  return localizeAll(
    cases.sort((first, second) => first.data.order - second.data.order),
    lang,
  );
}

/** Renders a case study body in a language (the English file carries its own body). */
export async function renderCase(project: Project, lang: Lang) {
  const translation = lang === 'en' ? await getEntry('proyectosEn', project.id) : undefined;
  return render(translation ?? project);
}

const presentLabel: Record<Lang, string> = { es: 'hoy', en: 'present' };

export function formatYears({ year, yearEnd }: ProjectData, lang: Lang) {
  const end = yearEnd === 'hoy' ? presentLabel[lang] : yearEnd;
  if (year === null) return yearEnd === 'hoy' ? presentLabel[lang] : '—';
  if (end === undefined || end === year) return String(year);
  return `${year} — ${end}`;
}

/** «Client · Sector · Years», the line above a case study title. */
export const caseMeta = (project: Project, lang: Lang) =>
  [project.data.client, sectorName(project.data.sector, lang), formatYears(project.data, lang)].join(' · ');

/** Where an archive row points: its case study, the live site or nothing. */
export function projectHref(project: Project, lang: Lang) {
  if (project.data.featured) return { href: href(lang, { name: 'case', id: project.id }), external: false };
  if (project.data.url && project.data.status === 'live') return { href: project.data.url, external: true };
  return null;
}

const statusLabels: Record<Lang, Record<ProjectData['status'], string>> = {
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

export const statusLabel = (status: ProjectData['status'], lang: Lang) => statusLabels[lang][status];

/** The archive's type filter keys (they match the ?tipo= deep links). */
export const kindKey = (project: Project) => (project.data.kind === 'empleo' ? 'Empleo' : 'Freelance');

/**
 * What the archive search looks through, normalized at build time so the
 * client only normalizes the query.
 */
export const searchText = (project: Project, lang: Lang) =>
  normalize(
    [project.data.title, project.data.client, project.data.via, sectorName(project.data.sector, lang), ...project.data.stack]
      .filter(Boolean)
      .join(' '),
  );

/** Sector filter options: the data key as value, sorted by the name shown. */
export function sectorOptions(projects: Project[], lang: Lang) {
  return [...new Set(projects.map((project) => project.data.sector))]
    .map((key) => ({ key, name: sectorName(key, lang) }))
    .sort((first, second) => first.name.localeCompare(second.name, lang));
}

/** Projects of a freelance block, flattened to {name, url, note} rows. */
export function groupItems(projects: Project[], group: string, lang: Lang) {
  return projects
    .filter((project) => project.data.group === group)
    .flatMap(({ data }) =>
      data.links?.length
        ? data.links.map((link) => ({ name: link.name, url: link.url, note: link.note ?? '', logo: link.logo }))
        : [
            {
              name: data.client,
              logo: data.logo,
              url: data.status === 'live' ? data.url : undefined,
              note: [
                data.title,
                data.stack.slice(0, 2).join(', '),
                data.status === 'replaced' || data.status === 'offline'
                  ? statusLabel(data.status, lang).toLowerCase()
                  : null,
              ]
                .filter(Boolean)
                .join(' · '),
            },
          ],
    );
}
