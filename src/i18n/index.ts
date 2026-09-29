/**
 * Minimal i18n: Spanish is the default language (served at /), English lives
 * under /en/. Localised values are plain objects with one key per language.
 */
export const langs = ['es', 'en'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'es';

/** A value in every language. */
export type L<T = string> = Record<Lang, T>;

export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

/** Locale tags for <html lang>, Open Graph and date formatting. */
export const locale: L<{ html: string; og: string; name: string }> = {
  es: { html: 'es', og: 'es_CO', name: 'Español' },
  en: { html: 'en', og: 'en_US', name: 'English' },
};

// --- Routes ------------------------------------------------------------------

const segments: L<{ cases: string; experience: string; archive: string; cv: string }> = {
  es: { cases: 'casos', experience: 'experiencia', archive: 'archivo', cv: 'cv' },
  en: { cases: 'cases', experience: 'experience', archive: 'archive', cv: 'cv' },
};

/** URL slug of each case study per language (the Spanish slug is the entry id). */
const caseSlugs: Record<string, string> = {
  'cdt-digital': 'cdt-digital',
  'plataforma-refunds': 'refunds-platform',
  'mr-goma-tires': 'mr-goma-tires',
  'servientrega-web-seo': 'servientrega-web-and-seo',
  'libreria-interfaces-json': 'json-driven-ui-library',
  'bbdo-mexico': 'bbdo-mexico',
  'novenas-digitales': 'white-label-novenas',
};

export const caseSlug = (id: string, lang: Lang) => (lang === 'en' ? (caseSlugs[id] ?? id) : id);

export type Route =
  | { name: 'home' }
  | { name: 'cases' }
  | { name: 'archive' }
  | { name: 'cv' }
  /** `id` is the project entry id; the slug is resolved per language. */
  | { name: 'case'; id: string }
  | { name: 'experience'; id: string };

/** URL of a route in a language, with an optional #hash or ?query suffix. */
export function href(lang: Lang, route: Route, suffix = ''): string {
  const base = lang === defaultLang ? '/' : `/${lang}/`;
  const seg = segments[lang];
  const path = (() => {
    switch (route.name) {
      case 'home':
        return base;
      case 'cases':
        return `${base}${seg.cases}/`;
      case 'archive':
        return `${base}${seg.archive}/`;
      case 'cv':
        return `${base}${seg.cv}/`;
      case 'case':
        return `${base}${seg.cases}/${caseSlug(route.id, lang)}/`;
      case 'experience':
        return `${base}${seg.experience}/${route.id}/`;
    }
  })();
  return path + suffix;
}

/** Anchor to a home-page section (ids are shared by both languages), e.g. /en/#casos. */
export const section = (lang: Lang, id: string) => href(lang, { name: 'home' }, `#${id}`);
