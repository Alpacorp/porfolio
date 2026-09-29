import { getCollection, getEntries, getEntry, type CollectionEntry } from 'astro:content';
import { freelanceExperience } from '../data/career';
import type { LogoId } from '../data/logos';
import { href, type Lang } from '../i18n';
import { useT } from '../i18n/ui';
import { localize as localizeProject } from './projects';

export type Company = CollectionEntry<'empresas'>;

/** One row of the experience list: a company or the freelance work. */
export type ExperienceItem = {
  id: string;
  startYear: number;
  dates: string;
  current: boolean;
  logo: LogoId;
  role: string;
  company: string;
  summary: string;
  highlights: string[];
  stack: string[];
  filters: string[];
  href: string;
  hrefLabel: string;
};

type Recency = { current: boolean; startYear: number };

/** Current jobs first, then most recent first. */
export const byRecency = (first: Recency, second: Recency) =>
  Number(second.current) - Number(first.current) || second.startYear - first.startYear;

/** Overlays the English text on a company; phases are matched by id. */
async function localize(company: Company, lang: Lang): Promise<Company> {
  if (lang === 'es') return company;
  const translation = await getEntry('empresasEn', company.id);
  if (!translation) return company;
  const { phases: translatedPhases, ...text } = translation.data;
  return {
    ...company,
    data: {
      ...company.data,
      ...text,
      phases: company.data.phases.map((phase) => ({
        ...phase,
        ...translatedPhases.find((translated) => translated.id === phase.id),
      })),
    },
  };
}

export async function getCompanies(lang: Lang) {
  const companies = await getCollection('empresas');
  const sorted = companies.sort((first, second) => byRecency(first.data, second.data));
  return Promise.all(sorted.map((company) => localize(company, lang)));
}

export const companyHref = (company: Company, lang: Lang) => href(lang, { name: 'experience', id: company.id });

/** A company's phases with their project references resolved and translated, in order. */
export function resolvePhases(company: Company, lang: Lang) {
  return Promise.all(
    company.data.phases.map(async (phase) => {
      const projects = await getEntries(phase.projects);
      return { ...phase, projects: await Promise.all(projects.map((project) => localizeProject(project, lang))) };
    }),
  );
}

export async function getExperienceItems(lang: Lang): Promise<ExperienceItem[]> {
  const ui = useT(lang);
  const companies = await getCompanies(lang);
  const items: ExperienceItem[] = companies.map(({ id, data }) => ({
    id,
    startYear: data.startYear,
    dates: `${data.start} — ${data.end}`,
    current: data.current,
    logo: data.logo,
    role: data.role,
    company: data.company,
    summary: data.summary,
    highlights: data.highlights,
    stack: data.stack,
    filters: data.filters,
    href: href(lang, { name: 'experience', id }),
    hrefLabel: ui.fullExperience,
  }));
  const freelance = freelanceExperience;
  items.push({
    id: freelance.id,
    startYear: freelance.startYear,
    dates: `${freelance.startYear} — ${ui.today}`,
    current: freelance.current,
    logo: freelance.logo,
    role: freelance.role[lang],
    company: freelance.company,
    summary: freelance.summary[lang],
    highlights: freelance.highlights[lang],
    stack: freelance.stack[lang],
    filters: freelance.filters,
    href: href(lang, freelance.more.route, freelance.more.suffix),
    hrefLabel: ui.freelanceProjects,
  });
  return items.sort(byRecency);
}
