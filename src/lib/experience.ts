import { getCollection, type CollectionEntry } from 'astro:content';
import { freelanceExperience } from '../data/career';
import type { LogoId } from '../data/logos';

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

/** Current jobs first, then most recent first. */
const byRecency = (a: { current: boolean; startYear: number }, b: { current: boolean; startYear: number }) =>
  Number(b.current) - Number(a.current) || b.startYear - a.startYear;

export async function getCompanies() {
  const companies = await getCollection('empresas');
  return companies.sort((a, b) => byRecency(a.data, b.data));
}

export const companyHref = (company: Company) => `/experiencia/${company.id}/`;

export async function getExperienceItems(): Promise<ExperienceItem[]> {
  const companies = await getCompanies();
  const items: ExperienceItem[] = companies.map((c) => ({
    id: c.id,
    startYear: c.data.startYear,
    dates: `${c.data.start} — ${c.data.end}`,
    current: c.data.current,
    logo: c.data.logo,
    role: c.data.role,
    company: c.data.company,
    summary: c.data.summary,
    highlights: c.data.highlights,
    stack: c.data.stack,
    filters: c.data.filters,
    href: companyHref(c),
    hrefLabel: 'Ver la experiencia completa',
  }));
  const f = freelanceExperience;
  items.push({ ...f, dates: `${f.start} — ${f.end}` });
  return items.sort(byRecency);
}
