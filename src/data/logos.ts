/**
 * Company and client logos. Each id has two files in src/assets/logos/:
 *   <id>.webp       the color original (shown on hover)
 *   <id>.mono.webp  the monochrome mask (what shows at rest)
 *
 * `height`: height in px, tuned by eye so they all carry similar weight.
 * `hoverColor: false`: the original is white or very light and would not read on paper.
 *
 * Sources: each brand's official website; Banco Caja Social, Bayer, BMW and FedEx
 * from Wikimedia Commons (public domain); the novenas, from the apps Alejandro built.
 */
export const logos = {
  alpacorp: { label: 'Alpacorp', height: 26 },
  mercadolibre: { label: 'Mercado Libre', height: 30 },
  bcs: { label: 'Banco Caja Social', height: 24 },
  servientrega: { label: 'Servientrega', height: 22 },
  jikkosoft: { label: 'Jikkosoft', height: 24, hoverColor: false },
  bbdo: { label: 'BBDO', height: 20 },
  finamex: { label: 'Finamex', height: 14, hoverColor: false },
  bayer: { label: 'Bayer', height: 34 },
  sanrafael: { label: 'San Rafael', height: 30 },
  bmw: { label: 'BMW', height: 32 },
  fedex: { label: 'FedEx', height: 26 },
  mrgoma: { label: 'Mr. Goma Tires', height: 20 },
  casaeborrero: { label: 'Casa E Borrero', height: 34 },
  toctoc: { label: 'Elite FMS', height: 22, hoverColor: false },
  procesion: { label: 'Procesión Infantil Tunja', height: 36 },
  desprendarte: { label: 'Desprendarte', height: 20 },
  hilada: { label: 'HILADA', height: 16 },
  skingen: { label: 'SkinGen', height: 28 },
  onoff: { label: 'OnOff', height: 28 },
  glearning: { label: 'G-Learning', height: 24 },
  fraser: { label: 'Fraser', height: 22 },
  uniibague: { label: 'Universidad de Ibagué', height: 34 },
  'onoff-novena': { label: 'OnOff', height: 30 },
  heimcore: { label: 'Heimcore', height: 18 },
  'bcs-novena': { label: 'Banco Caja Social', height: 24 },
  thankstoyou: { label: 'Thanks To You', height: 28 },
  sanfrijol: { label: 'San Frijol', height: 34 },
  ricofru: { label: 'Ricofru', height: 34 },
  pizzeriapuntodf: { label: 'Pizzería Punto DF', height: 34 },
} satisfies Record<string, { label: string; height: number; hoverColor?: boolean }>;

export type LogoId = keyof typeof logos;

export const logoIds = Object.keys(logos) as [LogoId, ...LogoId[]];
