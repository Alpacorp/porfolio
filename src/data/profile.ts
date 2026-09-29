import type { L } from '../i18n';

export const profile = {
  name: 'Alejandro Palacios Arévalo',
  role: 'Software Engineer',
  focus: {
    es: 'Frontend, Backend, Automatización e IA',
    en: 'Frontend, Backend, Automation and AI',
  } satisfies L,
  current: 'Mercado Libre / Mercado Pago',
  location: 'Bogotá, Colombia',
  city: 'Bogotá',
  email: 'alejandro.palacios88@gmail.com',
  site: 'alpacorp.net',
  availability: {
    es: 'Abierto a fintech, producto y freelance',
    en: 'Open to fintech, product and freelance',
  } satisfies L,
  /** Split so the middle part can carry the highlighter. */
  tagline: {
    es: {
      before: 'Construyo producto digital con ',
      highlight: 'ojo de negocio',
      after:
        ': plataformas en Mercado Pago, banca digital y, como freelance, más de 30 proyectos para clientes en Colombia, México y EE. UU.',
    },
    en: {
      before: 'I build digital products with ',
      highlight: 'a business mindset',
      after:
        ': internal platforms at Mercado Pago, digital banking and, as a freelancer, 30+ projects for clients in Colombia, Mexico and the US.',
    },
  } satisfies L<{ before: string; highlight: string; after: string }>,
  description: {
    es: 'Software Engineer en Mercado Libre / Mercado Pago. Más de 9 años construyendo producto digital para banca, fintech, e-commerce y agencias. React, TypeScript, Node, Go e IA aplicada.',
    en: 'Software Engineer at Mercado Libre / Mercado Pago. 9+ years building digital products for banking, fintech, e-commerce and agencies. React, TypeScript, Node, Go and applied AI.',
  } satisfies L,
  links: {
    linkedin: 'https://www.linkedin.com/in/alejandro-palacios88/',
    github: 'https://github.com/Alpacorp',
  },
};

export const stats: L<{ value: string; label: string }[]> = {
  es: [
    { value: '+9', label: 'años construyendo producto digital' },
    { value: '30+', label: 'proyectos entregados' },
    { value: '3', label: 'países: Colombia, México y EE. UU.' },
    { value: '$2.000M', label: 'COP recaudados con CDT Digital' },
  ],
  en: [
    { value: '9+', label: 'years building digital products' },
    { value: '30+', label: 'projects delivered' },
    { value: '3', label: 'countries: Colombia, Mexico and the US' },
    { value: '$2B+', label: 'COP raised through CDT Digital (≈ USD 500K)' },
  ],
};

/** The «three languages» of the positioning line. */
export const languages: L<{ period: string; title: string; text: string }[]> = {
  es: [
    {
      period: '2011 — 2015',
      title: 'Negocio',
      text: 'Facturación corporativa, flujos de caja e indicadores de gestión a nivel nacional.',
    },
    {
      period: '2015 — 2021',
      title: 'Marketing',
      text: 'Dos migraciones de un sitio líder en logística, 12+ portales, SEO, analítica y pauta digital.',
    },
    {
      period: '2021 — hoy',
      title: 'Ingeniería',
      text: 'React, TypeScript, Node y Go en banca y fintech, con IA aplicada al desarrollo.',
    },
  ],
  en: [
    {
      period: '2011 — 2015',
      title: 'Business',
      text: 'Corporate billing, cash flow and performance metrics across the country.',
    },
    {
      period: '2015 — 2021',
      title: 'Marketing',
      text: 'Two migrations of a leading logistics website, 12+ portals, SEO, analytics and paid media.',
    },
    {
      period: '2021 — present',
      title: 'Engineering',
      text: 'React, TypeScript, Node and Go in banking and fintech, with AI built into the workflow.',
    },
  ],
};

/**
 * Sidebar / mobile bar / palette menu. Items with `page` link to a page instead of
 * a home section (the archive has no section on the home page).
 */
export const nav: { id: string; label: L; page?: 'archive' }[] = [
  { id: 'sobre', label: { es: 'Sobre mí', en: 'About' } },
  { id: 'trayectoria', label: { es: 'Trayectoria', en: 'Career' } },
  { id: 'casos', label: { es: 'Casos', en: 'Cases' } },
  { id: 'experiencia', label: { es: 'Experiencia', en: 'Experience' } },
  { id: 'formacion', label: { es: 'Formación', en: 'Education' } },
  { id: 'archivo', label: { es: 'Archivo', en: 'Archive' }, page: 'archive' },
  { id: 'contacto', label: { es: 'Contacto', en: 'Contact' } },
];
