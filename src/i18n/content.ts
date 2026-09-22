export type Lang = 'it' | 'en';

export interface CapabilityItem {
  title: string;
  body: string;
}

export interface CapabilitySection {
  index: string;
  label: string;
  title: string;
  kicker: string;
  subtitle: string;
  items: CapabilityItem[];
}

export interface LogoItem {
  src: string;
  alt: string;
  note?: string;
}

export interface Content {
  nav: { label: string; href: string }[];
  navCta: string;
  hero: {
    audience: [string, string];
    titleLines: string[];
    lead: string;
    intro: string;
    compass: { label: string; body: string }[];
    outro: string;
    cta: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
    scrollHint: string;
  };
  problem: {
    index: string;
    label: string;
    title: string;
    items: { question: string; body: string }[];
  };
  businessCapabilities: CapabilitySection;
  techCapabilities: CapabilitySection;
  indexable: {
    index: string;
    label: string;
    title: string;
    intro: string;
    capabilities: CapabilityItem[];
    diagram: {
      sources: string;
      name: string;
      ops: string;
      output: string;
      consumers: string;
    };
  };
  projects: {
    index: string;
    label: string;
    title: string;
    results: string[];
    itemsLabel: string;
    items: CapabilityItem[];
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
  about: {
    index: string;
    label: string;
    headline: string;
    choices: CapabilityItem[];
    cta: { label: string; href: string };
    tagline: string;
    contacts: {
      label: string;
      lines: string[];
      email: string;
      legal: string;
    };
  };
}

/* Villanova.AI is the Tiscali group company we work with: the logo carries the
   brand, the caption carries the group named in the copy. */
const clientLogos: LogoItem[] = [
  { src: '/images/villanova-ai.png', alt: 'Villanova.AI', note: 'Gruppo Tiscali' },
  { src: '/images/nexi.svg', alt: 'Nexi', note: 'Gruppo Nexi' },
];

const innovationLogos: LogoItem[] = [
  { src: '/images/deloitte.png', alt: 'Deloitte' },
  { src: '/images/polihub.webp', alt: 'PoliHub — Politecnico di Milano' },
  { src: '/images/levillage.png', alt: 'Le Village' },
];

export const content: Record<Lang, Content> = {
  it: {
    nav: [
      { label: 'Il prodotto', href: '#prodotto' },
      { label: 'Business & IT', href: '#business-it' },
      { label: 'Indexable', href: '#indexable' },
      { label: 'Progetti', href: '#progetti' },
      { label: 'Deep4IT', href: '#deep4it' },
    ],
    navCta: 'Contattaci',
    hero: {
      audience: ['Per chi decide il cambiamento', 'Per chi lo realizza'],
      titleLines: ['Accelerate and', 'de-risk change.'],
      lead: 'Fai evolvere i tuoi prodotti più velocemente e in sicurezza.',
      intro:
        'Indexable è la tecnologia AI di Deep4IT che amplifica la conoscenza dei tuoi prodotti digitali e la trasforma in decisioni concrete.',
      compass: [
        { label: 'La direzione', body: 'quali obiettivi raggiungere e come misurare i risultati.' },
        { label: 'La rotta', body: 'cosa preservare e quali cambiamenti introdurre per generare valore.' },
      ],
      outro:
        'Lo usa il tuo team per accelerare i deliverable e ridurne il rischio, oppure lo usiamo noi per te, su un perimetro di progetto concordato.',
      cta: { label: 'Portaci un cambiamento da realizzare', href: '#deep4it' },
      ctaSecondary: { label: 'Scopri Indexable', href: '#indexable' },
      scrollHint: 'Scorri',
    },
    problem: {
      index: '01',
      label: 'Il tuo prodotto digitale, sotto controllo',
      title: 'Costruisci la conoscenza del tuo prodotto.',
      items: [
        {
          question: 'Conosci davvero il tuo prodotto digitale?',
          body:
            'Documentazione obsoleta, incompleta o assente, e chi la conosceva davvero ha lasciato l’azienda: sapere cosa fa il prodotto diventa difficile. Ricostruisci funzionalità, regole ed eccezioni per partire da una conoscenza condivisa e verificabile.',
        },
        {
          question: 'Quanto puoi fidarti della sua qualità?',
          body:
            'Requisiti incompleti, regole in conflitto e implementazioni incoerenti possono lasciare problemi nascosti. Fai emergere le lacune e verifica che ciò che il prodotto fa corrisponda a ciò che deve fare.',
        },
        {
          question: 'Come puoi farlo evolvere in sicurezza?',
          body:
            'Ogni modifica può coinvolgere funzionalità, regole e sistemi collegati. Comprendi gli impatti, chiarisci cosa preservare e definisci come verificare il risultato, per realizzare il cambiamento più velocemente e con meno rischi.',
        },
      ],
    },
    businessCapabilities: {
      index: '02',
      label: 'Business & IT',
      title: 'Decisioni più solide. Meno sorprese su tempi e budget.',
      kicker: 'Per chi guida il business',
      subtitle: 'Requisiti chiari. Impatti visibili. Risultati verificabili.',
      items: [
        {
          title: 'Genera e verifica i requisiti.',
          body:
            'Trasforma le esigenze in requisiti strutturati e verifica la coerenza dei documenti, facendo emergere contraddizioni, funzioni mancanti e passaggi scoperti.',
        },
        {
          title: 'Anticipa ciò che fa crescere tempi e costi.',
          body:
            'Valuta l’impatto di ogni cambiamento: quali funzionalità devono essere modificate, quali potrebbero andare perse e quali nuove richieste sono incompatibili con il funzionamento attuale del prodotto.',
        },
        {
          title: 'Verifica che il risultato corrisponda alle attese.',
          body:
            'Definisci un piano di controlli e test automatizzati collegati ai requisiti, per verificare cosa è stato realizzato e individuare ciò che manca.',
        },
      ],
    },
    techCapabilities: {
      index: '03',
      label: 'Business & IT',
      title: 'Consegne più solide. Meno sorprese in produzione.',
      kicker: 'Per chi realizza la tecnologia',
      subtitle: 'Requisiti coerenti. Codice verificato. Test automatizzati.',
      items: [
        {
          title: 'Verifica la qualità dei requisiti.',
          body:
            'Individua ambiguità, contraddizioni, duplicazioni e lacune, per rendere ogni requisito chiaro, coerente e verificabile.',
        },
        {
          title: 'Comprendi il codice e l’impatto dei cambiamenti.',
          body:
            'Esplora l’implementazione e collega i requisiti ai componenti coinvolti, per capire dove intervenire e quali dipendenze considerare.',
        },
        {
          title: 'Verifica che il codice risponda ai requisiti.',
          body:
            'Confronta l’implementazione con i comportamenti attesi e fai emergere funzionalità mancanti, regole non rispettate e discrepanze.',
        },
        {
          title: 'Genera piani di test e test automatizzati dai requisiti.',
          body:
            'Deriva automaticamente i casi di test e le relative automazioni, con controlli deterministici, ripetibili e tracciabili al requisito di origine.',
        },
      ],
    },
    indexable: {
      index: '04',
      label: 'Indexable',
      title: 'Indexable: consolida o costruisci la conoscenza dei tuoi prodotti e servizi.',
      intro:
        'Indexable è la nostra tecnologia AI proprietaria che collega documentazione e codice per ricostruire come funziona il tuo prodotto, con informazioni verificabili nelle fonti originali.',
      capabilities: [
        {
          title: 'Ricostruisci come funziona il prodotto e come può evolvere.',
          body:
            'Metti in relazione ciò che è descritto nei documenti, deciso nelle riunioni e realizzato nel codice. Individua i conflitti esistenti e simula l’introduzione di nuove funzionalità per valutarne gli impatti e le incompatibilità con quelle attuali.',
        },
        {
          title: 'Risali alle fonti.',
          body: 'Consulta il documento o il codice da cui deriva un’informazione, per verificarla e approfondirla.',
        },
        {
          title: 'Parti da una base comune per ogni cambiamento.',
          body:
            'Usa la conoscenza del prodotto per definire requisiti coerenti, verificare l’implementazione e generare piani di test e test automatizzati.',
        },
      ],
      diagram: {
        sources: 'Documenti · Verbali di riunione · Specifiche · Manuali · Procedure · Codice',
        name: 'Indexable',
        ops: 'Collega le informazioni e le riconduce alle fonti.',
        output: 'Funzionalità · Regole · Requisiti · Dipendenze',
        consumers: 'Una base di conoscenza consultabile da persone e agenti AI.',
      },
    },
    projects: {
      index: '05',
      label: 'Progetti reali',
      title: 'Indexable è già utilizzato su sistemi complessi.',
      results: [
        'Documentazione consolidata in 1,5 mesi rispetto ai 3,5–4 previsti.',
        'Un prodotto realizzato in 3 mesi rispetto ai 15 previsti.',
      ],
      itemsLabel: 'Tre esempi di applicazione',
      items: [
        {
          title: 'Sistema di pagamento nazionale',
          body:
            'Consolidamento delle specifiche e produzione della documentazione funzionale, con ogni requisito collegato alla fonte di origine.',
        },
        {
          title: 'Sistema antiriciclaggio di banca centrale',
          body:
            'Consolidamento dei requisiti di una piattaforma AML: regole, funzionalità e integrazioni organizzate in una base di conoscenza verificabile e aggiornabile.',
        },
        {
          title: 'Sistemi di controllo',
          body:
            'Creazione assistita di manuali e documentazione tecnica, con revisione e validazione da parte degli esperti.',
        },
      ],
    },
    credibility: {
      index: '06',
      label: 'Deep4IT',
      title: 'Costruita sulla ricerca. Applicata a esigenze reali.',
      body:
        'Uniamo tecnologia AI proprietaria ed esperienza nella realizzazione di prodotti e servizi complessi.',
      clientsLabel: 'Tra i nostri clienti',
      clients: clientLogos,
      innovationLabel: 'Percorso di innovazione',
      innovation:
        'Il nostro percorso di innovazione comprende un grant e la vittoria di una competizione con premiazione da parte di Deloitte, l’incubazione presso il Politecnico di Milano e l’accelerazione con Le Village.',
      logos: innovationLogos,
    },
    about: {
      index: '07',
      label: 'Il prossimo passo',
      headline: 'Adotta Indexable nel tuo team. Oppure affida a noi il progetto.',
      choices: [
        {
          title: 'Usalo con il tuo team.',
          body: 'Porta Indexable nel lavoro di analisi, sviluppo e verifica dei tuoi prodotti.',
        },
        {
          title: 'Ci pensiamo noi.',
          body:
            'Affidaci un’esigenza concreta: consolidare la documentazione, definire i requisiti, valutare un cambiamento o verificare un’implementazione. Concordiamo il perimetro, i risultati da consegnare e i criteri per verificarli.',
        },
      ],
      cta: {
        label: 'Parliamo del tuo progetto',
        href: 'mailto:info@deep4it.com?subject=Il%20mio%20progetto',
      },
      tagline: 'Dalle intenzioni del business a risultati che puoi verificare.',
      contacts: {
        label: 'Contatti',
        lines: ['Via Italia, 44', '20900 Monza, Italia'],
        email: 'info@deep4it.com',
        legal:
          '© 2026 Deep4IT srl. Tutti i diritti riservati.  |  Capitale sociale: € 70.000,00  |  P.IVA: 13477300969',
      },
    },
  },
  en: {
    nav: [
      { label: 'The product', href: '#prodotto' },
      { label: 'Business & IT', href: '#business-it' },
      { label: 'Indexable', href: '#indexable' },
      { label: 'Projects', href: '#progetti' },
      { label: 'Deep4IT', href: '#deep4it' },
    ],
    navCta: 'Get in touch',
    hero: {
      audience: ['For those who decide the change', 'For those who deliver it'],
      titleLines: ['Accelerate and', 'de-risk change.'],
      lead: 'Make your products evolve faster and more safely.',
      intro:
        'Indexable is Deep4IT’s AI technology that amplifies the knowledge of your digital products and turns it into concrete decisions.',
      compass: [
        { label: 'The direction', body: 'which objectives to reach and how to measure the results.' },
        { label: 'The route', body: 'what to preserve and which changes to introduce to generate value.' },
      ],
      outro:
        'Your team uses it to speed up deliverables and reduce their risk, or we use it for you, on an agreed project scope.',
      cta: { label: 'Bring us a change to deliver', href: '#deep4it' },
      ctaSecondary: { label: 'Discover Indexable', href: '#indexable' },
      scrollHint: 'Scroll',
    },
    problem: {
      index: '01',
      label: 'Your digital product, under control',
      title: 'Build your product knowledge.',
      items: [
        {
          question: 'Do you really know your digital product?',
          body:
            'Outdated, incomplete or missing documentation, and the people who really knew it have left the company: knowing what the product actually does gets hard. Rebuild features, rules and exceptions to start from shared, verifiable knowledge.',
        },
        {
          question: 'How much can you trust its quality?',
          body:
            'Incomplete requirements, conflicting rules and inconsistent implementations can leave hidden problems. Surface the gaps and verify that what the product does matches what it should do.',
        },
        {
          question: 'How can you evolve it safely?',
          body:
            'Every change can involve related features, rules and systems. Understand the impacts, clarify what to preserve and define how to verify the result, to deliver change faster and with less risk.',
        },
      ],
    },
    businessCapabilities: {
      index: '02',
      label: 'Business & IT',
      title: 'Stronger decisions. Fewer surprises on time and budget.',
      kicker: 'For business leaders',
      subtitle: 'Clear requirements. Visible impacts. Verifiable results.',
      items: [
        {
          title: 'Generate and verify requirements.',
          body:
            'Turn needs into structured requirements and check document consistency, surfacing contradictions, missing functions and uncovered steps.',
        },
        {
          title: 'Anticipate what drives up time and cost.',
          body:
            'Assess the impact of every change: which features need to change, which ones could be lost, and which new requests are incompatible with how the product currently works.',
        },
        {
          title: 'Verify that the result matches expectations.',
          body:
            'Define a plan of checks and automated tests linked to requirements, to verify what has been built and spot what is missing.',
        },
      ],
    },
    techCapabilities: {
      index: '03',
      label: 'Business & IT',
      title: 'Stronger releases. Fewer surprises in production.',
      kicker: 'For technology teams',
      subtitle: 'Consistent requirements. Verified code. Automated tests.',
      items: [
        {
          title: 'Verify requirement quality.',
          body:
            'Spot ambiguities, contradictions, duplications and gaps, to make every requirement clear, consistent and verifiable.',
        },
        {
          title: 'Understand the code and the impact of changes.',
          body:
            'Explore the implementation and link requirements to the components involved, to know where to intervene and which dependencies to consider.',
        },
        {
          title: 'Verify that the code matches the requirements.',
          body:
            'Compare the implementation against expected behaviours and surface missing functionality, unmet rules and discrepancies.',
        },
        {
          title: 'Generate test plans and automated tests from requirements.',
          body:
            'Automatically derive test cases and their automations, with deterministic, repeatable checks traceable back to the originating requirement.',
        },
      ],
    },
    indexable: {
      index: '04',
      label: 'Indexable',
      title: 'Indexable: consolidate or build your product and service knowledge.',
      intro:
        'Indexable is our proprietary AI technology that links documentation and code to reconstruct how your product works, with information verifiable against its original sources.',
      capabilities: [
        {
          title: 'Reconstruct how the product works and how it can evolve.',
          body:
            'Connect what is described in documents, decided in meetings and implemented in code. Spot existing conflicts and simulate the introduction of new features to assess their impact and incompatibilities with the current ones.',
        },
        {
          title: 'Trace it back to the source.',
          body: 'Open the document or the code a piece of information comes from, to verify it and dig deeper.',
        },
        {
          title: 'Start every change from a common base.',
          body:
            'Use product knowledge to define consistent requirements, verify the implementation and generate test plans and automated tests.',
        },
      ],
      diagram: {
        sources: 'Documents · Meeting minutes · Specifications · Manuals · Procedures · Code',
        name: 'Indexable',
        ops: 'Connects information and traces it back to its sources.',
        output: 'Features · Rules · Requirements · Dependencies',
        consumers: 'A knowledge base people and AI agents can query.',
      },
    },
    projects: {
      index: '05',
      label: 'Real projects',
      title: 'Indexable is already in use on complex systems.',
      results: [
        'Documentation consolidated in 1.5 months against an estimated 3.5–4.',
        'A product delivered in 3 months against an estimated 15.',
      ],
      itemsLabel: 'Three examples in practice',
      items: [
        {
          title: 'National payment system',
          body:
            'Consolidation of the specifications and production of the functional documentation, with every requirement linked to its originating source.',
        },
        {
          title: 'Central bank anti-money-laundering system',
          body:
            'Consolidation of the requirements of an AML platform: rules, features and integrations organised into a verifiable, updatable knowledge base.',
        },
        {
          title: 'Control systems',
          body: 'Assisted creation of manuals and technical documentation, with review and validation by domain experts.',
        },
      ],
    },
    credibility: {
      index: '06',
      label: 'Deep4IT',
      title: 'Built on research. Applied to real needs.',
      body:
        'We combine proprietary AI technology with hands-on experience in delivering complex products and services.',
      clientsLabel: 'Our clients include',
      clients: clientLogos,
      innovationLabel: 'Innovation track record',
      innovation:
        'Our innovation track record includes a grant and the win of a competition awarded by Deloitte, incubation at Politecnico di Milano and acceleration with Le Village.',
      logos: innovationLogos,
    },
    about: {
      index: '07',
      label: 'Next step',
      headline: 'Adopt Indexable in your team. Or hand us the project.',
      choices: [
        {
          title: 'Use it with your team.',
          body: 'Bring Indexable into the analysis, development and verification of your products.',
        },
        {
          title: 'We take care of it.',
          body:
            'Hand us a concrete need: consolidating documentation, defining requirements, assessing a change or verifying an implementation. We agree on the scope, the deliverables and the criteria to verify them.',
        },
      ],
      cta: {
        label: 'Let’s talk about your project',
        href: 'mailto:info@deep4it.com?subject=My%20project',
      },
      tagline: 'From business intent to results you can verify.',
      contacts: {
        label: 'Contact',
        lines: ['Via Italia, 44', '20900 Monza, Italy'],
        email: 'info@deep4it.com',
        legal:
          '© 2026 Deep4IT srl. All rights reserved.  |  Share capital: € 70,000.00  |  VAT: 13477300969',
      },
    },
  },
};
