import { langFromPath, otherLang, type Lang } from './index';

/** A count in singular and plural; `{count}` is replaced by the number. */
export type Plural = { one: string; other: string };

/**
 * Interface strings. Content (projects, companies, career data) is localised
 * next to its data; this file only holds the words of the UI itself.
 */
const es = {
  skipToContent: 'Saltar al contenido',
  home: 'Inicio',
  sections: 'Secciones',
  homeAria: (site: string) => `${site}, inicio`,
  photoAlt: (name: string) => `Foto de ${name}`,
  roleAt: (role: string, company: string) => `${role} en ${company}`,
  searchOrNavigate: 'Buscar o navegar',
  darkTheme: 'Tema oscuro',
  switchLanguage: 'Read in English',
  opensNewTab: '(abre en otra pestaña)',
  email: 'Correo',
  current: 'Actual',
  results: { one: '{count} resultado', other: '{count} resultados' } as Plural,
  technologies: 'Tecnologías',

  // Sections
  about: '01 — Sobre mí',
  timeline: '02 — Trayectoria',
  cases: '03 — Casos de estudio',
  experience: '04 — Experiencia',
  education: '05 — Formación',
  contact: '06 — Contacto',

  // Timeline
  employmentLane: 'Empleo',
  employmentHint: '· toca un año',
  employmentAria: 'Hitos de empleo',
  freelanceLane: 'Freelance · Alpacorp, en paralelo',
  freelanceHint: '· toca un bloque para ver sus proyectos',
  freelanceAria: 'Bloques freelance',
  seeProjects: 'Ver proyectos ↓',
  close: 'Cerrar ↑',
  today: 'hoy',

  // Cases
  seeAllCases: (count: number) => `Ver los ${count} casos de estudio`,
  exploreArchive: (count: number) => `Explorar los ${count} proyectos en el archivo`,
  allCases: 'Todos los casos',
  casesTitle: 'Proyectos contados de principio a fin',
  casesLead: 'El reto, lo que decidí y lo que cambió. Para ver todos los proyectos, incluidos los que no tienen caso,',
  visitArchive: 'visita el archivo',
  caseLabel: 'Casos de estudio',
  kind: 'Tipo',
  stack: 'Stack',
  status: 'Estado',
  viewLive: 'Ver en línea',
  employment: 'Empleo',
  freelance: 'Freelance',
  via: (name: string) => `vía ${name}`,
  liveVersions: 'Versiones en línea',
  nextCase: 'Siguiente caso',

  // Experience
  filterByFocus: 'Filtrar por enfoque',
  fullExperience: 'Ver la experiencia completa',
  freelanceProjects: 'Ver los proyectos freelance',
  fullCv: 'Ver CV completo · versión imprimible →',
  allExperience: 'Toda la experiencia',
  phases: 'Etapas',
  phaseProjects: 'Proyectos de esta etapa',
  nextExperience: 'Siguiente experiencia',

  // Education
  educationLinkedIn: 'Formación completa en LinkedIn',
  certificates: 'Certificados y cursos',

  // Contact
  contactTitle: '¿Construimos algo que mueva los números?',
  contactText: 'Posiciones en fintech y producto, o proyectos freelance a través de Alpacorp.',
  writeMe: 'Escríbeme',
  cvButton: 'Ver CV / descargar PDF',

  // Archive
  archiveEyebrow: 'Archivo',
  archivePageTitle: 'Archivo de proyectos',
  archiveDescription: (name: string) => `Todos los proyectos de ${name}: banca, fintech, e-commerce, agencias y freelance.`,
  casesDescription: (name: string) => `Casos de estudio de ${name}: banca, fintech, e-commerce, agencias y producto.`,
  archiveTitle: 'Todo lo que he construido',
  archiveLead: 'Empleo y freelance en una sola lista. Filtra por tipo o sector, o busca por cliente o tecnología. Los proyectos con',
  archiveLeadEnd: 'tienen su historia completa.',
  filterProjects: 'Filtrar proyectos',
  filterAll: 'Todo',
  filterCases: 'Casos',
  searchLabel: 'Buscar proyecto, cliente o tecnología',
  searchPlaceholder: 'Buscar cliente, sector o tecnología…',
  sector: 'Sector',
  allSectors: 'Todos los sectores',
  /** «{count} of N projects»: the total is fixed on the server, the count changes on the client. */
  countOf: (total: number): Plural => ({ one: `{count} de ${total} proyectos`, other: `{count} de ${total} proyectos` }),
  colYear: 'Año',
  colClient: 'Cliente',
  colProject: 'Proyecto',
  colSector: 'Sector',
  colStack: 'Stack',
  colLink: 'Enlace',
  caseBadge: 'CASO',
  noMatches: 'Ningún proyecto coincide con ese filtro.',

  // Palette
  palettePlaceholder: 'Busca una sección, un caso o una acción…',
  paletteSearch: 'Buscar',
  paletteEmpty: 'Sin resultados.',
  paletteCopied: 'Correo copiado',
  groupSections: 'Secciones',
  groupCases: 'Casos de estudio',
  groupExperience: 'Experiencia',
  groupPages: 'Páginas',
  groupActions: 'Acciones',
  allCasesPage: 'Todos los casos de estudio',
  printableCv: 'CV imprimible',
  toggleTheme: 'Cambiar tema claro / oscuro',
  copyEmail: 'Copiar correo',
  writeEmail: 'Escribir un correo',
  openLinkedIn: 'Abrir LinkedIn',

  // CV
  cvTitle: 'CV',
  cvDescription: (name: string, role: string) => `CV de ${name}, ${role}.`,
  print: 'Imprimir / guardar PDF',
  profileHeading: 'Perfil',
  experienceHeading: 'Experiencia',
  freelanceHighlights: 'Proyectos freelance destacados',
  result: 'Resultado',
  educationHeading: 'Formación',
  skillsHeading: 'Habilidades',
  educationFull: 'Formación completa',
  and: 'y',
  certificatesLower: 'certificados',
  on: 'en',

  // 404
} as const;

