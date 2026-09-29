/**
 * Content integrity: every Spanish entry has its English text, and every
 * internal link in the hand-written data points somewhere that exists.
 */
import { describe, expect, test } from 'vitest';
import { getCollection } from 'astro:content';
import { experienceFilters, freelanceExperience, freelanceGroups, milestones, type More } from '../src/data/career';
import { nav } from '../src/data/profile';
import { caseSlugs } from '../src/i18n';
import { sectorsEn } from '../src/i18n/ui';

const [projects, projectsEn, companies, companiesEn] = await Promise.all([
  getCollection('proyectos'),
  getCollection('proyectosEn'),
  getCollection('empresas'),
  getCollection('empresasEn'),
]);
const cases = projects.filter((p) => p.data.featured);
const ids = (list: { id: string }[]) => list.map((e) => e.id).sort();

describe('English translations', () => {
  test('every project has one, and there are no orphans', () => {
    expect(ids(projectsEn)).toEqual(ids(projects));
  });

  test('every case study has its full story translated', () => {
    for (const c of cases) {
      const en = projectsEn.find((p) => p.id === c.id)!;
      expect(en.body?.trim().length, c.id).toBeGreaterThan(0);
    }
  });

  test('metrics are translated only where the Spanish entry has one', () => {
    for (const en of projectsEn) {
      const es = projects.find((p) => p.id === en.id)!;
      if (en.data.metric) expect(es.data.metric, en.id).toBeDefined();
    }
  });

  test('link notes refer to links that exist', () => {
    for (const en of projectsEn) {
      const names = projects.find((p) => p.id === en.id)!.data.links?.map((l) => l.name) ?? [];
      for (const name of Object.keys(en.data.linkNotes ?? {})) expect(names, en.id).toContain(name);
    }
  });

  test('every company has one, with the same phases in the same order', () => {
    expect(ids(companiesEn)).toEqual(ids(companies));
    for (const en of companiesEn) {
      const es = companies.find((c) => c.id === en.id)!;
      expect(en.data.phases.map((p) => p.id), en.id).toEqual(es.data.phases.map((p) => p.id));
      expect(en.data.highlights.length, en.id).toBe(es.data.highlights.length);
    }
  });

  test('every sector has an English name', () => {
    const sectors = new Set(projects.map((p) => p.data.sector));
    for (const sector of sectors) expect(sectorsEn, sector).toHaveProperty(sector);
  });
});

describe('case study slugs', () => {
  test('every case has an English slug, and only cases do', () => {
    expect(Object.keys(caseSlugs).sort()).toEqual(ids(cases));
  });

  test('English slugs are unique and URL-safe', () => {
    const slugs = Object.values(caseSlugs);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});

describe('hand-written links in src/data', () => {
  const companyIds = companies.map((c) => c.id);
  const caseIds = cases.map((c) => c.id);

  const checkMore = (more: More) => {
    const { route, suffix } = more;
    if (route.name === 'case') expect(caseIds).toContain(route.id);
    if (route.name === 'experience') {
      expect(companyIds).toContain(route.id);
      // A #hash must be one of that company's phases.
      if (suffix?.startsWith('#')) {
        const company = companies.find((c) => c.id === route.id)!;
        expect(company.data.phases.map((p) => p.id)).toContain(suffix.slice(1));
      }
    }
    if (suffix?.startsWith('?tipo=')) expect(['Empleo', 'Freelance', 'Casos']).toContain(suffix.slice(6));
  };

  test('timeline milestones', () => milestones.forEach((m) => checkMore(m.more)));
  test('freelance blocks', () => freelanceGroups.forEach((g) => checkMore(g.more)));
  test('freelance experience', () => checkMore(freelanceExperience.more));

  test('every freelance block has projects', () => {
    for (const g of freelanceGroups) {
      expect(projects.some((p) => p.data.group === g.id), g.id).toBe(true);
    }
  });

  test('only one milestone is current, and it is the latest', () => {
    const current = milestones.filter((m) => m.current);
    expect(current).toHaveLength(1);
    expect(current[0].year).toBe(Math.max(...milestones.map((m) => m.year)));
  });

  test('home page sections in the menu are unique', () => {
    const navIds = nav.map((n) => n.id);
    expect(new Set(navIds).size).toBe(navIds.length);
  });
});

describe('experience filters', () => {
  const keys = experienceFilters.map((f) => f.key);

  test('every filter used in the data has a chip', () => {
    const used = new Set([...companies.flatMap((c) => c.data.filters), ...freelanceExperience.filters]);
    for (const f of used) expect(keys, f).toContain(f);
  });

  test('every chip except «Todo» matches something', () => {
    const used = new Set([...companies.flatMap((c) => c.data.filters), ...freelanceExperience.filters]);
    for (const key of keys.filter((k) => k !== 'Todo')) expect(used.has(key), key).toBe(true);
  });
});
