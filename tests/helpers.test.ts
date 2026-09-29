import { describe, expect, test } from 'vitest';
import { centerScrollLeft, pointerOffset, yearToPercent } from '../src/lib/geometry';
import { displayUrl } from '../src/lib/format';
import { navLinks } from '../src/lib/nav';
import { alternateLinks, pageTitle } from '../src/lib/seo';
import { buildPaletteItems, searchText } from '../src/lib/palette';
import { profile } from '../src/data/profile';

describe('yearToPercent', () => {
  const range = { from: 2011, to: 2026 };
  test('maps the range ends to 0% and 100%', () => {
    expect(yearToPercent(2011, range)).toBe('0.00%');
    expect(yearToPercent(2026, range)).toBe('100.00%');
  });
  test('places years in between proportionally', () => {
    expect(yearToPercent(2021, range)).toBe('66.67%');
  });
});

describe('pointerOffset', () => {
  const panel = { left: 100, width: 600 };
  test('aims at the centre of the trigger, relative to the panel', () => {
    expect(pointerOffset({ left: 300, width: 40 }, panel)).toBe(220);
  });
  test('stays clear of the panel corners', () => {
    expect(pointerOffset({ left: 90, width: 10 }, panel)).toBe(24);
    expect(pointerOffset({ left: 690, width: 40 }, panel)).toBe(576);
  });
});

describe('centerScrollLeft', () => {
  const list = { left: 0, width: 300 };
  test('centres the link in the list', () => {
    expect(centerScrollLeft(0, list, { left: 400, width: 100 })).toBe(300);
  });
  test('accounts for the current scroll', () => {
    expect(centerScrollLeft(50, list, { left: 400, width: 100 })).toBe(350);
  });
  test('never scrolls before the start', () => {
    expect(centerScrollLeft(0, list, { left: 20, width: 60 })).toBe(0);
  });
});

test('displayUrl drops the protocol, «www.» and the trailing slash', () => {
  expect(displayUrl('https://www.linkedin.com/in/alejandro-palacios88/')).toBe('linkedin.com/in/alejandro-palacios88');
  expect(displayUrl('http://github.com/Alpacorp')).toBe('github.com/Alpacorp');
});

describe('navLinks', () => {
  test('on the home page, sections are plain anchors', () => {
    const links = navLinks('es', '/', true);
    expect(links.find((link) => link.section === 'casos')?.href).toBe('#casos');
  });
  test('elsewhere, sections point back to the home page in the same language', () => {
    const links = navLinks('en', '/en/cv/', false);
    expect(links.find((link) => link.section === 'casos')?.href).toBe('/en/#casos');
  });
  test('the archive is a page, marked current while viewing it', () => {
    const archive = navLinks('en', '/en/archive/', false).find((link) => link.href === '/en/archive/')!;
    expect(archive.section).toBeUndefined();
    expect(archive.current).toBe(true);
    expect(navLinks('en', '/en/', true).some((link) => link.current)).toBe(false);
  });
  test('labels follow the language', () => {
    expect(navLinks('es', '/', true)[0].label).toBe('Sobre mí');
    expect(navLinks('en', '/en/', true)[0].label).toBe('About');
  });
});

describe('alternateLinks', () => {
  const site = new URL('https://alpacorp.net');
  test('from a Spanish page', () => {
    expect(alternateLinks(site, '/casos/novenas-digitales/', 'es', '/en/cases/white-label-novenas/')).toEqual([
      { hreflang: 'es', href: 'https://alpacorp.net/casos/novenas-digitales/' },
      { hreflang: 'en', href: 'https://alpacorp.net/en/cases/white-label-novenas/' },
      { hreflang: 'x-default', href: 'https://alpacorp.net/casos/novenas-digitales/' },
    ]);
  });
  test('from an English page, Spanish stays the default', () => {
    expect(alternateLinks(site, '/en/cv/', 'en', '/cv/')).toEqual([
      { hreflang: 'es', href: 'https://alpacorp.net/cv/' },
      { hreflang: 'en', href: 'https://alpacorp.net/en/cv/' },
      { hreflang: 'x-default', href: 'https://alpacorp.net/cv/' },
    ]);
  });
});

test('pageTitle', () => {
  expect(pageTitle('CV', 'Alejandro', 'Software Engineer')).toBe('CV · Alejandro');
  expect(pageTitle(undefined, 'Alejandro', 'Software Engineer')).toBe('Alejandro · Software Engineer');
});

describe('buildPaletteItems', () => {
  const items = buildPaletteItems({
    lang: 'en',
    cases: [{ id: 'novenas-digitales', data: { title: 'One novena', client: 'White-label product' } }],
    companies: [{ id: 'servientrega', data: { company: 'Servientrega', role: 'Webmaster' } }],
    alternate: '/casos/',
  });

  test('links cases and companies in the page language', () => {
    expect(items.find((item) => item.label === 'One novena')?.href).toBe('/en/cases/white-label-novenas/');
    expect(items.find((item) => item.label === 'Servientrega')?.href).toBe('/en/experience/servientrega/');
  });
  test('the language switch goes to the translated page and hides its keywords', () => {
    const languageSwitch = items.find((item) => item.href === '/casos/')!;
    expect(languageSwitch.hint).toBe('Español');
    expect(languageSwitch.keywords).toContain('spanish');
    expect(searchText(languageSwitch)).toContain('spanish');
  });
  test('actions carry the email', () => {
    const copy = items.find((item) => item.action === 'copy-email')!;
    expect(copy.hint).toBe(profile.email);
    expect(items.find((item) => item.href === `mailto:${profile.email}`)).toBeDefined();
  });
});
