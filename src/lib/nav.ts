import { nav } from '../data/profile';
import { href, section, type Lang } from '../i18n';

export type NavLink = {
  label: string;
  href: string;
  /** Home page section this link scrolls to (highlighted while on screen). */
  section?: string;
  /** The link's page is the one being viewed. */
  current: boolean;
};

/** Menu links for the sidebar and the mobile bar. On the home page, sections are plain anchors. */
export function navLinks(lang: Lang, pathname: string, onHome: boolean): NavLink[] {
  return nav.map((item) => {
    const page = item.page && href(lang, { name: item.page });
    if (page) return { label: item.label[lang], href: page, current: pathname.startsWith(page) };
    return {
      label: item.label[lang],
      href: onHome ? `#${item.id}` : section(lang, item.id),
      section: item.id,
      current: false,
    };
  });
}
