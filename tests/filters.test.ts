import { describe, expect, test } from 'vitest';
import { formatCount, matchesArchive, matchesQuery, matchesTag, normalize, readPlural, wrapIndex } from '../src/lib/filters';

describe('normalize', () => {
  test('lowercases and strips accents', () => {
    expect(normalize('Logística ÉXITO Ñandú')).toBe('logistica exito nandu');
  });
});

describe('formatCount', () => {
  const results = { one: '{count} resultado', other: '{count} resultados' };

  test('uses the singular for exactly one', () => {
    expect(formatCount(results, 1)).toBe('1 resultado');
  });
  test('uses the plural for zero and many', () => {
    expect(formatCount(results, 0)).toBe('0 resultados');
    expect(formatCount(results, 12)).toBe('12 resultados');
  });
});

describe('readPlural', () => {
  test('reads the templates sent in a data attribute', () => {
    expect(readPlural('{"one":"{count} result","other":"{count} results"}')).toEqual({
      one: '{count} result',
      other: '{count} results',
    });
  });
  test('falls back to the bare number when the attribute is missing or broken', () => {
    const bareNumber = { one: '{count}', other: '{count}' };
    expect(readPlural(undefined)).toEqual(bareNumber);
    expect(readPlural('not json')).toEqual(bareNumber);
    expect(readPlural('{"one":1}')).toEqual(bareNumber);
  });
});

describe('matchesTag', () => {
  test('«Todo» matches everything, even items without tags', () => {
    expect(matchesTag([], 'Todo')).toBe(true);
  });
  test('other filters need the exact tag', () => {
    expect(matchesTag(['Fintech', 'Frontend'], 'Fintech')).toBe(true);
    expect(matchesTag(['Fintech'], 'Backend + IA')).toBe(false);
  });
});

describe('matchesArchive', () => {
  // Rows carry their search text already normalized (see searchText in lib/projects).
  const row = { kind: 'Freelance', isCase: true, sector: 'Automotriz', search: 'mr. goma tires next.js stripe' };
  const noFilters = { kind: 'Todo', sector: '', text: '' };

  test('matches with no filters', () => {
    expect(matchesArchive(row, noFilters)).toBe(true);
  });
  test('filters by type', () => {
    expect(matchesArchive(row, { ...noFilters, kind: 'Freelance' })).toBe(true);
    expect(matchesArchive(row, { ...noFilters, kind: 'Empleo' })).toBe(false);
  });
  test('«Casos» matches case studies of any type', () => {
    expect(matchesArchive(row, { ...noFilters, kind: 'Casos' })).toBe(true);
    expect(matchesArchive({ ...row, isCase: false }, { ...noFilters, kind: 'Casos' })).toBe(false);
  });
  test('filters by sector', () => {
    expect(matchesArchive(row, { ...noFilters, sector: 'Automotriz' })).toBe(true);
    expect(matchesArchive(row, { ...noFilters, sector: 'Banca' })).toBe(false);
  });
  test('searches text ignoring case, accents and surrounding spaces', () => {
    expect(matchesArchive(row, { ...noFilters, text: '  STRÍPE ' })).toBe(true);
    expect(matchesArchive(row, { ...noFilters, text: 'wordpress' })).toBe(false);
  });
  test('all conditions must hold at once', () => {
    expect(matchesArchive(row, { kind: 'Freelance', sector: 'Automotriz', text: 'drupal' })).toBe(false);
  });
});

describe('matchesQuery', () => {
  test('an empty query matches everything', () => {
    expect(matchesQuery('Casos de estudio', '  ')).toBe(true);
  });
  test('matches part of the label ignoring accents', () => {
    expect(matchesQuery('Formación · Secciones', 'formacion')).toBe(true);
    expect(matchesQuery('Formación · Secciones', 'archivo')).toBe(false);
  });
});

describe('wrapIndex', () => {
  test('wraps past both ends', () => {
    expect(wrapIndex(5, 5)).toBe(0);
    expect(wrapIndex(-1, 5)).toBe(4);
    expect(wrapIndex(2, 5)).toBe(2);
  });
  test('returns 0 for an empty list', () => {
    expect(wrapIndex(-1, 0)).toBe(0);
  });
});