/** English must define every Spanish key with the same shape. */
type Dictionary = {
  [Key in keyof typeof es]: (typeof es)[Key] extends (...args: infer Args) => infer Result
    ? (...args: Args) => Result
    : (typeof es)[Key] extends string
      ? string
      : (typeof es)[Key];
};

const en: Dictionary = {
  skipToContent: 'Skip to content',
  home: 'Home',
  sections: 'Sections',
  homeAria: (site) => `${site}, home`,
  photoAlt: (name) => `Photo of ${name}`,
  roleAt: (role, company) => `${role} at ${company}`,
  searchOrNavigate: 'Search or jump to',
  darkTheme: 'Dark theme',
  switchLanguage: 'Leer en español',
  opensNewTab: '(opens in a new tab)',
  email: 'Email',
  current: 'Current',
  results: { one: '{count} result', other: '{count} results' },
  technologies: 'Technologies',

  about: '01 — About',
  timeline: '02 — Career',
  cases: '03 — Case studies',
  experience: '04 — Experience',
  education: '05 — Education',
  contact: '06 — Contact',

  employmentLane: 'Employment',
  employmentHint: '· pick a year',
  employmentAria: 'Employment milestones',
  freelanceLane: 'Freelance · Alpacorp, alongside',
  freelanceHint: '· pick a block to see its projects',
  freelanceAria: 'Freelance blocks',
  seeProjects: 'See projects ↓',
  close: 'Close ↑',
  today: 'present',

  seeAllCases: (count) => `See all ${count} case studies`,
  exploreArchive: (count) => `Browse all ${count} projects in the archive`,
  allCases: 'All case studies',
  casesTitle: 'Projects told from start to finish',
  casesLead: 'The challenge, what I decided and what changed. To see every project, including those without a case study,',
  visitArchive: 'browse the archive',
  caseLabel: 'Case studies',
  kind: 'Type',
  stack: 'Stack',
  status: 'Status',
  viewLive: 'View live',
  employment: 'Employment',
  freelance: 'Freelance',
  via: (name) => `via ${name}`,
  liveVersions: 'Live versions',
  nextCase: 'Next case study',

  filterByFocus: 'Filter by focus',
  fullExperience: 'See the full story',
  freelanceProjects: 'See freelance projects',
  fullCv: 'Full CV · printable version →',
  allExperience: 'All experience',
  phases: 'Phases',
  phaseProjects: 'Projects from this phase',
  nextExperience: 'Next company',

  educationLinkedIn: 'Full education on LinkedIn',
  certificates: 'Certificates and courses',

  contactTitle: 'Shall we build something that moves the numbers?',
  contactText: 'Open to fintech and product roles, and to freelance projects through Alpacorp.',
  writeMe: 'Email me',
  cvButton: 'View CV / download PDF',

  archiveEyebrow: 'Archive',
  archivePageTitle: 'Project archive',
  archiveDescription: (name) => `Every project by ${name}: banking, fintech, e-commerce, agencies and freelance.`,
  casesDescription: (name) => `Case studies by ${name}: banking, fintech, e-commerce, agencies and product.`,
  archiveTitle: 'Everything I’ve built',
  archiveLead: 'Employment and freelance in one list. Filter by type or sector, or search by client or technology. Projects marked',
  archiveLeadEnd: 'have their full story.',
  filterProjects: 'Filter projects',
  filterAll: 'All',
  filterCases: 'Cases',
  searchLabel: 'Search by project, client or technology',
  searchPlaceholder: 'Search client, sector or technology…',
  sector: 'Sector',
  allSectors: 'All sectors',
  countOf: (total) => ({ one: `{count} of ${total} projects`, other: `{count} of ${total} projects` }),
  colYear: 'Year',
  colClient: 'Client',
  colProject: 'Project',
  colSector: 'Sector',
  colStack: 'Stack',
  colLink: 'Link',
  caseBadge: 'CASE',
  noMatches: 'No project matches that filter.',

  palettePlaceholder: 'Search a section, a case study or an action…',
  paletteSearch: 'Search',
  paletteEmpty: 'No results.',
  paletteCopied: 'Email copied',
  groupSections: 'Sections',
  groupCases: 'Case studies',
  groupExperience: 'Experience',
  groupPages: 'Pages',
  groupActions: 'Actions',
  allCasesPage: 'All case studies',
  printableCv: 'Printable CV',
  toggleTheme: 'Toggle light / dark theme',
  copyEmail: 'Copy email',
  writeEmail: 'Write an email',
  openLinkedIn: 'Open LinkedIn',

  cvTitle: 'CV',
  cvDescription: (name, role) => `CV of ${name}, ${role}.`,
  print: 'Print / save as PDF',
  profileHeading: 'Profile',
  experienceHeading: 'Experience',
  freelanceHighlights: 'Selected freelance projects',
  result: 'Result',
  educationHeading: 'Education',
  skillsHeading: 'Skills',
  educationFull: 'Full education',
  and: 'and',
  certificatesLower: 'certificates',
  on: 'on',

};

