import { describe, expect, test } from 'vitest';
import { getCollection, getEntry } from 'astro:content';
import { formatYears, getCases, getProjects, groupItems, localize, projectHref, statusLabel, type Project } from '../src/lib/projects';

/** Minimal project for pure-function tests; only the fields they read. */
const project = (data: Partial<Project['data']>, id = 'demo') =>
  ({
    id,
    data: {
      title: 'Demo',
      client: 'Cliente',
      year: 2024,
      sector: 'Fintech',
      kind: 'freelance',
      stack: ['Astro', 'TypeScript', 'CSS'],
      status: 'live',
      summary: 'Resumen',
      featured: false,
      order: 99,
      ...data,
    },
  }) as Project;

describe('formatYears', () => {
  test('a single year', () => {
    expect(formatYears(project({ year: 2024 }).data, 'es')).toBe('2024');
    expect(formatYears(project({ year: 2024, yearEnd: 2024 }).data, 'es')).toBe('2024');
  });
  test('a range', () => {
    expect(formatYears(project({ year: 2019, yearEnd: 2021 }).data, 'es')).toBe('2019 — 2021');
  });
  test('an open range says «present» in each language', () => {
    expect(formatYears(project({ year: 2024, yearEnd: 'hoy' }).data, 'es')).toBe('2024 — hoy');
    expect(formatYears(project({ year: 2024, yearEnd: 'hoy' }).data, 'en')).toBe('2024 — present');
  });
  test('an unknown year', () => {
    expect(formatYears(project({ year: null }).data, 'es')).toBe('—');
    expect(formatYears(project({ year: null, yearEnd: 'hoy' }).data, 'en')).toBe('present');
  });
});

describe('projectHref', () => {
  test('case studies link to their page in each language', () => {
    const p = project({ featured: true }, 'plataforma-refunds');
    expect(projectHref(p, 'es')).toEqual({ href: '/casos/plataforma-refunds/', external: false });
    expect(projectHref(p, 'en')).toEqual({ href: '/en/cases/refunds-platform/', external: false });
  });
  test('live projects link to their site', () => {
    expect(projectHref(project({ url: 'https://example.com' }), 'es')).toEqual({
      href: 'https://example.com',
      external: true,
    });
  });
  test('replaced or offline projects are not linked, even with a URL', () => {
    expect(projectHref(project({ url: 'https://example.com', status: 'replaced' }), 'es')).toBeNull();
    expect(projectHref(project({ url: 'https://example.com', status: 'offline' }), 'es')).toBeNull();
  });
  test('projects without a URL are not linked', () => {
    expect(projectHref(project({}), 'es')).toBeNull();
  });
});

test('statusLabel is localized', () => {
  expect(statusLabel('internal', 'es')).toBe('Herramienta interna');
  expect(statusLabel('internal', 'en')).toBe('Internal tool');
});

describe('groupItems', () => {
  test('uses the project links when it has them, with their notes', () => {
    const p = project({
      group: 'novenas',
      links: [{ name: 'Marca', url: 'https://a.example', note: 'Nota' }, { name: 'Otra', url: 'https://b.example' }],
    });
    expect(groupItems([p], 'novenas', 'es')).toEqual([
      { name: 'Marca', url: 'https://a.example', note: 'Nota', logo: undefined },
      { name: 'Otra', url: 'https://b.example', note: '', logo: undefined },
    ]);
  });
  test('otherwise builds one row from the client, title and first two technologies', () => {
    const p = project({ group: 'empresas', client: 'ACME', title: 'Sitio', url: 'https://acme.example' });
    expect(groupItems([p], 'empresas', 'es')).toEqual([
      { name: 'ACME', logo: undefined, url: 'https://acme.example', note: 'Sitio · Astro, TypeScript' },
    ]);
  });
  test('replaced projects are not linked and say so', () => {
    const p = project({ group: 'empresas', url: 'https://old.example', status: 'replaced' });
    const [row] = groupItems([p], 'empresas', 'en');
    expect(row.url).toBeUndefined();
    expect(row.note).toMatch(/since replaced$/);
  });
  test('ignores projects from other groups', () => {
    expect(groupItems([project({ group: 'bbdo' })], 'empresas', 'es')).toEqual([]);
  });
});

describe('getProjects', () => {
  test('returns every project, newest first, with unknown years last', async () => {
    const projects = await getProjects('es');
    expect(projects).toHaveLength((await getCollection('proyectos')).length);
    const years = projects.map((p) => p.data.year ?? -1);
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  test('case studies come first within the same year', async () => {
    const projects = await getProjects('es');
    for (let i = 1; i < projects.length; i++) {
      const [a, b] = [projects[i - 1].data, projects[i].data];
      if (a.year === b.year) expect(!a.featured && b.featured, `${projects[i].id}`).toBe(false);
    }
  });
});

describe('getCases', () => {
  test('returns only case studies, in their configured order', async () => {
    const cases = await getCases('es');
    expect(cases.length).toBeGreaterThan(0);
    expect(cases.every((c) => c.data.featured)).toBe(true);
    const order = cases.map((c) => c.data.order);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  test('the same cases in both languages', async () => {
    const [es, en] = await Promise.all([getCases('es'), getCases('en')]);
    expect(en.map((c) => c.id)).toEqual(es.map((c) => c.id));
  });
});

describe('localize', () => {
  test('Spanish returns the entry as is', async () => {
    const p = (await getEntry('proyectos', 'cdt-digital'))!;
    expect(await localize(p, 'es')).toBe(p);
  });

  test('English replaces the text and keeps the data', async () => {
    const p = (await getEntry('proyectos', 'cdt-digital'))!;
    const en = (await getEntry('proyectosEn', 'cdt-digital'))!;
    const l = await localize(p, 'en');
    expect(l.data.title).toBe(en.data.title);
    expect(l.data.summary).toBe(en.data.summary);
    expect(l.data.year).toBe(p.data.year);
    expect(l.data.stack).toEqual(p.data.stack);
    expect(l.data.metric?.label).toBe(en.data.metric?.label);
  });

  test('the metric value falls back to Spanish when the translation only sets the label', async () => {
    const p = (await getEntry('proyectos', 'novenas-digitales'))!;
    const l = await localize(p, 'en');
    expect(l.data.metric?.value).toBe(p.data.metric?.value);
    expect(l.data.client).toBe('White-label product');
  });

  test('link notes are translated by link name', async () => {
    const p = (await getEntry('proyectos', 'novenas-digitales'))!;
    const l = await localize(p, 'en');
    expect(l.data.links?.map((x) => x.url)).toEqual(p.data.links?.map((x) => x.url));
    expect(l.data.links?.find((x) => x.name === 'Pizzería Punto DF')?.note).toBe('Restaurant · with menu');
  });
});
