/**
 * Pure helpers shared by the client-side filters (archive, experience, ⌘K).
 * They live here, outside the components' <script> tags, so they can be unit tested.
 */

/** Lowercases and strips accents, so «logistica» finds «Logística». */
export const normalize = (text: string) =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

/** Fills the `{n}` placeholder of a UI string rendered on the server, e.g. «{n} results». */
export const fill = (template: string, n: number) => template.replace('{n}', String(n));

/** Placeholder passed to the UI string functions to get a template for client scripts. */
export const N = '{n}';

/** Experience list: «Todo» shows everything, any other filter matches one of the item's tags. */
export const matchesTag = (tags: string[], filter: string) => filter === 'Todo' || tags.includes(filter);

export type ArchiveRow = { kind: string; isCase: boolean; sector: string; search: string };
export type ArchiveQuery = { kind: string; sector: string; text: string };

/** Archive table: a row is shown when it matches the type chip, the sector and the search text. */
export function matchesArchive(row: ArchiveRow, query: ArchiveQuery) {
  const byKind = query.kind === 'Todo' || (query.kind === 'Casos' ? row.isCase : row.kind === query.kind);
  const bySector = !query.sector || row.sector === query.sector;
  const text = normalize(query.text.trim());
  const byText = !text || normalize(row.search).includes(text);
  return byKind && bySector && byText;
}

/** ⌘K palette: an option matches when its searchable label contains the query. */
export const matchesQuery = (label: string, query: string) => {
  const q = normalize(query.trim());
  return q === '' || normalize(label).includes(q);
};

/** Index of the next option when moving with the arrow keys, wrapping around both ends. */
export const wrapIndex = (index: number, length: number) => (length ? (index + length) % length : 0);
