import { nav, profile } from '../data/profile';
import { href, locale, otherLang, section, type Lang } from '../i18n';
import { useT } from '../i18n/ui';

export type PaletteItem = {
  group: string;
  label: string;
  href?: string;
  action?: 'theme' | 'copy-email';
  /** Shown to the right of the label. */
  hint?: string;
  /** Extra search terms, never shown. */
  keywords?: string;
};


/** Everything ⌘K can jump to or do, in the page language. */
export function buildPaletteItems({
  lang,
  cases,
  companies,
  alternate,
}: {
  lang: Lang;
  cases: { id: string; data: { title: string; client: string } }[];
  companies: { id: string; data: { company: string; role: string } }[];
  /** Same page in the other language. */
  alternate: string;
}): PaletteItem[] {
  const ui = useT(lang);
  const other = otherLang(lang);
  return [
    ...nav.map((item) => ({
      group: ui.groupSections,
      label: item.label[lang],
      href: item.page ? href(lang, { name: item.page }) : section(lang, item.id),
    })),
    ...cases.map((project) => ({
      group: ui.groupCases,
      label: project.data.title,
      href: href(lang, { name: 'case', id: project.id }),
      hint: project.data.client,
    })),
    ...companies.map((company) => ({
      group: ui.groupExperience,
      label: company.data.company,
      href: href(lang, { name: 'experience', id: company.id }),
      hint: company.data.role,
    })),
    { group: ui.groupPages, label: ui.allCasesPage, href: href(lang, { name: 'cases' }) },
    { group: ui.groupPages, label: ui.printableCv, href: href(lang, { name: 'cv' }) },
    {
      group: ui.groupActions,
      label: ui.switchLanguage,
      href: alternate,
      hint: locale[other].name,
      keywords: 'english spanish español inglés idioma language',
    },
    { group: ui.groupActions, label: ui.toggleTheme, action: 'theme' },
    { group: ui.groupActions, label: ui.copyEmail, action: 'copy-email', hint: profile.email },
    { group: ui.groupActions, label: ui.writeEmail, href: `mailto:${profile.email}` },
    { group: ui.groupActions, label: ui.openLinkedIn, href: profile.links.linkedin },
  ];
}

/** Text an option is searched by: what it shows plus its hidden keywords. */
export const searchText = (item: PaletteItem) =>
  [item.label, item.hint, item.group, item.keywords].filter(Boolean).join(' ');

