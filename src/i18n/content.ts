export type Lang = 'it' | 'en';

export interface CapabilityItem {
  title: string;
  body: string;
}

export interface LogoItem {
  src: string;
  alt: string;
  note?: string;
}

/** One product card: this page only says which memory it applies and sends people to its site. */
export interface ProductItem {
  name: string;
  kicker: string;
  body: string;
  cta: { label: string; href: string };
}

export interface Content {
  nav: { label: string; href: string }[];
  navCta: string;
  hero: {
    titleLines: string[];
    lead: string;
    intro: string;
    how: string;
    pillars: string[];
    cta: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    scrollHint: string;
  };
  technology: {
    index: string;
    label: string;
    title: string;
    items: CapabilityItem[];
  };
  products: {
    index: string;
    label: string;
    title: string;
    items: ProductItem[];
  };
  credibility: {
    index: string;
    label: string;
    title: string;
    body: string;
    clientsLabel: string;
    clients: LogoItem[];
    innovationLabel: string;
    innovation: string;
    logos: LogoItem[];
  };
  footer: {
    contactsLabel: string;
    lines: string[];
    email: string;
    legal: string;
  };
}

/* Villanova.AI is the Tiscali group company we work with: the logo carries the
   brand, the caption carries the group named in the copy. */
const clientLogos: LogoItem[] = [
  { src: '/images/villanova-ai.webp', alt: 'Villanova.AI', note: 'Gruppo Tiscali' },
  { src: '/images/nexi.svg', alt: 'Nexi', note: 'Gruppo Nexi' },
];

const innovationLogos: LogoItem[] = [
  { src: '/images/deloitte.webp', alt: 'Deloitte' },
  { src: '/images/polihub.webp', alt: 'PoliHub — Politecnico di Milano' },
  { src: '/images/levillage.webp', alt: 'Le Village' },
];

const JUNO_URL = 'https://ojuno.ai';
const ORMENTIS_URL = 'https://ormentis.com';

