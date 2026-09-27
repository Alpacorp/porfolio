import type { LogoId } from './logos';

/**
 * Timeline milestones («Empleo» lane). Kept short on purpose: each one links to
 * the company page, where the full story lives.
 */
export const milestones = [
  {
    year: 2011,
    more: { href: '/experiencia/servientrega/#facturacion', label: 'Ver la experiencia completa' },
    logo: 'servientrega' as LogoId,
    role: 'Analista de Facturación e In Company',
    org: 'Servientrega',
    text: 'Facturación corporativa e indicadores de flujo de caja a nivel nacional. Aquí aprendí cómo se mueve el dinero en una empresa.',
  },
  {
    year: 2015,
    more: { href: '/experiencia/servientrega/#webmaster', label: 'Ver la experiencia completa' },
    logo: 'servientrega' as LogoId,
    role: 'Webmaster y Trafficker Digital',
    org: 'Servientrega',
    text: 'Dos migraciones del portal, 12 sitios del grupo y el SEO que puso «Ya Mismo» en lo más alto de Google.',
  },
  {
    year: 2021,
    more: { href: '/experiencia/jikkosoft/', label: 'Ver la experiencia completa' },
    logo: 'jikkosoft' as LogoId,
    role: 'Frontend Developer',
    org: 'Jikkosoft · Cali',
    text: 'MVP de una plataforma tributaria para empresas de Cali, con facturación electrónica y pasarela de pagos. 100 % remoto.',
  },
  {
    year: 2022,
    more: { href: '/experiencia/banco-caja-social/', label: 'Ver la experiencia completa' },
    logo: 'bcs' as LogoId,
    role: 'Frontend Developer',
    org: 'Banco Caja Social',
    text: 'De Marketing a CDT Digital: más de 2.000 millones COP recaudados y mejor producto del banco tres años seguidos.',
  },
  {
    year: 2024,
    more: { href: '/experiencia/mercado-libre/', label: 'Ver la experiencia completa' },
    current: true,
    logo: 'mercadolibre' as LogoId,
    role: 'Software Engineer',
    org: 'Mercado Libre / Mercado Pago · OpsIT',
    text: 'Plataformas internas para CX, Benefits y Refunds: la nueva plataforma de Refunds procesa hoy millones de devoluciones.',
  },
];

export const timelineRange = { from: 2011, to: 2026 };
export const freelanceSince = 2019;

/** Bloques del carril «Freelance». Sus proyectos salen de la colección por `group`. */
export const freelanceGroups = [
  {
    id: 'goma',
    more: { href: '/casos/mr-goma-tires/', label: 'Leer el caso: Mr. Goma Tires' },
    label: 'Mr. Goma Tires',
    sub: 'EE. UU. · e-commerce + IA',
    period: '2024 →',
    role: 'E-commerce y panel de vendedores con IA',
    org: 'Mr. Goma Tires · 7 sedes en Florida, EE. UU.',
    text: 'Búsqueda por medida, catálogo facetado, labrado en 3D, checkout con Stripe y un chat IA que filtra el inventario en lenguaje natural.',
  },
  {
    id: 'bbdo',
    more: { href: '/casos/bbdo-mexico/', label: 'Leer el caso: BBDO México' },
    label: 'BBDO México',
    sub: 'Agencia · 6 marcas',
    period: 'Agencia',
    role: 'Full stack para la agencia y sus clientes',
    org: 'BBDO México · Finamex, Bayer, San Rafael, BMW, FedEx',
    text: 'La web de la agencia y su nueva versión en Astro, los sitios de Afrin y Tabcin desde cero en Drupal, micrositios con captación de leads y la administración de contenidos y mailings de BMW.',
  },
  {
    id: 'empresas',
    more: { href: '/archivo/?tipo=Freelance', label: 'Ver todos en el archivo' },
    label: 'Sitios para empresas',
    sub: 'Colombia · 9 empresas',
    period: '2019 →',
    role: 'Sitios, tiendas y SEO para empresas',
    org: 'Empresas colombianas de 9 sectores',
    text: 'Desde la web del teatro de Alejandra Borrero y una ONG con 60 años de historia hasta e-commerce de moda circular, con el stack que pedía cada proyecto: WordPress, WooCommerce, Odoo, Next.js o Astro.',
  },
  {
    id: 'novenas',
    more: { href: '/casos/novenas-digitales/', label: 'Leer el caso: Novenas digitales' },
    label: 'Novenas digitales',
    sub: 'Marca blanca · 8 marcas',
    period: 'Producto',
    role: 'Una novena de Navidad, ocho marcas',
    org: 'Producto propio de marca blanca',
    text: 'App mobile-first para rezar la novena con el logo, los colores y las ilustraciones de cada empresa.',
  },
] as const;

