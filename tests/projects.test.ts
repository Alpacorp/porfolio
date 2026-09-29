import { describe, expect, test } from 'vitest';
import { getCollection, getEntry } from 'astro:content';
import {
  caseMeta,
  formatYears,
  getCases,
  getProjects,
  groupItems,
  kindKey,
  localize,
  projectHref,
  searchText,
  sectorOptions,
  statusLabel,
  type Project,
} from '../src/lib/projects';

/** Minimal project for pure-function tests; only the fields they read. */
const makeProject = (data: Partial<Project['data']>, id = 'demo') =>
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

const getProject = async (id: string) => (await getEntry('proyectos', id))!;

describe('formatYears', () => {
  test('a single year', () => {
    expect(formatYears(makeProject({ year: 2024 }).data, 'es')).toBe('2024');
    expect(formatYears(makeProject({ year: 2024, yearEnd: 2024 }).data, 'es')).toBe('2024');
  });
  test('a range', () => {
    expect(formatYears(makeProject({ year: 2019, yearEnd: 2021 }).data, 'es')).toBe('2019 — 2021');
  });
  test('an open range says «present» in each language', () => {
    expect(formatYears(makeProject({ year: 2024, yearEnd: 'hoy' }).data, 'es')).toBe('2024 — hoy');
    expect(formatYears(makeProject({ year: 2024, yearEnd: 'hoy' }).data, 'en')).toBe('2024 — present');
  });
  test('an unknown year', () => {
    expect(formatYears(makeProject({ year: null }).data, 'es')).toBe('—');
    expect(formatYears(makeProject({ year: null, yearEnd: 'hoy' }).data, 'en')).toBe('present');
  });
});

test('caseMeta joins client, translated sector and years', () => {
  const project = makeProject({ client: 'Banco', sector: 'Banca', year: 2023, yearEnd: 2024 });
  expect(caseMeta(project, 'es')).toBe('Banco · Banca · 2023 — 2024');
  expect(caseMeta(project, 'en')).toBe('Banco · Banking · 2023 — 2024');
});

describe('projectHref', () => {
  test('case studies link to their page in each language', () => {
    const project = makeProject({ featured: true }, 'plataforma-refunds');
    expect(projectHref(project, 'es')).toEqual({ href: '/casos/plataforma-refunds/', external: false });
    expect(projectHref(project, 'en')).toEqual({ href: '/en/cases/refunds-platform/', external: false });
  });
  test('live projects link to their site', () => {
    expect(projectHref(makeProject({ url: 'https://example.com' }), 'es')).toEqual({
      href: 'https://example.com',
      external: true,
    });
  });
  test('replaced or offline projects are not linked, even with a URL', () => {
    expect(projectHref(makeProject({ url: 'https://example.com', status: 'replaced' }), 'es')).toBeNull();
    expect(projectHref(makeProject({ url: 'https://example.com', status: 'offline' }), 'es')).toBeNull();
  });
  test('projects without a URL are not linked', () => {
    expect(projectHref(makeProject({}), 'es')).toBeNull();
  });
});

test('statusLabel is localized', () => {
  expect(statusLabel('internal', 'es')).toBe('Herramienta interna');
  expect(statusLabel('internal', 'en')).toBe('Internal tool');
});

test('kindKey maps the data to the archive filter keys', () => {
  expect(kindKey(makeProject({ kind: 'empleo' }))).toBe('Empleo');
  expect(kindKey(makeProject({ kind: 'freelance' }))).toBe('Freelance');
});

describe('searchText', () => {
  test('is normalized and includes title, client, agency, sector and stack', () => {
    const project = makeProject({ title: 'Página', client: 'Ñandú', via: 'BBDO México', sector: 'Logística' });
    const text = searchText(project, 'es');
    expect(text).toBe('pagina nandu bbdo mexico logistica astro typescript css');
  });
  test('uses the sector name of the page language', () => {
    expect(searchText(makeProject({ sector: 'Logística' }), 'en')).toContain('logistics');
  });
});

test('sectorOptions lists each sector once, sorted by its translated name', () => {
  const projects = ['Salud', 'Banca', 'Salud', 'Automotriz'].map((sector) => makeProject({ sector }));
  expect(sectorOptions(projects, 'en')).toEqual([
    { key: 'Automotriz', name: 'Automotive' },
    { key: 'Banca', name: 'Banking' },
    { key: 'Salud', name: 'Health' },
  ]);
});

