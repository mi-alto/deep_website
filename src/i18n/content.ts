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

/** Copy for the "how Indexable works" motion graphic (Layer section). */
export interface MotionCopy {
  label: string;
  ariaLabel: string;
  controls: { play: string; pause: string; replay: string; goTo: string };
  introSub: string;
  steps: { eyebrow: string; title: string; caption: string; short: string }[];
  sentence: {
    header: string;
    /** each word with the index of its role in `roles` */
    words: [string, number][];
    roles: string[];
    /** claim formula tokens, colored by role index (-1 = neutral, 5 = modality) */
    claim: [string, number][];
  };
  docs: string[];
  sourcesLine: string;
  nodes: string[];
  modality: { obligation: string; permission: string };
  reqs: { id: string; text: string; source: string; permission?: boolean }[];
  chips: { ok: string; conflict: string; covered: string; missing: string };
  conflict: [string, string, string];
  reqsLabel: string;
  plugin: { tabs: [string, string]; header: string; q1: string; call1: string; answer: string; source: string; q2: string; call2: string; done: string; versus: [string, string, string] };
  modules: { label: string; families: { name: string; items: string[] }[] };
  change: { tag: string; text: string; impactLabel: string; impacts: string[] };
  summaryCheck: string;
  summaryCode: string;
  missingComment: string;
  outroLine: string;
  outroChain: string;
  proof: {
    questionLabel: string;
    question: string;
    genLabel: string;
    ixLabel: string;
    genAnswers: [string, string, string];
    ixAnswer: string;
    genVerdict: string;
    ixVerdict: string;
    traceLabel: string;
    graphLabel: string;
    traceSource: string;
  };
}

/** "Why trust it" block under the animation: repeatable, auditable, built for regulated industries. */
export interface TrustCopy {
  label: string;
  title: string;
  lead: string;
  pillars: CapabilityItem[];
  table: { caption: string; head: [string, string, string]; rows: [string, string, string][] };
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
    motion: MotionCopy;
    trust: TrustCopy;
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
  { src: '/images/villanova-ai.webp', alt: 'Villanova.AI', note: 'Gruppo Tiscali' },
  { src: '/images/nexi.svg', alt: 'Nexi', note: 'Gruppo Nexi' },
];