/**
 * Freelance work, shown in the experience list next to the companies. It has no
 * company page of its own: it links to the freelance projects in the archive.
 */
export const freelanceExperience = {
  id: 'freelance',
  startYear: 2019,
  start: '2019',
  end: 'hoy',
  current: true,
  logo: 'alpacorp' as LogoId,
  role: 'Desarrollador full stack freelance',
  company: 'alpacorp',
  summary:
    'En paralelo a mi empleo, construyo producto para clientes en Colombia, México y EE. UU.: e-commerce, sitios corporativos, campañas y productos propios.',
  highlights: [
    'E-commerce y panel de vendedores con IA para Mr. Goma Tires (EE. UU.)',
    'Sitios y campañas para marcas de BBDO México',
    'Novenas digitales de marca blanca para 8 empresas',
  ],
  stack: ['Next.js', 'Astro', 'React', 'WordPress', 'Drupal', 'Odoo', 'IA'],
  filters: ['Freelance', 'Frontend', 'Backend + IA'],
  href: '/archivo/?tipo=Freelance',
  hrefLabel: 'Ver los proyectos freelance',
};

export const experienceFilters = [
  'Todo',
  'Fintech',
  'Frontend',
  'Backend + IA',
  'Freelance',
  'Marketing',
  'Negocio',
];

/** Fechas de UNAD y SENA según el CV más reciente; Acámica e INCAP según LinkedIn. */
export const education = [
  {
    title: 'Ingeniería de Sistemas',
    org: 'Universidad Nacional Abierta y a Distancia (UNAD)',
    dates: '2019 — 2024',
    kind: 'Profesional',
  },
  {
    title: 'Desarrollador Web Full Stack',
    org: 'Acámica',
    dates: '2019 — 2020',
    kind: 'Bootcamp',
  },
  {
    title: 'Tecnología en Análisis y Desarrollo de Sistemas de Información',
    org: 'SENA',
    dates: '2017 — 2019',
    kind: 'Tecnólogo',
  },
  {
    title: 'Técnico en Exportaciones, Importaciones y Cambios Internacionales',
    org: 'Instituto Colombiano de Aprendizaje (INCAP)',
    dates: '2010 — 2012',
    kind: 'Técnico',
  },
];

export const educationLinks = {
  education: 'https://www.linkedin.com/in/alejandro-palacios88/details/education/',
  certifications: 'https://www.linkedin.com/in/alejandro-palacios88/details/certifications/',
};

export const skills = [
  { area: 'Frontend', items: 'React, Next.js, Astro, JavaScript, TypeScript, HTML, CSS, Tailwind, Material UI, Redux, Vite' },
  { area: 'Backend e integraciones', items: 'Node.js, NestJS, Express, Go, Python, APIs REST, n8n' },
  { area: 'IA aplicada', items: 'Asistentes internos, tool use con LLMs, automatización con n8n, Spec-Driven Development con Claude Code' },
  { area: 'CMS y e-commerce', items: 'WordPress, WooCommerce, Drupal, Odoo, Joomla, Stripe' },
  { area: 'Datos, pruebas y calidad', items: 'SQL Server, MongoDB, MySQL, Jest, Vitest, React Testing Library, SonarCloud, Azure DevOps' },
  { area: 'Analítica y marketing', items: 'Google Analytics, SEO técnico, pauta digital, HubSpot, email marketing' },
];
