# alpacorp.net

Alejandro Palacios's portfolio. Astro 7, MDX and hand-written CSS, no UI frameworks. Spanish at `/`, English at `/en/`.

## Commands

| Command               | What it does                                                                        |
| --------------------- | ----------------------------------------------------------------------------------- |
| `npm install`         | Installs dependencies                                                               |
| `npm run dev`         | Local server at `localhost:4321`                                                    |
| `npm run dev:fresh`   | Dev server with a clean content cache — use it after switching branches or pulling  |
| `npm run check`       | Type-checks the code and validates the content schema                               |
| `npm test`            | Unit and content-integrity tests (Vitest)                                           |
| `npm run test:watch`  | Tests in watch mode                                                                 |
| `npm run build`       | Check, tests, then the static site in `dist/`                                       |
| `npm run preview`     | Serves `dist/` to review it before pushing                                          |

## Where things live

```
src/
├── content/proyectos/    One file per project (source for case studies, archive and timeline)
├── content/empresas/     One file per employer: summary, highlights and phases
├── content/en/           English text for the entries above, matched by id
├── content.config.ts     Content schemas
├── data/profile.ts       Name, tagline, stats, «three languages», menu
├── data/career.ts        Milestones, freelance blocks, freelance experience, education, skills
├── data/logos.ts         Logo registry
├── i18n/index.ts         Languages and localized routes (href, case slugs)
├── i18n/ui.ts            Interface strings in both languages, getI18n(url)
├── lib/                  Pure logic, unit tested: projects, experience, filters, nav, seo…
├── components/           Sidebar, ⌘K palette, archive table, home page sections
├── layouts/              Base (head, theme, SEO) and Shell (two columns)
├── views/                Page bodies, shared by both languages
├── pages/                Thin routes: Spanish at the root, English under pages/en/
└── styles/global.css     «Paper and highlighter» design tokens and utilities
tests/                    Vitest suites (run against the real content)
```

## Adding a project

Create `src/content/proyectos/<id>.md`:

```yaml
---
title: What was done, in a few words
client: Client name
via: BBDO México          # optional: agency or intermediary
year: 2025                # null if unknown
yearEnd: hoy              # optional: a year or «hoy»
sector: Fintech
kind: freelance           # empleo | freelance
group: empresas           # optional: goma | bbdo | empresas | novenas (timeline freelance block)
stack: [Astro, TypeScript]
url: https://…            # optional
status: live              # live | internal | replaced | offline
summary: One or two sentences.
---
```

Then add its English text in `src/content/en/proyectos/<id>.md` (`title`, `summary`, and `client` / `via` only if they read differently in English). The tests fail if a translation is missing, and a new sector needs its English name in `sectorsEn` (`src/i18n/ui.ts`).

The project shows up in the archive and, if it has a `group`, in its timeline block.

**Turning it into a case study:** rename it to `.mdx`, add `featured: true`, `order` and `metric: { value, label }`, and write the story in the body (`## El reto`, `## Qué hice`, `## Resultado`). Its English version is an `.mdx` in `src/content/en/proyectos/` with the translated body, and its English URL slug goes in `caseSlugs` (`src/i18n/index.ts`). Pages are created at `/casos/<id>/` and `/en/cases/<slug>/`.

## Adding or editing a company

Each employer lives in `src/content/empresas/<id>.md` and gets a page at `/experiencia/<id>/` (and `/en/experience/<id>/`):

- `summary` and up to three `highlights` are what the home page shows.
- `phases` tell the full story in order. Each phase can reference its projects by id (`projects: [cdt-digital]`); the build fails if an id doesn't exist.
- A phase `id` is an anchor, so the timeline can link to `/experiencia/<id>/#<phase>`.
- `filters` must be keys of `experienceFilters` in `src/data/career.ts`.

Its English text lives in `src/content/en/empresas/<id>.md`, with the same phase ids.

Freelance work is not a company: it lives in `freelanceExperience` in `src/data/career.ts`.

## Logos

Each logo is two files in `src/assets/logos/`: `<id>.webp` (the color original, revealed on hover in the light theme) and `<id>.mono.webp` (the monochrome mask shown at rest). Register it in `src/data/logos.ts` with its height and, if the original is white, `hoverColor: false` (its color file is then never downloaded). A project uses it with `logo: <id>` in its frontmatter.

## Design

- **Light = paper, dark = ink.** The theme follows the system and can be switched with the button or ⌘K. Colors are declared once in `global.css` with `light-dark()`.
- **Yellow `#FFDD00`** as the highlighter (`.hl`) and on the contact block. **Magenta** only on hover and focus.
- **Geist** for text and **Geist Mono** for data (dates, stack, figures), self-hosted with Fontsource.

## Analytics

[Vercel Web Analytics](https://vercel.com/docs/analytics) (`<Analytics />` in `src/layouts/Base.astro`): page views without cookies, so no consent banner is needed. It only reports from Vercel deployments; see the numbers in the project's Analytics tab.