const dictionaries: Record<Lang, Dictionary> = { es, en };

export const useT = (lang: Lang) => dictionaries[lang];

/** Language of the current page, the other one, and the UI strings, from its URL. */
export function getI18n(url: URL) {
  const lang = langFromPath(url.pathname);
  return { lang, otherLang: otherLang(lang), ui: dictionaries[lang] };
}

/** Sector names used in project data (Spanish) → English display name. */
export const sectorsEn: Record<string, string> = {
  Banca: 'Banking',
  Fintech: 'Fintech',
  Finanzas: 'Finance',
  Tributario: 'Tax',
  Logística: 'Logistics',
  Automotriz: 'Automotive',
  Publicidad: 'Advertising',
  Farmacéutico: 'Pharma',
  Alimentos: 'Food',
  Cultura: 'Culture',
  Servicios: 'Services',
  ONG: 'Nonprofit',
  Moda: 'Fashion',
  Dermocosmética: 'Dermocosmetics',
  Educación: 'Education',
  'Química industrial': 'Industrial chemicals',
  Salud: 'Health',
  Telecomunicaciones: 'Telecom',
  Varios: 'Various',
};

export const sectorName = (sector: string, lang: Lang) =>
  lang === 'en' ? (sectorsEn[sector] ?? sector) : sector;
