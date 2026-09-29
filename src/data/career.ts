import type { LogoId } from './logos';
import type { L, Route } from '../i18n';

/**
 * A «read more» link: a route (resolved per language) plus an optional #hash or
 * ?query. Without a label, it reads «See the full story» (ui.fullExperience).
 */
export type More = { route: Route; suffix?: string; label?: L };

/**
 * Timeline milestones («Empleo» lane). Kept short on purpose: each one links to
 * the company page, where the full story lives.
 */
export const milestones: {
  year: number;
  current?: boolean;
  logo: LogoId;
  role: L;
  org: string;
  text: L;
  more: More;
}[] = [
  {
    year: 2011,
    logo: 'servientrega',
    role: { es: 'Analista de Facturación e In Company', en: 'Billing and In Company Analyst' },
    org: 'Servientrega',
    text: {
      es: 'Facturación corporativa e indicadores de flujo de caja a nivel nacional. Aquí aprendí cómo se mueve el dinero en una empresa.',
      en: 'Corporate billing and cash flow metrics across the country. This is where I learned how money moves through a company.',
    },
    more: { route: { name: 'experience', id: 'servientrega' }, suffix: '#facturacion' },
  },
  {
    year: 2015,
    logo: 'servientrega',
    role: { es: 'Webmaster y Trafficker Digital', en: 'Webmaster and Paid Media Specialist' },
    org: 'Servientrega',
    text: {
      es: 'Dos migraciones del portal, 12 sitios del grupo y el SEO que puso «Ya Mismo» en lo más alto de Google.',
      en: 'Two migrations of the main site, 12 group websites and the SEO that took «Ya Mismo» to the top of Google.',
    },
    more: { route: { name: 'experience', id: 'servientrega' }, suffix: '#webmaster' },
  },
  {
    year: 2021,
    logo: 'jikkosoft',
    role: { es: 'Frontend Developer', en: 'Frontend Developer' },
    org: 'Jikkosoft · Cali',
    text: {
      es: 'MVP de una plataforma tributaria para empresas de Cali, con facturación electrónica y pasarela de pagos. 100 % remoto.',
      en: 'MVP of a tax platform for companies in Cali, with e-invoicing and a payment gateway. Fully remote.',
    },
    more: { route: { name: 'experience', id: 'jikkosoft' } },
  },
  {
    year: 2022,
    logo: 'bcs',
    role: { es: 'Frontend Developer', en: 'Frontend Developer' },
    org: 'Banco Caja Social',
    text: {
      es: 'De Marketing a CDT Digital: más de 2.000 millones COP recaudados y mejor producto del banco tres años seguidos.',
      en: 'From Marketing to CDT Digital: over COP 2 billion raised and the bank’s best product three years running.',
    },
    more: { route: { name: 'experience', id: 'banco-caja-social' } },
  },
  {
    year: 2024,
    current: true,
    logo: 'mercadolibre',
    role: { es: 'Software Engineer', en: 'Software Engineer' },
    org: 'Mercado Libre / Mercado Pago · OpsIT',
    text: {
      es: 'Plataformas internas para CX, Benefits y Refunds: la nueva plataforma de Refunds procesa hoy millones de devoluciones.',
      en: 'Internal platforms for CX, Benefits and Refunds: the new Refunds platform now processes millions of refunds.',
    },
    more: { route: { name: 'experience', id: 'mercado-libre' } },
  },
];

export const timelineRange = { from: 2011, to: 2026 };
export const freelanceSince = 2019;