describe('groupItems', () => {
  test('uses the project links when it has them, with their notes', () => {
    const project = makeProject({
      group: 'novenas',
      links: [
        { name: 'Marca', url: 'https://a.example', note: 'Nota' },
        { name: 'Otra', url: 'https://b.example' },
      ],
    });
    expect(groupItems([project], 'novenas', 'es')).toEqual([
      { name: 'Marca', url: 'https://a.example', note: 'Nota', logo: undefined },
      { name: 'Otra', url: 'https://b.example', note: '', logo: undefined },
    ]);
  });
  test('otherwise builds one row from the client, title and first two technologies', () => {
    const project = makeProject({ group: 'empresas', client: 'ACME', title: 'Sitio', url: 'https://acme.example' });
    expect(groupItems([project], 'empresas', 'es')).toEqual([
      { name: 'ACME', logo: undefined, url: 'https://acme.example', note: 'Sitio · Astro, TypeScript' },
    ]);
  });
  test('replaced projects are not linked and say so', () => {
    const project = makeProject({ group: 'empresas', url: 'https://old.example', status: 'replaced' });
    const [row] = groupItems([project], 'empresas', 'en');
    expect(row.url).toBeUndefined();
    expect(row.note).toMatch(/since replaced$/);
  });
  test('ignores projects from other groups', () => {
    expect(groupItems([makeProject({ group: 'bbdo' })], 'empresas', 'es')).toEqual([]);
  });
});

describe('getProjects', () => {
  test('returns every project, newest first, with unknown years last', async () => {
    const projects = await getProjects('es');
    expect(projects).toHaveLength((await getCollection('proyectos')).length);
    const years = projects.map((project) => project.data.year ?? -1);
    expect(years).toEqual([...years].sort((first, second) => second - first));
  });

  test('case studies come first within the same year', async () => {
    const projects = await getProjects('es');
    projects.slice(1).forEach((project, index) => {
      const previous = projects[index].data;
      if (previous.year === project.data.year) {
        expect(!previous.featured && project.data.featured, project.id).toBe(false);
      }
    });
  });

  test('English titles are sorted in English within the same year', async () => {
    const projects = await getProjects('en');
    projects.slice(1).forEach((project, index) => {
      const previous = projects[index].data;
      if (previous.year === project.data.year && previous.featured === project.data.featured) {
        expect(previous.title.localeCompare(project.data.title, 'en'), project.id).toBeLessThanOrEqual(0);
      }
    });
  });
});

describe('getCases', () => {
  test('returns only case studies, in their configured order', async () => {
    const cases = await getCases('es');
    expect(cases.length).toBeGreaterThan(0);
    expect(cases.every((project) => project.data.featured)).toBe(true);
    const order = cases.map((project) => project.data.order);
    expect(order).toEqual([...order].sort((first, second) => first - second));
  });

  test('the same cases in both languages', async () => {
    const [spanish, english] = await Promise.all([getCases('es'), getCases('en')]);
    expect(english.map((project) => project.id)).toEqual(spanish.map((project) => project.id));
  });
});

describe('localize', () => {
  test('Spanish returns the entry as is', async () => {
    const project = await getProject('cdt-digital');
    expect(await localize(project, 'es')).toBe(project);
  });

  test('English replaces the text and keeps the data', async () => {
    const project = await getProject('cdt-digital');
    const translation = (await getEntry('proyectosEn', 'cdt-digital'))!;
    const localized = await localize(project, 'en');
    expect(localized.data.title).toBe(translation.data.title);
    expect(localized.data.summary).toBe(translation.data.summary);
    expect(localized.data.year).toBe(project.data.year);
    expect(localized.data.stack).toEqual(project.data.stack);
    expect(localized.data.metric?.label).toBe(translation.data.metric?.label);
  });

  test('the metric value falls back to Spanish when the translation only sets the label', async () => {
    const project = await getProject('novenas-digitales');
    const localized = await localize(project, 'en');
    expect(localized.data.metric?.value).toBe(project.data.metric?.value);
    expect(localized.data.client).toBe('White-label product');
  });

  test('agency names read in English', async () => {
    const localized = await localize(await getProject('bayer-afrin'), 'en');
    expect(localized.data.via).toBe('BBDO Mexico');
  });

  test('link notes are translated by link name', async () => {
    const project = await getProject('novenas-digitales');
    const localized = await localize(project, 'en');
    expect(localized.data.links?.map((link) => link.url)).toEqual(project.data.links?.map((link) => link.url));
    const pizzeria = localized.data.links?.find((link) => link.name === 'Pizzería Punto DF');
    expect(pizzeria?.note).toBe('Restaurant · with menu');
  });
});