export const content: Record<Lang, Content> = {
  it: {
    nav: [
      { label: 'La tecnologia', href: '#tecnologia' },
      { label: 'I prodotti', href: '#prodotti' },
      { label: 'Clienti', href: '#clienti' },
    ],
    navCta: 'Contattaci',
    hero: {
      titleLines: ['Memoria per', 'agenti AI.'],
      lead: 'Un motore di retrieval che massimizza il recall.',
      intro:
        'Deep4IT costruisce la memoria degli agenti AI: recupera ciò che è stato detto nelle conversazioni e ciò che sta scritto nei documenti e nel codice, senza perdere nulla di ciò che serve.',
      how:
        'Il recupero non passa da un’interpretazione di un LLM. Analizzatori lessicali, sintattici e semantici lo rendono deterministico, misurabile e conforme ai requisiti dei settori regolamentati.',
      pillars: ['Recall massimo', 'Retrieval deterministico', 'Conformità dimostrabile'],
      cta: { label: 'I prodotti', href: '#prodotti' },
      ctaSecondary: { label: 'Contattaci', href: '#contatti' },
      scrollHint: 'Scorri',
    },
    technology: {
      index: '01',
      label: 'La tecnologia',
      title: 'Retrieval deterministico. Recall massimo.',
      items: [
        {
          title: 'Recall massimo.',
          body:
            'Non un pezzo pertinente: tutti i pezzi necessari, comprese le eccezioni e le condizioni scritte altrove. Il recall si misura su domande con risposta nota, ed è il numero che ottimizziamo.',
        },
        {
          title: 'Nessun LLM nel recupero.',
          body:
            'Analizzatori lessicali, sintattici e semantici costruiscono e interrogano la memoria. Dagli stessi dati esce sempre lo stesso risultato: il recupero è deterministico e ripetibile.',
        },
        {
          title: 'Qualità misurabile.',
          body:
            'Ogni risposta porta la traccia di ciò che ha recuperato e perché. Si verifica, si confronta e si migliora con numeri, non con impressioni.',
        },
        {
          title: 'Conformità dimostrabile.',
          body:
            'Ogni elemento della memoria resta legato alla sua origine: conversazione, documento o riga di codice. Nato per banche centrali, sistemi di pagamento e sistemi di difesa.',
        },
      ],
    },
    products: {
      index: '02',
      label: 'I prodotti',
      title: 'Due prodotti applicano la stessa tecnologia.',
      items: [
        {
          name: 'Juno',
          kicker: 'Memoria per i dipendenti',
          body:
            'Assistenti AI su WhatsApp e Teams che usano la memoria delle conversazioni e di basi documentali legali sul diritto del lavoro.',
          cta: { label: 'ojuno.ai', href: JUNO_URL },
        },
        {
          name: 'Ormentis',
          kicker: 'Memoria per lo sviluppo prodotto',
          body:
            'Memoria da basi documentali e codice del cliente per lo sviluppo di prodotti nei servizi finanziari. Per persone e agenti, con plugin per Claude Code e Codex.',
          cta: { label: 'ormentis.com', href: ORMENTIS_URL },
        },
      ],
    },
    credibility: {
      index: '03',
      label: 'Deep4IT',
      title: 'Clienti e percorso di innovazione.',
      body: 'Laboratorio di ricerca con sede a Monza, incubato al Politecnico di Milano.',
      clientsLabel: 'Tra i nostri clienti',
      clients: clientLogos,
      innovationLabel: 'Percorso di innovazione',
      innovation:
        'Il nostro percorso di innovazione comprende un grant e la vittoria di una competizione con premiazione da parte di Deloitte, l’incubazione presso il Politecnico di Milano e l’accelerazione con Le Village.',
      logos: innovationLogos,
    },
    footer: {
      contactsLabel: 'Contatti',
      lines: ['Via Italia, 44', '20900 Monza, Italia'],
      email: 'info@deep4it.com',
      legal:
        '© 2026 Deep4IT srl. Tutti i diritti riservati.  |  Capitale sociale: € 70.000,00  |  P.IVA: 13477300969',
    },
  },
  en: {
    nav: [
      { label: 'The technology', href: '#tecnologia' },
      { label: 'Products', href: '#prodotti' },
      { label: 'Clients', href: '#clienti' },
    ],
    navCta: 'Get in touch',
    hero: {
      titleLines: ['Memory for', 'AI agents.'],
      lead: 'A retrieval engine that maximises recall.',
      intro:
        'Deep4IT builds the memory of AI agents: it retrieves what was said in conversations and what is written in documents and code, without losing anything that matters.',
      how:
        'Retrieval does not go through an LLM’s interpretation. Lexical, syntactic and semantic analysers make it deterministic, measurable and compliant with the requirements of regulated industries.',
      pillars: ['Maximum recall', 'Deterministic retrieval', 'Provable compliance'],
      cta: { label: 'The products', href: '#prodotti' },
      ctaSecondary: { label: 'Get in touch', href: '#contatti' },
      scrollHint: 'Scroll',
    },
    technology: {
      index: '01',
      label: 'The technology',
      title: 'Deterministic retrieval. Maximum recall.',
      items: [
        {
          title: 'Maximum recall.',
          body:
            'Not one relevant piece: every necessary piece, including the exceptions and conditions written elsewhere. Recall is measured on questions with known answers, and it is the number we optimise.',
        },
        {
          title: 'No LLM in retrieval.',
          body:
            'Lexical, syntactic and semantic analysers build and query the memory. The same data always gives the same result: retrieval is deterministic and repeatable.',
        },
        {
          title: 'Measurable quality.',
          body:
            'Every answer carries the trail of what it retrieved and why. It can be verified, compared and improved with numbers, not impressions.',
        },
        {
          title: 'Provable compliance.',
          body:
            'Every element of the memory stays tied to its origin: a conversation, a document or a line of code. Born for central banks, payment systems and defence systems.',
        },
      ],
    },
    products: {
      index: '02',
      label: 'The products',
      title: 'Two products apply the same technology.',
      items: [
        {
          name: 'Juno',
          kicker: 'Memory for employees',
          body:
            'AI assistants on WhatsApp and Teams that use the memory of conversations and of legal document bases on employment law.',
          cta: { label: 'ojuno.ai', href: JUNO_URL },
        },
        {
          name: 'Ormentis',
          kicker: 'Memory for product development',
          body:
            'Memory from the client’s own document bases and code, for product development in financial services. For people and agents, with plugins for Claude Code and Codex.',
          cta: { label: 'ormentis.com', href: ORMENTIS_URL },
        },
      ],
    },
    credibility: {
      index: '03',
      label: 'Deep4IT',
      title: 'Clients and innovation track record.',
      body: 'A research lab based in Monza, incubated at Politecnico di Milano.',
      clientsLabel: 'Our clients include',
      clients: clientLogos,
      innovationLabel: 'Innovation track record',
      innovation:
        'Our innovation track record includes a grant and the win of a competition awarded by Deloitte, incubation at Politecnico di Milano and acceleration with Le Village.',
      logos: innovationLogos,
    },
    footer: {
      contactsLabel: 'Contact',
      lines: ['Via Italia, 44', '20900 Monza, Italy'],
      email: 'info@deep4it.com',
      legal:
        '© 2026 Deep4IT srl. All rights reserved.  |  Share capital: € 70,000.00  |  VAT: 13477300969',
    },
  },
};