/** Blocks of the «Freelance» lane. Their projects come from the collection by `group`. */
export const freelanceGroups: {
  id: 'goma' | 'bbdo' | 'empresas' | 'novenas';
  label: L;
  sub: L;
  period: L;
  role: L;
  org: L;
  text: L;
  more: More;
}[] = [
  {
    id: 'goma',
    label: { es: 'Mr. Goma Tires', en: 'Mr. Goma Tires' },
    sub: { es: 'EE. UU. · e-commerce + IA', en: 'US · e-commerce + AI' },
    period: { es: '2024 →', en: '2024 →' },
    role: { es: 'E-commerce y panel de vendedores con IA', en: 'E-commerce and an AI-powered sales panel' },
    org: { es: 'Mr. Goma Tires · 7 sedes en Florida, EE. UU.', en: 'Mr. Goma Tires · 7 locations in Florida, US' },
    text: {
      es: 'Búsqueda por medida, catálogo facetado, labrado en 3D, checkout con Stripe y un chat IA que filtra el inventario en lenguaje natural.',
      en: 'Search by tire size, a faceted catalog, 3D tread views, Stripe checkout and an AI chat that filters inventory in plain language.',
    },
    more: {
      route: { name: 'case', id: 'mr-goma-tires' },
      label: { es: 'Leer el caso: Mr. Goma Tires', en: 'Read the case study: Mr. Goma Tires' },
    },
  },
  {
    id: 'bbdo',
    label: { es: 'BBDO México', en: 'BBDO Mexico' },
    sub: { es: 'Agencia · 6 marcas', en: 'Agency · 6 brands' },
    period: { es: 'Agencia', en: 'Agency' },
    role: { es: 'Full stack para la agencia y sus clientes', en: 'Full stack for the agency and its clients' },
    org: {
      es: 'BBDO México · Finamex, Bayer, San Rafael, BMW, FedEx',
      en: 'BBDO Mexico · Finamex, Bayer, San Rafael, BMW, FedEx',
    },
    text: {
      es: 'La web de la agencia y su nueva versión en Astro, los sitios de Afrin y Tabcin desde cero en Drupal, micrositios con captación de leads y la administración de contenidos y mailings de BMW.',
      en: 'The agency’s website and its new Astro version, the Afrin and Tabcin sites built from scratch in Drupal, lead-generation microsites, and content and email campaigns for BMW.',
    },
    more: {
      route: { name: 'case', id: 'bbdo-mexico' },
      label: { es: 'Leer el caso: BBDO México', en: 'Read the case study: BBDO Mexico' },
    },
  },
  {
    id: 'empresas',
    label: { es: 'Sitios para empresas', en: 'Business websites' },
    sub: { es: 'Colombia · 9 empresas', en: 'Colombia · 9 companies' },
    period: { es: '2019 →', en: '2019 →' },
    role: { es: 'Sitios, tiendas y SEO para empresas', en: 'Websites, online stores and SEO for businesses' },
    org: { es: 'Empresas colombianas de 9 sectores', en: 'Colombian companies across 9 sectors' },
    text: {
      es: 'Desde la web del teatro de Alejandra Borrero y una ONG con 60 años de historia hasta e-commerce de moda circular, con el stack que pedía cada proyecto: WordPress, WooCommerce, Odoo, Next.js o Astro.',
      en: 'From actress Alejandra Borrero’s theater and a 60-year-old nonprofit to a circular-fashion store, each with the stack the project called for: WordPress, WooCommerce, Odoo, Next.js or Astro.',
    },
    more: {
      route: { name: 'archive' },
      suffix: '?tipo=Freelance',
      label: { es: 'Ver todos en el archivo', en: 'See them all in the archive' },
    },
  },
  {
    id: 'novenas',
    label: { es: 'Novenas digitales', en: 'Digital novenas' },
    sub: { es: 'Marca blanca · 8 marcas', en: 'White label · 8 brands' },
    period: { es: 'Producto', en: 'Product' },
    role: { es: 'Una novena de Navidad, ocho marcas', en: 'One Christmas novena, eight brands' },
    org: { es: 'Producto propio de marca blanca', en: 'My own white-label product' },
    text: {
      es: 'App mobile-first para rezar la novena con el logo, los colores y las ilustraciones de cada empresa.',
      en: 'A mobile-first app to pray the Christmas novena, with each company’s logo, colors and illustrations.',
    },
    more: {
      route: { name: 'case', id: 'novenas-digitales' },
      label: { es: 'Leer el caso: Novenas digitales', en: 'Read the case study: Digital novenas' },
    },
  },
];

/**
 * Freelance work, shown in the experience list next to the companies. It has no
 * company page of its own: it links to the freelance projects in the archive.
 */
export const freelanceExperience = {
  id: 'freelance',
  startYear: 2019,
  current: true,
  logo: 'alpacorp' as LogoId,
  role: { es: 'Desarrollador full stack freelance', en: 'Freelance Full Stack Developer' } satisfies L,
  company: 'alpacorp',
  summary: {
    es: 'En paralelo a mi empleo, construyo producto para clientes en Colombia, México y EE. UU.: e-commerce, sitios corporativos, campañas y productos propios.',
    en: 'Alongside my job, I build products for clients in Colombia, Mexico and the US: e-commerce, corporate websites, campaigns and my own products.',
  } satisfies L,
  highlights: {
    es: [
      'E-commerce y panel de vendedores con IA para Mr. Goma Tires (EE. UU.)',
      'Sitios y campañas para marcas de BBDO México',
      'Novenas digitales de marca blanca para 8 empresas',
    ],
    en: [
      'E-commerce and an AI-powered sales panel for Mr. Goma Tires (US)',
      'Websites and campaigns for BBDO Mexico’s brands',
      'White-label digital novenas for 8 companies',
    ],
  } satisfies L<string[]>,
  stack: {
    es: ['Next.js', 'Astro', 'React', 'WordPress', 'Drupal', 'Odoo', 'IA'],
    en: ['Next.js', 'Astro', 'React', 'WordPress', 'Drupal', 'Odoo', 'AI'],
  } satisfies L<string[]>,
  filters: ['Freelance', 'Frontend', 'Backend + IA'] as ExperienceFilter[],
  more: { route: { name: 'archive' }, suffix: '?tipo=Freelance' } satisfies More,
};

