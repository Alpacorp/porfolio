import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync } from 'node:fs';

/**
 * Vitest runs Astro in dev mode, which reads content from `.astro/data-store.json`,
 * while `astro sync` writes the production store under `node_modules/.astro/`.
 * Sync once before the run and hand the fresh store to the tests, so they never
 * see content older than the files on disk.
 */
export default function setup() {
  execFileSync('npx', ['astro', 'sync'], { stdio: 'ignore' });
  mkdirSync('.astro', { recursive: true });
  copyFileSync('node_modules/.astro/data-store.json', '.astro/data-store.json');
}