const innovationLogos: LogoItem[] = [
  { src: '/images/deloitte.webp', alt: 'Deloitte' },
  { src: '/images/polihub.webp', alt: 'PoliHub — Politecnico di Milano' },
  { src: '/images/levillage.webp', alt: 'Le Village' },
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
      motion: {
        label: 'Come funziona',
        ariaLabel:
          'Animazione: come funziona Indexable, dall’estrazione grammaticale alla verifica del codice',
        controls: { play: 'Riproduci', pause: 'Pausa', replay: 'Da capo', goTo: 'Vai al passaggio' },
        introSub: 'DAI DOCUMENTI ALLA BASE DI CONOSCENZA',
        steps: [
          {
            eyebrow: '01 / 07 · Estrazione grammaticale',
            title: 'Analizza il linguaggio',
            caption: 'Specifiche, verbali, requisiti, manuali e codice: ogni frase diventa un insieme di affermazioni elementari, chi deve fare cosa e a quale condizione.',
            short: 'Linguaggio',
          },
          {
            eyebrow: '02 / 07 · Grafo della conoscenza del prodotto',
            title: 'Costruisci il grafo',
            caption: 'Tutte le fonti diventano un grafo semantico del prodotto o del servizio: una base di conoscenza per persone e agenti, dove ogni elemento conserva la sua fonte.',
            short: 'Grafo',
          },
          {
            eyebrow: '03 / 07 · Plugin per Claude Code e Codex',
            title: 'Indexable nei tuoi agenti',
            caption: 'Un agente con Indexable batte un agente a cui carichi i documenti: risponde con la fonte e scrive le modifiche con i requisiti giusti.',
            short: 'Plugin',
          },
          {
            eyebrow: '04 / 07 · Servizi',
            title: 'Una base, tanti servizi',
            caption: 'Sulla stessa base di conoscenza, per persone e agenti: conoscere il prodotto, verificare, gestire i cambiamenti, collaudare.',
            short: 'Servizi',
          },
          {
            eyebrow: '05 / 07 · Impatto dei cambiamenti',
            title: 'Valuta una Change Request',
            caption: 'Arriva una richiesta di modifica: la base di conoscenza mostra subito quali requisiti, parti di codice e test sono coinvolti.',
            short: 'Cambiare',
          },
          {
            eyebrow: '06 / 07 · Coerenza e completezza',
            title: 'Verifica i requisiti',
            caption: 'Controlli deterministici, senza AI generativa: contraddizioni e lacune emergono prima di scrivere una riga di codice.',
            short: 'Verificare',
          },
          {
            eyebrow: '07 / 07 · Ripetibile e verificabile',
            title: 'Stessa risposta, ogni volta',
            caption: 'Fai tre volte la stessa domanda: un sistema solo generativo può rispondere in tre modi diversi. Indexable dà sempre la stessa risposta, e ti mostra da dove viene.',
            short: 'Ripetibile',
          },
        ],
        sentence: {
          header: 'SPECIFICA v2.3  ·  §4.5 VALIDAZIONE DEL MANDATO',
          words: [
            ['La', 0], ['banca', 0], ['del', 0], ['debitore', 0], ['deve', 1], ['rifiutare', 2], ['il', 3], ['mandato', 3],
            ['se', 4], ['manca', 4], ['la', 4], ['data', 4], ['di', 4], ['firma.', 4],
          ],
          roles: ['CHI AGISCE', 'OBBLIGO', 'AZIONE', 'OGGETTO', 'CONDIZIONE'],
          claim: [
            ['c-014 = ', -1], ['obbligo', 1], ['(', -1], ['banca_debitore', 0], [', ', -1], ['rifiuta', 2], [', ', -1],
            ['mandato', 3], [' | ', -1], ['data_firma = null', 4], [')', -1],
          ],
        },
        docs: ['SPECIFICHE', 'VERBALI', 'REQUISITI', 'MANUALI', 'CODICE'],
        sourcesLine: 'SPECIFICHE  ·  VERBALI  ·  REQUISITI  ·  MANUALI  ·  CODICE',
        nodes: [
          'rifiuta mandato', 'banca debitore', 'mandato', 'data di firma', 'creditore', 'invia incasso', 'scadenza D-1',
          'operatore', 'accetta senza firma', 'avvisa debitore', 'codice di rifiuto', 'stato mandato', 'incasso',
          'registro attività', 'rimborso',
        ],
        modality: { obligation: 'OBBLIGO', permission: 'PERMESSO' },
        reqs: [
          { id: 'REQ-014', text: 'La banca deve rifiutare i mandati senza data di firma.', source: 'FONTE  ·  SPECIFICA v2.3  §4.5' },
          { id: 'REQ-022', text: 'Il creditore deve inviare gli incassi entro la scadenza D-1.', source: 'FONTE  ·  SPECIFICA v2.3  §5.2' },
          { id: 'REQ-031', text: 'Gli operatori possono accettare mandati senza data di firma.', source: 'FONTE  ·  VERBALE 12 MAR 2026', permission: true },
          { id: 'REQ-045', text: 'Ogni rifiuto deve essere comunicato al debitore.', source: 'FONTE  ·  VERBALE 12 MAR 2026' },
        ],
        chips: { ok: 'COERENTE', conflict: 'CONFLITTO', covered: 'COPERTO', missing: 'MANCANTE' },
        conflict: ['CONFLITTO', 'deve rifiutare', 'vs può accettare'],
        reqsLabel: 'REQUISITI RICAVATI DALLA BASE DI CONOSCENZA  ·  CONTROLLO DETERMINISTICO',
        plugin: {
          tabs: ['CLAUDE CODE', 'CODEX'],
          header: 'PLUGIN INDEXABLE',
          q1: 'Quando va rifiutato un mandato?',
          call1: 'interroga la base di conoscenza',
          answer: 'Quando manca la data di firma.',
          source: 'FONTE  ·  SPECIFICA v2.3  §4.5',
          q2: 'Aggiungi il controllo in MandateValidator.java',
          call2: 'requisiti collegati: REQ-014, REQ-022',
          done: 'L’agente scrive la modifica con i requisiti giusti.',
          versus: ['Agente + Indexable', '  batte  ', 'agente + documenti caricati'],
        },
        modules: {
          label: 'UNA BASE DI CONOSCENZA, PER PERSONE E AGENTI',
          families: [
            { name: 'Conoscere', items: ['Domande sul prodotto', 'Passaggio di consegne'] },
            { name: 'Verificare', items: ['Coerenza e completezza', 'Requisiti e codice'] },
            { name: 'Cambiare', items: ['Impatto delle Change Request', 'Confronto con RFI e RFP', 'Analisi funzionale e tecnica'] },
            { name: 'Collaudare', items: ['Verifica del testbook', 'Creazione del testbook'] },
          ],
        },
        change: {
          tag: 'CHANGE REQUEST  ·  CR-07',
          text: 'Accettare mandati con firma digitale.',
          impactLabel: 'IMPATTO',
          impacts: ['12 requisiti da rivedere', '2 conflitti con i verbali', '9 componenti di codice', '123 test da rifare'],
        },
        summaryCheck: '4 REQUISITI  ·  3 COERENTI  ·  1 CONFLITTO',
        summaryCode: '2 COPERTI  ·  1 MANCANTE  ·  3 TEST GENERATI',
        missingComment: '// nessuna chiamata a notifyDebtor()',
        outroLine: 'AI spiegabile e verificabile per i settori regolamentati.',
        outroChain: 'PER PERSONE E AGENTI  ·  RIPETIBILE  ·  VERIFICABILE',
        proof: {
          questionLabel: 'LA STESSA DOMANDA, FATTA TRE VOLTE',
          question: 'Quando va rifiutato un mandato?',
          genLabel: 'SOLO AI GENERATIVA',
          ixLabel: 'INDEXABLE',
          genAnswers: ['Quando manca la firma.', 'Quando i dati sono incompleti.', 'Si può accettare comunque.'],
          ixAnswer: 'Quando manca la data di firma.',
          genVerdict: '3 risposte diverse',
          ixVerdict: 'Sempre la stessa risposta',
          traceLabel: 'DA DOVE VIENE LA RISPOSTA?',
          graphLabel: 'dalla base di conoscenza',
          traceSource: 'SPECIFICA v2.3  ·  §4.5',
        },
      },
      trust: {
        label: 'Perché fidarsi',
        title: 'AI spiegabile e verificabile per i settori regolamentati.',
        lead:
          'Molti strumenti costruiscono un “cervello aziendale” tutto su AI generativa: la stessa domanda può avere risposte diverse, e non sempre si sa da dove vengono. Indexable è un’AI spiegabile e verificabile. La lettura dei documenti, la base di conoscenza e i controlli sono deterministici e ripetibili. L’AI generativa interviene in un solo punto, la stesura dei requisiti, e lavora dentro i confini della base di conoscenza.',
        pillars: [
          {
            title: 'Ripetibile.',
            body:
              'Estrazione, base di conoscenza e controlli di coerenza non usano AI generativa: a parità di fonti il risultato è sempre lo stesso, oggi come tra un anno. Quando un documento cambia, vedi cosa cambia e perché.',
          },
          {
            title: 'Auditabile.',
            body:
              'Ogni affermazione, requisito e conflitto è collegato alla frase del documento o alla riga di codice da cui nasce. Un revisore ripercorre tutto il ragionamento, passo dopo passo.',
          },
          {
            title: 'AI generativa sotto controllo.',
            body:
              'L’AI generativa serve solo a stendere i requisiti e lavora dentro la base di conoscenza. Ogni requisito resta collegato alle sue fonti e deve superare i controlli deterministici prima di essere accettato.',
          },
          {
            title: 'Pensato per i settori regolamentati.',
            body:
              'Nato sulle specifiche di banche centrali, sistemi di pagamento e sistemi di difesa, dove una risposta che non si può spiegare non ha valore.',
          },
        ],
        table: {
          caption: 'Il confronto',
          head: ['', 'Solo AI generativa', 'Indexable'],
          rows: [
            ['Stessa domanda, due volte', 'Può dare risposte diverse', 'Stessa risposta, dalla base di conoscenza'],
            ['Da dove viene la risposta', 'Non sempre dichiarato', 'Fonte esatta, per ogni affermazione'],
            ['Controllo dei requisiti', 'Probabilistico', 'Deterministico, con regole esplicite'],
            ['Controllo di un revisore', 'Difficile da ricostruire', 'Percorso completo e verificabile'],
            ['Cambia un documento', 'Si riparte da capo', 'Si vede cosa cambia e dove'],
          ],
        },
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
      motion: {
        label: 'How it works',
        ariaLabel: 'Animation: how Indexable works, from grammatical extraction to code verification',
        controls: { play: 'Play', pause: 'Pause', replay: 'Replay', goTo: 'Go to step' },
        introSub: 'FROM DOCUMENTS TO A KNOWLEDGE BASE',
        steps: [
          {
            eyebrow: '01 / 07 · Grammatical extraction',
            title: 'Parse the language',
            caption: 'Specs, minutes, requirements, manuals and code: every sentence becomes atomic claims, who must do what, under which condition.',
            short: 'Language',
          },
          {
            eyebrow: '02 / 07 · Product knowledge graph',
            title: 'Build the graph',
            caption: 'Every source becomes a semantic graph of your product or service: a knowledge base for people and agents, where every item keeps its source.',
            short: 'Graph',
          },
          {
            eyebrow: '03 / 07 · Plugin for Claude Code and Codex',
            title: 'Indexable in your agents',
            caption: 'An agent with Indexable beats an agent you just feed documents to: it answers with the source and writes changes with the right requirements.',
            short: 'Plugin',
          },
          {
            eyebrow: '04 / 07 · Services',
            title: 'One base, many services',
            caption: 'On the same knowledge base, for people and agents: know the product, verify, manage change, test.',
            short: 'Services',
          },
          {
            eyebrow: '05 / 07 · Change impact',
            title: 'Assess a Change Request',
            caption: 'A change request comes in: the knowledge base instantly shows which requirements, code and tests are affected.',
            short: 'Change',
          },
          {
            eyebrow: '06 / 07 · Consistency and completeness',
            title: 'Verify the requirements',
            caption: 'Deterministic checks, no generative AI: contradictions and gaps surface before anyone writes a line of code.',
            short: 'Verify',
          },
          {
            eyebrow: '07 / 07 · Repeatable and traceable',
            title: 'Same answer, every time',
            caption: 'Ask the same question three times: a generative-only system may answer three different ways. Indexable always gives the same answer, and shows you where it comes from.',
            short: 'Repeatable',
          },
        ],
        sentence: {
          header: 'SPECIFICATION v2.3  ·  §4.5 MANDATE VALIDATION',
          words: [
            ['The', 0], ['debtor', 0], ['bank', 0], ['shall', 1], ['reject', 2], ['the', 3], ['mandate', 3],
            ['if', 4], ['the', 4], ['signature', 4], ['date', 4], ['is', 4], ['missing.', 4],
          ],
          roles: ['AGENT', 'OBLIGATION', 'ACTION', 'OBJECT', 'CONDITION'],
          claim: [
            ['c-014 = ', -1], ['obligation', 1], ['(', -1], ['debtor_bank', 0], [', ', -1], ['reject', 2], [', ', -1],
            ['mandate', 3], [' | ', -1], ['signature_date = null', 4], [')', -1],
          ],
        },
        docs: ['SPECS', 'MINUTES', 'REQUIREMENTS', 'MANUALS', 'CODE'],
        sourcesLine: 'SPECS  ·  MINUTES  ·  REQUIREMENTS  ·  MANUALS  ·  CODE',
        nodes: [
          'reject mandate', 'debtor bank', 'mandate', 'signature date', 'creditor', 'submit collection', 'D-1 cut-off',
          'operator', 'accept w/o signature', 'notify debtor', 'rejection code', 'mandate status', 'collection',
          'audit log', 'refund',
        ],
        modality: { obligation: 'OBLIGATION', permission: 'PERMISSION' },
        reqs: [
          { id: 'REQ-014', text: 'Debtor bank shall reject mandates with no signature date.', source: 'SOURCE  ·  SPEC v2.3  §4.5' },
          { id: 'REQ-022', text: 'Creditor shall submit collections before the D-1 cut-off.', source: 'SOURCE  ·  SPEC v2.3  §5.2' },
          { id: 'REQ-031', text: 'Operators may accept mandates without a signature date.', source: 'SOURCE  ·  MINUTES  12 MAR 2026', permission: true },
          { id: 'REQ-045', text: 'Every rejection shall be notified to the debtor.', source: 'SOURCE  ·  MINUTES  12 MAR 2026' },
        ],
        chips: { ok: 'CONSISTENT', conflict: 'CONFLICT', covered: 'COVERED', missing: 'MISSING' },
        conflict: ['CONFLICT', 'shall reject', 'vs may accept'],
        reqsLabel: 'REQUIREMENTS DERIVED FROM THE KNOWLEDGE BASE  ·  DETERMINISTIC CHECK',
        plugin: {
          tabs: ['CLAUDE CODE', 'CODEX'],
          header: 'INDEXABLE PLUGIN',
          q1: 'When must a mandate be rejected?',
          call1: 'querying the knowledge base',
          answer: 'When the signature date is missing.',
          source: 'SOURCE  ·  SPEC v2.3  §4.5',
          q2: 'Add the check to MandateValidator.java',
          call2: 'linked requirements: REQ-014, REQ-022',
          done: 'The agent writes the change with the right requirements.',
          versus: ['Agent + Indexable', '  beats  ', 'agent + uploaded documents'],
        },
        modules: {
          label: 'ONE KNOWLEDGE BASE, FOR PEOPLE AND AGENTS',
          families: [
            { name: 'Know', items: ['Product questions', 'Team handover'] },
            { name: 'Verify', items: ['Consistency and completeness', 'Requirements vs code'] },
            { name: 'Change', items: ['Change Request impact', 'RFI and RFP gap analysis', 'Functional and technical analysis'] },
            { name: 'Test', items: ['Test book review', 'Test book creation'] },
          ],
        },
        change: {
          tag: 'CHANGE REQUEST  ·  CR-07',
          text: 'Accept mandates with a digital signature.',
          impactLabel: 'IMPACT',
          impacts: ['12 requirements to review', '2 conflicts with the minutes', '9 code components', '123 tests to redo'],
        },
        summaryCheck: '4 REQUIREMENTS  ·  3 CONSISTENT  ·  1 CONFLICT',
        summaryCode: '2 COVERED  ·  1 MISSING  ·  3 TESTS GENERATED',
        missingComment: '// no call to notifyDebtor() found',
        outroLine: 'Explainable, auditable AI for regulated industries.',
        outroChain: 'FOR PEOPLE AND AGENTS  ·  REPEATABLE  ·  TRACEABLE',
        proof: {
          questionLabel: 'THE SAME QUESTION, ASKED THREE TIMES',
          question: 'When must a mandate be rejected?',
          genLabel: 'GENERATIVE AI ONLY',
          ixLabel: 'INDEXABLE',
          genAnswers: ['When the signature is missing.', 'When the data is incomplete.', 'It can be accepted anyway.'],
          ixAnswer: 'When the signature date is missing.',
          genVerdict: '3 different answers',
          ixVerdict: 'Always the same answer',
          traceLabel: 'WHERE DOES THE ANSWER COME FROM?',
          graphLabel: 'from the knowledge base',
          traceSource: 'SPECIFICATION v2.3  ·  §4.5',
        },
      },
      trust: {
        label: 'Why you can trust it',
        title: 'Explainable, auditable AI for regulated industries.',
        lead:
          'Many tools build a “company brain” entirely on generative AI: the same question can get different answers, and it is not always clear where they come from. Indexable is explainable, auditable AI. Reading the documents, the knowledge base and the checks are deterministic and repeatable. Generative AI is used at one point only, writing requirements, and works within the bounds of the knowledge base.',
        pillars: [
          {
            title: 'Repeatable.',
            body:
              'Extraction, knowledge base and consistency checks use no generative AI: given the same sources, the result is always the same, today or a year from now. When a document changes, you see what changes and why.',
          },
          {
            title: 'Auditable.',
            body:
              'Every statement, requirement and conflict is linked to the sentence in a document or the line of code it comes from. A reviewer can retrace the whole reasoning, step by step.',
          },
          {
            title: 'Generative AI, kept in check.',
            body:
              'Generative AI is used only to write requirements, and works inside the knowledge base. Every requirement stays linked to its sources and must pass the deterministic checks before it is accepted.',
          },
          {
            title: 'Built for regulated industries.',
            body:
              'Born on specifications for central banks, payment systems and defence systems, where an answer that cannot be explained has no value.',
          },
        ],
        table: {
          caption: 'The comparison',
          head: ['', 'Generative AI only', 'Indexable'],
          rows: [
            ['Same question, twice', 'May give different answers', 'Same answer, from the knowledge base'],
            ['Where the answer comes from', 'Not always stated', 'Exact source, for every statement'],
            ['Checking requirements', 'Probabilistic', 'Deterministic, with explicit rules'],
            ['An auditor’s review', 'Hard to reconstruct', 'Complete, verifiable trail'],
            ['A document changes', 'Start over', 'See what changes, and where'],
          ],
        },
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
