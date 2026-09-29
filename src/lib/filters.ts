/**
 * Pure helpers shared by the client-side filters (archive, experience, ⌘K).
 * They live here, outside the components' <script> tags, so they can be unit tested.
 */

/** Lowercases and strips accents, so «logistica» finds «Logística». */
export const normalize = (text: string) =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

/** Picks singular or plural and fills in the count: «1 result», «3 results». */
export function formatCount(templates: { one: string; other: string }, count: number) {
  return (count === 1 ? templates.one : templates.other).replace('{count}', String(count));
}

/**
 * Plural templates travel to client scripts as a JSON data-* attribute; this
 * reads them back, tolerating a missing attribute.
 */
export function readPlural(json: string | undefined) {
  try {
    const parsed = JSON.parse(json ?? '');
    if (typeof parsed?.one === 'string' && typeof parsed?.other === 'string') return parsed as { one: string; other: string };
  } catch {
    // Fall through to the bare number.
  }
  return { one: '{count}', other: '{count}' };
}

/** Experience list: «Todo» shows everything, any other filter matches one of the item's tags. */
export const matchesTag = (tags: string[], filter: string) => filter === 'Todo' || tags.includes(filter);

/** `search` is already normalized at build time (see searchText in lib/projects). */
export type ArchiveRow = { kind: string; isCase: boolean; sector: string; search: string };
export type ArchiveQuery = { kind: string; sector: string; text: string };

/** Archive table: a row is shown when it matches the type chip, the sector and the search text. */
export function matchesArchive(row: ArchiveRow, query: ArchiveQuery) {
  const byKind = query.kind === 'Todo' || (query.kind === 'Casos' ? row.isCase : row.kind === query.kind);
  const bySector = !query.sector || row.sector === query.sector;
  const text = normalize(query.text.trim());
  const byText = !text || row.search.includes(text);
  return byKind && bySector && byText;
}

/** ⌘K palette: an option matches when its searchable label contains the query. */
export const matchesQuery = (label: string, query: string) => {
  const text = normalize(query.trim());
  return text === '' || normalize(label).includes(text);
};

/** Index of the next option when moving with the arrow keys, wrapping around both ends. */
export const wrapIndex = (index: number, length: number) => (length ? (index + length) % length : 0);
