import type { Lang } from '../i18n';

/**
 * hreflang links for a page: itself, its translation, and Spanish as the
 * default for any other language. `alternate` is the translation's path.
 */
export function alternateLinks(site: URL, pathname: string, lang: Lang, alternate: string) {
  const current = new URL(pathname, site).href;
  const translation = new URL(alternate, site).href;
  const spanish = lang === 'es' ? current : translation;
  const english = lang === 'en' ? current : translation;
  return [
    { hreflang: 'es', href: spanish },
    { hreflang: 'en', href: english },
    { hreflang: 'x-default', href: spanish },
  ];
}

/** «Page · Name», or «Name · Role» for the home page. */
export const pageTitle = (title: string | undefined, name: string, role: string) =>
  title ? `${title} · ${name}` : `${name} · ${role}`;
