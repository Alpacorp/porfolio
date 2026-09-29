import { describe, expect, test } from 'vitest';
import { getEntry } from 'astro:content';
import { companyHref, getCompanies, getExperienceItems } from '../src/lib/experience';

describe('getCompanies', () => {
  test('current job first, then most recent first', async () => {
    const companies = await getCompanies('es');
    expect(companies[0].data.current).toBe(true);
    const past = companies.filter((c) => !c.data.current).map((c) => c.data.startYear);
    expect(past).toEqual([...past].sort((a, b) => b - a));
  });

  test('English overlays the text and keeps dates, stack and project references', async () => {
    const [es, en] = await Promise.all([getCompanies('es'), getCompanies('en')]);
    const source = (await getEntry('empresasEn', 'servientrega'))!;
    const a = es.find((c) => c.id === 'servientrega')!;
    const b = en.find((c) => c.id === 'servientrega')!;
    expect(b.data.summary).toBe(source.data.summary);
    expect(b.data.stack).toEqual(a.data.stack);
    expect(b.data.startYear).toBe(a.data.startYear);
    expect(b.data.phases.map((p) => p.id)).toEqual(a.data.phases.map((p) => p.id));
    expect(b.data.phases.map((p) => p.projects)).toEqual(a.data.phases.map((p) => p.projects));
    expect(b.data.phases[0].title).toBe(source.data.phases[0].title);
  });
});

test('companyHref is localized', async () => {
  const [company] = await getCompanies('es');
  expect(companyHref(company, 'es')).toBe(`/experiencia/${company.id}/`);
  expect(companyHref(company, 'en')).toBe(`/en/experience/${company.id}/`);
});

describe('getExperienceItems', () => {
  test('lists every company plus the freelance work', async () => {
    const [companies, items] = await Promise.all([getCompanies('es'), getExperienceItems('es')]);
    expect(items.map((i) => i.id).sort()).toEqual([...companies.map((c) => c.id), 'freelance'].sort());
  });

  test('current work comes first', async () => {
    const items = await getExperienceItems('es');
    const firstPast = items.findIndex((i) => !i.current);
    expect(items.slice(firstPast).every((i) => !i.current)).toBe(true);
  });

  test('freelance links to the filtered archive in each language', async () => {
    const es = (await getExperienceItems('es')).find((i) => i.id === 'freelance')!;
    const en = (await getExperienceItems('en')).find((i) => i.id === 'freelance')!;
    expect(es.href).toBe('/archivo/?tipo=Freelance');
    expect(en.href).toBe('/en/archive/?tipo=Freelance');
    expect(en.dates).toBe('2019 — present');
  });
});
