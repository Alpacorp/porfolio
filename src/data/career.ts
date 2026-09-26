import type { LogoId } from './logos';

/** Hitos del carril «Empleo» de la línea de tiempo. */
export const milestones = [
  {
    year: 2011,
    more: { href: '#exp-servientrega-billing', label: 'Ver en Experiencia', internal: true },
    logo: 'servientrega' as LogoId,
    role: 'Analista de Facturación e In Company',
    org: 'Servientrega',
    text: 'Facturación de clientes corporativos, bases de datos de cobro e indicadores de flujo de caja a nivel nacional. Aquí aprendí cómo se mueve el dinero en una empresa.',
  },
  {
    year: 2015,
    more: { href: '#exp-servientrega-web', label: 'Ver en Experiencia', internal: true },
    logo: 'servientrega' as LogoId,
    role: 'Webmaster y Trafficker Digital',
    org: 'Servientrega',
    text: 'Migré dos veces el sitio principal hasta su versión actual, hoy muy bien posicionado, y administré más de 12 portales del grupo. SEO, analítica y pauta en Google, Meta, LinkedIn y Twitter.',
  },
  {
    year: 2021,
    more: { href: '#exp-jikkosoft', label: 'Ver en Experiencia', internal: true },
    logo: 'jikkosoft' as LogoId,
    role: 'Frontend Developer',
    org: 'Jikkosoft · Cali',
    text: 'Plataforma para gestionar las obligaciones tributarias de empresas de Cali: impuestos, cuentas por pagar y cobranzas. React, Material UI, Redux, SOLID y pruebas unitarias.',
  },
  {
    year: 2022,
    more: { href: '/casos/cdt-digital/', label: 'Leer el caso: CDT Digital' },
    logo: 'bcs' as LogoId,
    role: 'Frontend Developer',
    org: 'Banco Caja Social',
    text: 'Creamos CDT Digital de punta a punta: más de 2.000 millones COP recaudados en dos años y mejor producto del banco tres años seguidos.',
  },
  {
    year: 2024,
    more: { href: '/casos/opsit-devoluciones-cashbacks/', label: 'Leer el caso: Devoluciones y cashbacks' },
    current: true,
    logo: 'mercadolibre' as LogoId,
    role: 'Software Engineer',
    org: 'Mercado Libre / Mercado Pago · OpsIT',
    text: 'Todo el frontend de la plataforma de devoluciones y el de las plataformas de cashbacks, integradas con múltiples servicios internos. Último año enfocado en IA aplicada al desarrollo.',
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

/** Experiencia (sección con filtros). */
export const experience = [
  {
    id: 'exp-freelance',
    dates: '2019 — hoy',
    logo: 'alpacorp' as LogoId,
    current: true,
    role: 'Desarrollador full stack freelance',
    org: 'alpacorp',
    text: 'E-commerce y panel con IA para Mr. Goma Tires (EE. UU.); sitios y campañas para clientes de BBDO México y la web de la agencia; sitios, tiendas y SEO para 9 empresas en Colombia; novenas digitales de marca blanca para 8 empresas.',
    tags: ['Next.js', 'Astro', 'React', 'WordPress', 'Drupal', 'Odoo', 'IA'],
    filters: ['Freelance', 'Frontend', 'Backend + IA'],
  },
  {
    id: 'exp-mercadolibre',
    dates: 'oct 2024 — hoy',
    logo: 'mercadolibre' as LogoId,
    current: true,
    role: 'Software Engineer',
    org: 'Mercado Libre / Mercado Pago',
    text: 'Frontend completo de la plataforma de devoluciones (refunds) y de las plataformas de cashbacks en OpsIT, integradas con múltiples servicios internos. IA aplicada al desarrollo: asistentes internos, n8n y Python.',
    tags: ['React', 'TypeScript', 'Node.js', 'Go', 'n8n', 'Python'],
    filters: ['Fintech', 'Frontend', 'Backend + IA'],
  },
  {
    id: 'exp-bcs',
    dates: 'jun 2022 — oct 2024',
    logo: 'bcs' as LogoId,
    role: 'Frontend Developer',
    org: 'Banco Caja Social',
    text: 'Creamos CDT Digital de punta a punta: todo el frontend y las integraciones con el backend. Más de 2.000 millones COP recaudados en dos años y mejor producto del banco tres años seguidos.',
    tags: ['React', 'Next.js', 'NestJS', 'Azure DevOps', 'SonarCloud'],
    filters: ['Fintech', 'Frontend'],
  },
  {
    id: 'exp-jikkosoft',
    dates: 'jul 2021 — jul 2022',
    logo: 'jikkosoft' as LogoId,
    role: 'Frontend Developer',
    org: 'Jikkosoft',
    text: 'Plataforma de obligaciones tributarias para empresas de Cali: impuestos, cuentas por pagar y cobranzas.',
    tags: ['React', 'Material UI', 'Redux', 'Jest'],
    filters: ['Fintech', 'Frontend'],
  },
  {
    id: 'exp-servientrega-web',
    dates: 'oct 2015 — jun 2021',
    logo: 'servientrega' as LogoId,
    role: 'Webmaster y Trafficker Digital',
    org: 'Servientrega',
    text: 'Dos migraciones del sitio principal hasta su versión actual, muy bien posicionada; más de 12 portales del grupo, SEO, analítica y pauta digital.',
    tags: ['WordPress', 'SEO', 'Google Analytics', 'Pauta'],
    filters: ['Marketing', 'Frontend'],
  },
  {
    id: 'exp-servientrega-billing',
    dates: 'jul 2011 — sep 2015',
    logo: 'servientrega' as LogoId,
    role: 'Analista de Facturación e In Company',
    org: 'Servientrega',
    text: 'Facturación corporativa, indicadores de gestión y flujo de caja a nivel nacional.',
    tags: ['Facturación', 'Indicadores'],
    filters: ['Negocio', 'Fintech'],
  },
];

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
