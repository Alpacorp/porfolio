import { describe, expect, test } from 'vitest';
import { caseSlug, href, langFromPath, langs, otherLang, section } from '../src/i18n';
import { getI18n, sectorName, useT } from '../src/i18n/ui';

describe('langFromPath', () => {
  test.each([
    ['/', 'es'],
    ['/casos/cdt-digital/', 'es'],
    ['/en', 'en'],
    ['/en/', 'en'],
    ['/en/cases/', 'en'],
    // A Spanish path that merely starts with «en» is not English.
    ['/entregas/', 'es'],
  ])('%s → %s', (pathname, expected) => {
    expect(langFromPath(pathname)).toBe(expected);
  });
});

test('otherLang swaps the two languages', () => {
  expect(otherLang('es')).toBe('en');
  expect(otherLang('en')).toBe('es');
});

describe('href', () => {
  test('Spanish routes live at the root', () => {
    expect(href('es', { name: 'home' })).toBe('/');
    expect(href('es', { name: 'cases' })).toBe('/casos/');
    expect(href('es', { name: 'archive' })).toBe('/archivo/');
    expect(href('es', { name: 'cv' })).toBe('/cv/');
    expect(href('es', { name: 'case', id: 'plataforma-refunds' })).toBe('/casos/plataforma-refunds/');
    expect(href('es', { name: 'experience', id: 'servientrega' })).toBe('/experiencia/servientrega/');
  });

  test('English routes live under /en/ with English segments and slugs', () => {
    expect(href('en', { name: 'home' })).toBe('/en/');
    expect(href('en', { name: 'cases' })).toBe('/en/cases/');
    expect(href('en', { name: 'archive' })).toBe('/en/archive/');
    expect(href('en', { name: 'cv' })).toBe('/en/cv/');
    expect(href('en', { name: 'case', id: 'plataforma-refunds' })).toBe('/en/cases/refunds-platform/');
    expect(href('en', { name: 'experience', id: 'servientrega' })).toBe('/en/experience/servientrega/');
  });

  test('appends a hash or query suffix', () => {
    expect(href('en', { name: 'archive' }, '?tipo=Freelance')).toBe('/en/archive/?tipo=Freelance');
    expect(href('es', { name: 'experience', id: 'servientrega' }, '#webmaster')).toBe(
      '/experiencia/servientrega/#webmaster',
    );
  });
});

describe('caseSlug', () => {
  test('Spanish slugs are the entry id', () => {
    expect(caseSlug('novenas-digitales', 'es')).toBe('novenas-digitales');
  });
  test('English slugs come from the map, falling back to the id', () => {
    expect(caseSlug('novenas-digitales', 'en')).toBe('white-label-novenas');
    expect(caseSlug('not-a-case', 'en')).toBe('not-a-case');
  });
});

test('section links point to a home page anchor', () => {
  expect(section('es', 'casos')).toBe('/#casos');
  expect(section('en', 'casos')).toBe('/en/#casos');
});

describe('UI dictionaries', () => {
  test('both languages define the same keys', () => {
    expect(Object.keys(useT('en')).sort()).toEqual(Object.keys(useT('es')).sort());
  });

  test('no string is left empty', () => {
    for (const lang of langs) {
      for (const [key, value] of Object.entries(useT(lang))) {
        if (typeof value === 'string') expect(value, `${lang}.${key}`).not.toBe('');
      }
    }
  });

  test('plural templates carry the count placeholder', () => {
    for (const lang of langs) {
      expect(useT(lang).results.one).toContain('{count}');
      expect(useT(lang).results.other).toContain('{count}');
    }
  });

  test('interpolated strings', () => {
    expect(useT('es').countOf(35)).toEqual({ one: '{count} de 35 proyectos', other: '{count} de 35 proyectos' });
    expect(useT('en').results).toEqual({ one: '{count} result', other: '{count} results' });
    expect(useT('en').roleAt('Software Engineer', 'Mercado Pago')).toBe('Software Engineer at Mercado Pago');
    expect(useT('es').via('BBDO México')).toBe('vía BBDO México');
  });
});

describe('getI18n', () => {
  test('reads the language from the URL and pairs it with its dictionary', () => {
    const english = getI18n(new URL('https://alpacorp.net/en/cases/'));
    expect(english.lang).toBe('en');
    expect(english.otherLang).toBe('es');
    expect(english.ui).toBe(useT('en'));
    expect(getI18n(new URL('https://alpacorp.net/casos/')).lang).toBe('es');
  });
});

describe('sectorName', () => {
  test('keeps the Spanish name in Spanish', () => {
    expect(sectorName('Logística', 'es')).toBe('Logística');
  });
  test('translates to English', () => {
    expect(sectorName('Logística', 'en')).toBe('Logistics');
    expect(sectorName('ONG', 'en')).toBe('Nonprofit');
  });
  test('falls back to the original for unknown sectors', () => {
    expect(sectorName('Aeroespacial', 'en')).toBe('Aeroespacial');
  });
});
