import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { freelanceExperience } from '../data/career';
import type { LogoId } from '../data/logos';
import { href, type Lang } from '../i18n';
import { useT } from '../i18n/ui';

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

/** Overlays the English text on a company; phases are matched by id. */
async function localize(c: Company, lang: Lang): Promise<Company> {
  if (lang === 'es') return c;
  const en = await getEntry('empresasEn', c.id);
  if (!en) return c;
  const { phases, ...text } = en.data;
  return {
    ...c,
    data: {
      ...c.data,
      ...text,
      phases: c.data.phases.map((phase) => {
        const t = phases.find((p) => p.id === phase.id);
        return t ? { ...phase, ...t } : phase;
      }),
    },
  };
}

export async function getCompanies(lang: Lang) {
  const companies = await getCollection('empresas');
  return Promise.all(companies.sort((a, b) => byRecency(a.data, b.data)).map((c) => localize(c, lang)));
}

export const companyHref = (company: Company, lang: Lang) => href(lang, { name: 'experience', id: company.id });

export async function getExperienceItems(lang: Lang): Promise<ExperienceItem[]> {
  const t = useT(lang);
  const companies = await getCompanies(lang);
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
    href: companyHref(c, lang),
    hrefLabel: t.fullExperience,
  }));
  const f = freelanceExperience;
  items.push({
    id: f.id,
    startYear: f.startYear,
    dates: `${f.start[lang]} — ${f.end[lang]}`,
    current: f.current,
    logo: f.logo,
    role: f.role[lang],
    company: f.company,
    summary: f.summary[lang],
    highlights: f.highlights[lang],
    stack: f.stack[lang],
    filters: f.filters,
    href: href(lang, f.more.route, f.more.suffix),
    hrefLabel: f.more.label[lang],
  });
  return items.sort(byRecency);
}
