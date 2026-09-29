export type Theme = 'light' | 'dark';

/** Effective theme: the one the visitor picked or, failing that, the system's. */
export function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'light' || chosen === 'dark') return chosen;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** The toggles are «Dark theme» switches: pressed while the dark theme is on. */
export function syncThemeToggles() {
  const dark = String(currentTheme() === 'dark');
  for (const btn of document.querySelectorAll('[data-theme-toggle]')) btn.setAttribute('aria-pressed', dark);
}

export function toggleTheme() {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  syncThemeToggles();
  try {
    localStorage.setItem('theme', next);
  } catch {
    // No storage (private mode): the choice lasts as long as the page.
  }
}
