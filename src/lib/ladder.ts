/**
 * Career ladder: the roles as steps, newest first. `level` counts up from the
 * oldest step (0), so the newest one sits highest and furthest along.
 */
export function climb<Step extends { year: number }>(steps: Step[]) {
  return [...steps]
    .sort((first, second) => first.year - second.year)
    .map((step, level) => ({ ...step, level }))
    .reverse();
}
