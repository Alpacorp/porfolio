import { describe, expect, test } from 'vitest';
import { fill, matchesArchive, matchesQuery, matchesTag, N, normalize, wrapIndex } from '../src/lib/filters';

describe('normalize', () => {
  test('lowercases and strips accents', () => {
    expect(normalize('Logística ÉXITO Ñandú')).toBe('logistica exito nandu');
  });
});

describe('fill', () => {
  test('replaces the {n} placeholder', () => {
    expect(fill(`${N} of 35 projects`, 7)).toBe('7 of 35 projects');
  });
  test('leaves strings without a placeholder untouched', () => {
    expect(fill('no placeholder', 3)).toBe('no placeholder');
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
  const row = { kind: 'Freelance', isCase: true, sector: 'Automotriz', search: 'mr. goma tires next.js stripe' };
  const all = { kind: 'Todo', sector: '', text: '' };

  test('matches with no filters', () => {
    expect(matchesArchive(row, all)).toBe(true);
  });
  test('filters by type', () => {
    expect(matchesArchive(row, { ...all, kind: 'Freelance' })).toBe(true);
    expect(matchesArchive(row, { ...all, kind: 'Empleo' })).toBe(false);
  });
  test('«Casos» matches case studies of any type', () => {
    expect(matchesArchive(row, { ...all, kind: 'Casos' })).toBe(true);
    expect(matchesArchive({ ...row, isCase: false }, { ...all, kind: 'Casos' })).toBe(false);
  });
  test('filters by sector', () => {
    expect(matchesArchive(row, { ...all, sector: 'Automotriz' })).toBe(true);
    expect(matchesArchive(row, { ...all, sector: 'Banca' })).toBe(false);
  });
  test('searches text ignoring case, accents and surrounding spaces', () => {
    expect(matchesArchive(row, { ...all, text: '  STRÍPE ' })).toBe(true);
    expect(matchesArchive(row, { ...all, text: 'wordpress' })).toBe(false);
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
