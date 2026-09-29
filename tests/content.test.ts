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
const cases = projects.filter((project) => project.data.featured);
const sortedIds = (entries: { id: string }[]) => entries.map((entry) => entry.id).sort();
const findById = <Entry extends { id: string }>(entries: Entry[], id: string) =>
  entries.find((entry) => entry.id === id)!;

describe('English translations', () => {
  test('every project has one, and there are no orphans', () => {
    expect(sortedIds(projectsEn)).toEqual(sortedIds(projects));
  });

  test('every case study has its full story translated', () => {
    for (const project of cases) {
      expect(findById(projectsEn, project.id).body?.trim().length, project.id).toBeGreaterThan(0);
    }
  });

  test('metrics are translated only where the Spanish entry has one', () => {
    for (const translation of projectsEn) {
      if (translation.data.metric) expect(findById(projects, translation.id).data.metric, translation.id).toBeDefined();
    }
  });

  test('link notes refer to links that exist', () => {
    for (const translation of projectsEn) {
      const linkNames = findById(projects, translation.id).data.links?.map((link) => link.name) ?? [];
      for (const name of Object.keys(translation.data.linkNotes ?? {})) expect(linkNames, translation.id).toContain(name);
    }
  });

  test('every company has one, with the same phases in the same order', () => {
    expect(sortedIds(companiesEn)).toEqual(sortedIds(companies));
    for (const translation of companiesEn) {
      const source = findById(companies, translation.id);
      const phaseIds = (phases: { id: string }[]) => phases.map((phase) => phase.id);
      expect(phaseIds(translation.data.phases), translation.id).toEqual(phaseIds(source.data.phases));
      expect(translation.data.highlights.length, translation.id).toBe(source.data.highlights.length);
    }
  });

  test('every sector has an English name', () => {
    for (const sector of new Set(projects.map((project) => project.data.sector))) {
      expect(sectorsEn, sector).toHaveProperty(sector);
    }
  });
});

describe('case study slugs', () => {
  test('every case has an English slug, and only cases do', () => {
    expect(Object.keys(caseSlugs).sort()).toEqual(sortedIds(cases));
  });

  test('English slugs are unique and URL-safe', () => {
    const slugs = Object.values(caseSlugs);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});

describe('hand-written links in src/data', () => {
  const companyIds = companies.map((company) => company.id);
  const caseIds = cases.map((project) => project.id);

  const expectValidLink = ({ route, suffix }: More) => {
    if (route.name === 'case') expect(caseIds).toContain(route.id);
    if (route.name === 'experience') {
      expect(companyIds).toContain(route.id);
      // A #hash must be one of that company's phases.
      if (suffix?.startsWith('#')) {
        const phaseIds = findById(companies, route.id).data.phases.map((phase) => phase.id);
        expect(phaseIds).toContain(suffix.slice(1));
      }
    }
    if (suffix?.startsWith('?tipo=')) expect(['Empleo', 'Freelance', 'Casos']).toContain(suffix.slice('?tipo='.length));
  };

  test('timeline milestones', () => milestones.forEach((milestone) => expectValidLink(milestone.more)));
  test('freelance blocks', () => freelanceGroups.forEach((group) => expectValidLink(group.more)));
  test('freelance experience', () => expectValidLink(freelanceExperience.more));

  test('every freelance block has projects', () => {
    for (const group of freelanceGroups) {
      expect(projects.some((project) => project.data.group === group.id), group.id).toBe(true);
    }
  });

  test('only one milestone is current, and it is the latest', () => {
    const current = milestones.filter((milestone) => milestone.current);
    expect(current).toHaveLength(1);
    expect(current[0].year).toBe(Math.max(...milestones.map((milestone) => milestone.year)));
  });

  test('home page sections in the menu are unique', () => {
    const sectionIds = nav.map((item) => item.id);
    expect(new Set(sectionIds).size).toBe(sectionIds.length);
  });
});

test('every experience filter chip except «Todo» matches something', () => {
  const usedTags = new Set([...companies.flatMap((company) => company.data.filters), ...freelanceExperience.filters]);
  const chipKeys = experienceFilters.map((filter) => filter.key).filter((key) => key !== 'Todo');
  for (const key of chipKeys) expect(usedTags.has(key), key).toBe(true);
});
