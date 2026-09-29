import { describe, expect, test } from 'vitest';
import { getEntry } from 'astro:content';
import { byRecency, companyHref, getCompanies, getExperienceItems, resolvePhases } from '../src/lib/experience';

describe('byRecency', () => {
  test('current work first, then the most recent start', () => {
    const jobs = [
      { current: false, startYear: 2011 },
      { current: true, startYear: 2019 },
      { current: false, startYear: 2022 },
      { current: true, startYear: 2024 },
    ];
    expect([...jobs].sort(byRecency).map((job) => job.startYear)).toEqual([2024, 2019, 2022, 2011]);
  });
});

describe('getCompanies', () => {
  test('current job first, then most recent first', async () => {
    const companies = await getCompanies('es');
    expect(companies[0].data.current).toBe(true);
    const pastStarts = companies.filter((company) => !company.data.current).map((company) => company.data.startYear);
    expect(pastStarts).toEqual([...pastStarts].sort((first, second) => second - first));
  });

  test('English overlays the text and keeps dates, stack and project references', async () => {
    const [spanish, english] = await Promise.all([getCompanies('es'), getCompanies('en')]);
    const translation = (await getEntry('empresasEn', 'servientrega'))!;
    const source = spanish.find((company) => company.id === 'servientrega')!;
    const localized = english.find((company) => company.id === 'servientrega')!;
    expect(localized.data.summary).toBe(translation.data.summary);
    expect(localized.data.stack).toEqual(source.data.stack);
    expect(localized.data.startYear).toBe(source.data.startYear);
    expect(localized.data.phases.map((phase) => phase.id)).toEqual(source.data.phases.map((phase) => phase.id));
    expect(localized.data.phases.map((phase) => phase.projects)).toEqual(
      source.data.phases.map((phase) => phase.projects),
    );
    expect(localized.data.phases[0].title).toBe(translation.data.phases[0].title);
  });
});

test('companyHref is localized', async () => {
  const [company] = await getCompanies('es');
  expect(companyHref(company, 'es')).toBe(`/experiencia/${company.id}/`);
  expect(companyHref(company, 'en')).toBe(`/en/experience/${company.id}/`);
});

describe('resolvePhases', () => {
  test('resolves project references, in order and translated', async () => {
    const [company] = (await getCompanies('en')).filter((entry) => entry.id === 'banco-caja-social');
    const phases = await resolvePhases(company, 'en');
    phases.forEach((phase, index) => {
      expect(phase.projects.map((project) => project.id)).toEqual(
        company.data.phases[index].projects.map((reference) => reference.id),
      );
    });
    const cdt = phases.flatMap((phase) => phase.projects).find((project) => project.id === 'cdt-digital')!;
    expect(cdt.data.title).toBe((await getEntry('proyectosEn', 'cdt-digital'))!.data.title);
  });
});

describe('getExperienceItems', () => {
  test('lists every company plus the freelance work', async () => {
    const [companies, items] = await Promise.all([getCompanies('es'), getExperienceItems('es')]);
    const companyIds = companies.map((company) => company.id);
    expect(items.map((item) => item.id).sort()).toEqual([...companyIds, 'freelance'].sort());
  });

  test('current work comes first', async () => {
    const items = await getExperienceItems('es');
    const firstPast = items.findIndex((item) => !item.current);
    expect(items.slice(firstPast).every((item) => !item.current)).toBe(true);
  });

  test('freelance links to the filtered archive in each language', async () => {
    const spanish = (await getExperienceItems('es')).find((item) => item.id === 'freelance')!;
    const english = (await getExperienceItems('en')).find((item) => item.id === 'freelance')!;
    expect(spanish.href).toBe('/archivo/?tipo=Freelance');
    expect(english.href).toBe('/en/archive/?tipo=Freelance');
    expect(english.dates).toBe('2019 — present');
    expect(english.hrefLabel).toBe('See freelance projects');
  });
});