/** Filter keys (stored in the data, Spanish) and their labels. */
export const experienceFilters = [
  { key: 'Todo', label: { es: 'Todo', en: 'All' } },
  { key: 'Fintech', label: { es: 'Fintech', en: 'Fintech' } },
  { key: 'Frontend', label: { es: 'Frontend', en: 'Frontend' } },
  { key: 'Backend + IA', label: { es: 'Backend + IA', en: 'Backend + AI' } },
  { key: 'Freelance', label: { es: 'Freelance', en: 'Freelance' } },
  { key: 'Marketing', label: { es: 'Marketing', en: 'Marketing' } },
  { key: 'Negocio', label: { es: 'Negocio', en: 'Business' } },
] as const satisfies readonly { key: string; label: L }[];

export type ExperienceFilter = (typeof experienceFilters)[number]['key'];
/** The keys a company or the freelance work can be tagged with («Todo» is the reset chip). */
export const experienceTags = experienceFilters.map((filter) => filter.key).filter((key) => key !== 'Todo') as [
  Exclude<ExperienceFilter, 'Todo'>,
  ...Exclude<ExperienceFilter, 'Todo'>[],
];

/** UNAD and SENA dates follow the latest CV; Acámica and INCAP follow LinkedIn. */
export const education: { title: L; org: string; dates: string; kind: L }[] = [
  {
    title: { es: 'Ingeniería de Sistemas', en: 'B.S. in Systems Engineering' },
    org: 'Universidad Nacional Abierta y a Distancia (UNAD)',
    dates: '2019 — 2024',
    kind: { es: 'Profesional', en: 'Degree' },
  },
  {
    title: { es: 'Desarrollador Web Full Stack', en: 'Full Stack Web Developer' },
    org: 'Acámica',
    dates: '2019 — 2020',
    kind: { es: 'Bootcamp', en: 'Bootcamp' },
  },
  {
    title: {
      es: 'Tecnología en Análisis y Desarrollo de Sistemas de Información',
      en: 'Technologist in Information Systems Analysis and Development',
    },
    org: 'SENA',
    dates: '2017 — 2019',
    kind: { es: 'Tecnólogo', en: 'Technologist' },
  },
  {
    title: {
      es: 'Técnico en Exportaciones, Importaciones y Cambios Internacionales',
      en: 'Technician in Imports, Exports and Foreign Exchange',
    },
    org: 'Instituto Colombiano de Aprendizaje (INCAP)',
    dates: '2010 — 2012',
    kind: { es: 'Técnico', en: 'Technician' },
  },
];

export const educationLinks = {
  education: 'https://www.linkedin.com/in/alejandro-palacios88/details/education/',
  certifications: 'https://www.linkedin.com/in/alejandro-palacios88/details/certifications/',
};

export const skills: L<{ area: string; items: string }[]> = {
  es: [
    { area: 'Frontend', items: 'React, Next.js, Astro, JavaScript, TypeScript, HTML, CSS, Tailwind, Material UI, Redux, Vite' },
    { area: 'Backend e integraciones', items: 'Node.js, NestJS, Express, Go, Python, APIs REST, n8n' },
    { area: 'IA aplicada', items: 'Asistentes internos, tool use con LLMs, automatización con n8n, Spec-Driven Development con Claude Code' },
    { area: 'CMS y e-commerce', items: 'WordPress, WooCommerce, Drupal, Odoo, Joomla, Stripe' },
    { area: 'Datos, pruebas y calidad', items: 'SQL Server, MongoDB, MySQL, Jest, Vitest, React Testing Library, SonarCloud, Azure DevOps' },
    { area: 'Analítica y marketing', items: 'Google Analytics, SEO técnico, pauta digital, HubSpot, email marketing' },
  ],
  en: [
    { area: 'Frontend', items: 'React, Next.js, Astro, JavaScript, TypeScript, HTML, CSS, Tailwind, Material UI, Redux, Vite' },
    { area: 'Backend and integrations', items: 'Node.js, NestJS, Express, Go, Python, REST APIs, n8n' },
    { area: 'Applied AI', items: 'Internal assistants, LLM tool use, n8n automation, spec-driven development with Claude Code' },
    { area: 'CMS and e-commerce', items: 'WordPress, WooCommerce, Drupal, Odoo, Joomla, Stripe' },
    { area: 'Data, testing and quality', items: 'SQL Server, MongoDB, MySQL, Jest, Vitest, React Testing Library, SonarCloud, Azure DevOps' },
    { area: 'Analytics and marketing', items: 'Google Analytics, technical SEO, paid media, HubSpot, email marketing' },
  ],
};
