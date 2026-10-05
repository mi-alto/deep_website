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

/** Copy for the "how Ormentis works" motion graphic (Layer section). */
export interface MotionCopy {
  label: string;
  ariaLabel: string;
  controls: { play: string; pause: string; replay: string; goTo: string; fullscreen: string; close: string };
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
    leftLabel: string;
    rightLabel: string;
    leftTags: [string, string, string];
    rightTags: [string, string, string];
    leftVerdict: string;
    leftSources: string[];
    rightVerdict: string;
    traceLabel: string;
    steps: { label: string; text: string; why?: string }[];
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

/** One product card: the site only introduces it and sends people to the product site. */
export interface ProductItem {
  name: string;
  kicker: string;
  body: string;
  bullets: string[];
  cta: { label: string; href: string; external: boolean };
}

/** One stop on the lab's timeline. */
export interface PathStep {
  when: string;
  title: string;
  body: string;
}

export interface Content {
  nav: { label: string; href: string }[];
  navCta: string;
  /** short line repeated in the marquee band and in the footer */
  marquee: string;
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
    closing: string;
  };
  interactionMemory: CapabilitySection;
  documentMemory: CapabilitySection;
  promises: CapabilitySection;
  /** "How we verify it": the Ormentis walkthrough, kept under its historical key. */
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
  products: {
    index: string;
    label: string;
    title: string;
    intro: string;
    items: ProductItem[];
  };
  path: {
    index: string;
    label: string;
    title: string;
    intro: string;
    steps: PathStep[];
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

/* Product sites. Ormentis has no public address yet: its card points to the contacts. */
const JUNO_URL = 'https://ojuno.ai';
const ORMENTIS_URL = '#contatti';

export const content: Record<Lang, Content> = {
  it: {
    nav: [
      { label: 'La tecnologia', href: '#tecnologia' },
      { label: 'Come si verifica', href: '#verifica' },
      { label: 'I prodotti', href: '#prodotti' },
      { label: 'Il percorso', href: '#percorso' },
      { label: 'Deep4IT', href: '#deep4it' },
    ],
    navCta: 'Contattaci',
    marquee: 'Ricordare, con la fonte',
    hero: {
      audience: ['Laboratorio di ricerca', 'Monza · Politecnico di Milano'],
      titleLines: ['Memoria per le AI,', 'con la fonte.'],
      lead: 'Deep4IT costruisce la tecnologia che permette alle AI e agli agenti di ricordare.',
      intro:
        'Recuperare ciò che è stato detto nelle conversazioni precedenti e ciò che sta scritto nei documenti: con la massima copertura, in maniera auditabile e legata alla fonte.',
      compass: [
        {
          label: 'Memoria dell’interazione',
          body: 'cosa è stato chiesto, risposto, deciso e promesso con una persona o un agente.',
        },
        {
          label: 'Memoria dei documenti e del codice',
          body: 'cosa dicono le fonti scritte: specifiche, verbali, manuali, codice.',
        },
      ],
      outro:
        'Siamo un piccolo laboratorio di ricerca. Due prodotti applicano la nostra tecnologia: Juno e Ormentis, ognuno con il suo sito.',
      cta: { label: 'Cosa studiamo', href: '#tecnologia' },
      ctaSecondary: { label: 'I prodotti', href: '#prodotti' },
      scrollHint: 'Scorri',
    },
    problem: {
      index: '01',
      label: 'La domanda',
      title: 'Il problema è la memoria, non il modello.',
      items: [
        {
          question: 'Cosa ricorda un’AI tra una sessione e l’altra?',
          body:
            'Niente. Ogni conversazione riparte da zero. Quello che una persona ha chiesto, deciso o promesso la settimana scorsa non esiste più, a meno che qualcuno non lo abbia salvato nel modo giusto.',
        },
        {
          question: 'Cosa succede con i documenti caricati alla rinfusa?',
          body:
            'Risposte diverse a ogni esecuzione. Due costruzioni della stessa base di conoscenza, con lo stesso modello, hanno in comune solo un terzo degli elementi. Un pezzo pertinente si trova; tutti i pezzi necessari, no.',
        },
        {
          question: 'Chi può controllare cosa ha usato?',
          body:
            'Quasi nessuno. Senza il legame con la fonte, una risposta che suona bene e una risposta giusta sono indistinguibili. Nei settori regolamentati questo non è accettabile.',
        },
      ],
      closing:
        'La nostra domanda di ricerca: come fa un’AI a ricordare tutto ciò che serve, e a dimostrare da dove viene ciò che ricorda?',
    },
    interactionMemory: {
      index: '02',
      label: 'La tecnologia',
      title: 'Due memorie, lo stesso motore.',
      kicker: 'Memoria dell’interazione',
      subtitle: 'Cosa è stato detto, deciso e promesso.',
      items: [
        {
          title: 'Estrarre i fatti che contano.',
          body:
            'Da una conversazione escono pochi fatti durevoli: una preferenza, una decisione, un impegno preso. Vanno estratti, etichettati e salvati separatamente dalla storia grezza dei messaggi.',
        },
        {
          title: 'Sapere quale compito è aperto.',
          body:
            'Un “sì” si aggancia alla domanda sbagliata se ci sono più domande aperte, e un compito abbandonato non deve pesare quanto uno attivo. Per questo ogni messaggio porta un intento strutturato: argomento, compito, se continua il turno precedente.',
        },
        {
          title: 'Mantenere gli impegni.',
          body:
            'Se l’assistente ha chiesto un documento e la persona ha cambiato argomento, al ritorno deve ricordarlo, non ripartire da zero. Lo abbiamo osservato su casi reali, misurato e corretto.',
        },
      ],
    },
    documentMemory: {
      index: '02',
      label: 'La tecnologia',
      title: 'Due memorie, lo stesso motore.',
      kicker: 'Memoria dei documenti e del codice',
      subtitle: 'Cosa dicono le fonti scritte.',
      items: [
        {
          title: 'Unità elementari, non pagine.',
          body:
            'Ogni frase di una specifica, di un verbale o di un manuale diventa un insieme di affermazioni elementari: chi deve fare cosa, a quale condizione. Il codice entra nella stessa base.',
        },
        {
          title: 'Ogni unità conserva la fonte e il suo peso.',
          body:
            'Il legame con il documento, il paragrafo e la riga resta sempre. E le fonti non valgono tutte uguali: una specifica approvata pesa più di un verbale, e il recupero lo sa.',
        },
        {
          title: 'Stesso grafo dagli stessi documenti.',
          body:
            'La base di conoscenza si costruisce in modo deterministico. Se un documento cambia, si vede esattamente cosa cambia e dove.',
        },
        {
          title: 'Conflitti e lacune emergono.',
          body:
            'Quando due fonti dicono cose diverse, il motore lo dice invece di scegliere in silenzio. Quando manca un pezzo, lo segnala.',
        },
      ],
    },
    promises: {
      index: '03',
      label: 'Le quattro promesse',
      title: 'Ricordare tutto ciò che serve. E poterlo dimostrare.',
      kicker: 'Quello che chiediamo alla nostra tecnologia',
      subtitle: 'Ricordare, organizzare, recuperare: ogni passaggio con una prova.',
      items: [
        {
          title: 'Ricordare, non solo cercare.',
          body:
            'Estrarre le unità che contano, organizzarle per soggetto e relazione, recuperarle al momento giusto. Un errore in uno dei tre passaggi rende inutili gli altri due.',
        },
        {
          title: 'La massima copertura.',
          body:
            'Non basta trovare un pezzo pertinente: servono tutti i pezzi necessari, comprese le eccezioni e le condizioni dette altrove. Misuriamo la copertura su domande con risposta nota, non la plausibilità.',
        },
        {
          title: 'Auditabile.',
          body:
            'Ogni risposta si ricostruisce passo per passo: cosa è stato recuperato, perché, in che ordine. E dagli stessi dati esce sempre la stessa memoria.',
        },
        {
          title: 'Legata alla fonte.',
          body:
            'Ogni ricordo punta al messaggio, al paragrafo o alla riga di codice da cui viene. Serve a chi legge per verificare, e al motore per accorgersi dei conflitti.',
        },
      ],
    },
    indexable: {
      index: '04',
      label: 'Come si verifica',
      title: 'Come si verifica che la memoria sia giusta.',
      intro:
        'Ormentis è la nostra tecnologia per la memoria dei documenti e del codice. Qui la usiamo per mostrare il metodo: come le fonti diventano una base di conoscenza, come si misura la copertura e come ogni risposta lascia la sua traccia.',
      capabilities: [
        {
          title: 'Dalle fonti alla base di conoscenza.',
          body:
            'Specifiche, verbali, manuali e codice diventano un grafo di affermazioni elementari, ognuna con la sua fonte. Le conversazioni entrano nello stesso grafo, come fatti e impegni.',
        },
        {
          title: 'La misura: copertura, non plausibilità.',
          body:
            'Confrontiamo un agente con la memoria e un agente con i soli documenti sulle stesse domande, contando quante delle affermazioni necessarie ha recuperato ciascuno.',
        },
        {
          title: 'La traccia di ogni risposta.',
          body: 'Quali affermazioni sono state recuperate, perché proprio quelle, con le citazioni del testo originale.',
        },
      ],
      diagram: {
        sources: 'Conversazioni · Specifiche · Verbali · Manuali · Procedure · Codice',
        name: 'Ormentis',
        ops: 'Collega le informazioni e le riconduce alle fonti.',
        output: 'Fatti · Regole · Requisiti · Dipendenze · Impegni',
        consumers: 'Una memoria consultabile da persone e agenti AI.',
      },
      motion: {
        label: 'Come funziona',
        ariaLabel:
          'Animazione: come funziona Ormentis, dall’estrazione grammaticale alla verifica del codice',
        controls: { play: 'Riproduci', pause: 'Pausa', replay: 'Da capo', goTo: 'Vai al passaggio', fullscreen: 'Guarda a schermo intero', close: 'Chiudi' },
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
            title: 'Ormentis nei tuoi agenti',
            caption: 'Ormentis potenzia i tuoi agenti: rispetto ai soli documenti caricati, risposte più complete e con la fonte, e modifiche scritte con i requisiti giusti.',
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
            eyebrow: '07 / 07 · Ripetibile e auditabile',
            title: 'Ripetibile e auditabile',
            caption: 'Dagli stessi documenti, sempre lo stesso grafo. E ogni risposta lascia la traccia di cosa è stato recuperato e perché, con le citazioni.',
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
          header: 'PLUGIN ORMENTIS',
          q1: 'Quando va rifiutato un mandato?',
          call1: 'interroga la base di conoscenza',
          answer: 'Quando manca la data di firma.',
          source: 'FONTE  ·  SPECIFICA v2.3  §4.5',
          q2: 'Aggiungi il controllo in MandateValidator.java',
          call2: 'requisiti collegati: REQ-014, REQ-022',
          done: 'L’agente scrive la modifica con i requisiti giusti.',
          versus: ['Agente + Ormentis', '  batte  ', 'agente + documenti caricati'],
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
        outroLine: 'Memoria spiegabile e verificabile per i settori regolamentati.',
        outroChain: 'PER PERSONE E AGENTI  ·  RIPETIBILE  ·  AUDITABILE',
        proof: {
          questionLabel: 'GLI STESSI DOCUMENTI, TRE COSTRUZIONI DEL GRAFO',
          question: 'Il grafo della conoscenza è sempre lo stesso?',
          leftLabel: 'COSTRUITO DA UN LLM, TRE VOLTE',
          rightLabel: 'COSTRUITO DA ORMENTIS, TRE VOLTE',
          leftTags: ['1ª VOLTA', '2ª VOLTA', '3ª VOLTA'],
          rightTags: ['1ª VOLTA', '2ª VOLTA', '3ª VOLTA'],
          leftVerdict: 'Un grafo diverso a ogni costruzione',
          leftSources: [
            'STESSO LLM: SOLO 1/3 DEGLI ELEMENTI UGUALI TRA DUE ESECUZIONI (GIORDANO E RAZNIEWSKI, 2025)',
            'LLM DIVERSI: SOLO IL 6-11% DELLE RELAZIONI IN COMUNE (FRONTIERS IN IMMUNOLOGY, 2026)',
          ],
          rightVerdict: 'Sempre lo stesso grafo',
          traceLabel: 'TRACCIA DI VERIFICA  ·  PERCHÉ QUESTA RISPOSTA',
          steps: [
            { label: 'DOMANDA', text: 'Quando va rifiutato un mandato?' },
            {
              label: 'RECUPERATO  [1]',
              text: 'Specifica v2.3 §4.5: «La banca del debitore deve rifiutare il mandato se manca la data di firma.»',
              why: 'Perché: stesso oggetto (il mandato) e stessa condizione (la data di firma).',
            },
            {
              label: 'RECUPERATO  [2]',
              text: 'Verbale del 12 mar 2026: «Gli operatori possono accettare mandati senza data di firma.»',
              why: 'Perché: tratta lo stesso caso, ed è in conflitto con [1].',
            },
            { label: 'RISPOSTA', text: 'Va rifiutato se manca la data di firma [1]. Attenzione: il verbale dice il contrario [2].' },
          ],
        },
      },
      trust: {
        label: 'Perché fidarsi',
        title: 'Memoria spiegabile e verificabile per i settori regolamentati.',
        lead:
          'Molti strumenti costruiscono un “cervello aziendale” tutto con l’AI generativa: la base di conoscenza cambia a ogni costruzione, anche con lo stesso modello, e non sempre si sa perché arriva una certa risposta. Noi costruiamo la memoria in modo deterministico e la mettiamo a disposizione di persone e agenti: risposte più complete, con una traccia verificabile di ogni passaggio.',
        pillars: [
          {
            title: 'Ripetibile.',
            body:
              'Dagli stessi documenti, Ormentis ricostruisce sempre lo stesso grafo della conoscenza. Quando un documento cambia, vedi esattamente cosa cambia e perché.',
          },
          {
            title: 'Auditabile.',
            body:
              'Ogni risposta lascia una traccia passo per passo: quali affermazioni sono state recuperate, perché proprio quelle, con le citazioni del testo originale.',
          },
          {
            title: 'Potenzia i tuoi agenti.',
            body:
              'Claude Code, Codex e gli altri agenti lavorano sulla memoria invece che sui soli documenti caricati: risposte più complete, dentro i confini di ciò che è scritto.',
          },
          {
            title: 'Pensato per i settori regolamentati.',
            body:
              'Nato sulle specifiche di banche centrali, sistemi di pagamento e sistemi di difesa, dove una risposta che non si può spiegare non ha valore.',
          },
        ],
        table: {
          caption: 'Il confronto',
          head: ['', 'Solo AI generativa', 'Con Ormentis'],
          rows: [
            ['Ricostruire la base di conoscenza', 'Grafo diverso a ogni costruzione', 'Sempre lo stesso grafo'],
            ['Da dove viene la risposta', 'Non sempre dichiarato', 'Citazioni esatte, per ogni affermazione'],
            ['Perché il sistema ha risposto così', 'Difficile da ricostruire', 'Traccia passo per passo'],
            ['Controllo dei requisiti', 'Probabilistico', 'Deterministico, con regole esplicite'],
            ['Cambia un documento', 'Si riparte da capo', 'Si vede cosa cambia e dove'],
          ],
        },
      },
    },
    products: {
      index: '05',
      label: 'I prodotti',
      title: 'Due prodotti applicano la nostra tecnologia.',
      intro:
        'Su questo sito raccontiamo la tecnologia. Il racconto di prodotto, i casi d’uso e le prove vivono sui siti dei prodotti.',
      items: [
        {
          name: 'Juno',
          kicker: 'Memoria dell’interazione',
          body:
            'Un team di assistenti AI per il benessere finanziario dei dipendenti, su WhatsApp, Teams, email e voce. Ricorda cosa ogni persona ha chiesto e deciso, e riprende il filo da lì.',
          bullets: ['Per aziende e studi di consulenza', 'Nessuna app, nessuna integrazione IT'],
          cta: { label: 'Vai su ojuno.ai', href: JUNO_URL, external: true },
        },
        {
          name: 'Ormentis',
          kicker: 'Memoria dei documenti e del codice',
          body:
            'Trasforma specifiche, verbali, manuali e codice in una base di conoscenza ripetibile e auditabile, per persone e agenti. Nato sulle specifiche di banche centrali, sistemi di pagamento e sistemi di difesa. Prima si chiamava Indexable.',
          bullets: ['Plugin per Claude Code e Codex', 'Impatto delle modifiche, conflitti, test dai requisiti'],
          cta: { label: 'Sito in arrivo: scrivici', href: ORMENTIS_URL, external: false },
        },
      ],
    },
    path: {
      index: '06',
      label: 'Il percorso',
      title: 'Ogni progetto ci ha insegnato qualcosa sulla memoria.',
      intro:
        'Il metodo non è nato a tavolino: è la somma di ciò che abbiamo costruito, misurato e corretto in progetti reali.',
      steps: [
        {
          when: '2025',
          title: 'Juno: la memoria dell’interazione',
          body:
            'Un assistente conversazionale per i dipendenti. Messaggi salvati, fatti estratti per persona, riassunti periodici. Poi la scoperta che la storia grezza non basta: serve sapere quale compito è aperto e cosa è stato promesso.',
        },
        {
          when: '2026',
          title: 'Sistema di pagamento nazionale',
          body:
            'Specifiche consolidate per un sistema di pagamento, con ogni requisito collegato alla fonte. La prima base di conoscenza ripetibile.',
        },
        {
          when: '2026',
          title: 'Antiriciclaggio di banca centrale',
          body:
            'Regole, funzionalità e integrazioni di una piattaforma antiriciclaggio in una base verificabile e aggiornabile.',
        },
        {
          when: '2026',
          title: 'Sistemi di controllo',
          body:
            'Manuali e documentazione tecnica creati con l’aiuto della memoria, rivisti e validati dagli esperti.',
        },
        {
          when: 'Oggi',
          title: 'Ormentis: il grafo con la provenienza',
          body:
            'Affermazioni elementari, costruzione deterministica, plugin per gli agenti, misura della copertura. È la memoria dei documenti e del codice resa prodotto.',
        },
      ],
    },
    credibility: {
      index: '07',
      label: 'Dove lavoriamo',
      title: 'Dove sbagliare costa.',
      body:
        'Lavoriamo dove una risposta che non si può spiegare non ha valore: pagamenti, antiriciclaggio, sistemi critici. Sono questi contesti ad aver dettato il metodo: gli stessi metodi di verifica formale nati nell’aerospazio, un’analisi del codice che dà sempre lo stesso risultato e la ricerca più recente sui grafi di conoscenza.',
      clientsLabel: 'Tra i nostri clienti',
      clients: clientLogos,
      innovationLabel: 'Percorso di innovazione',
      innovation:
        'Il nostro percorso di innovazione comprende un grant e la vittoria di una competizione con premiazione da parte di Deloitte, l’incubazione presso il Politecnico di Milano e l’accelerazione con Le Village.',
      logos: innovationLogos,
    },
    about: {
      index: '08',
      label: 'Lavorare con noi',
      headline: 'Prova un prodotto. Affidaci un progetto. O facciamo ricerca insieme.',
      choices: [
        {
          title: 'Prova un prodotto.',
          body:
            'Juno per la memoria dell’interazione, Ormentis per la memoria dei documenti e del codice. Ognuno ha il suo sito e il suo percorso di prova.',
        },
        {
          title: 'Affidaci un progetto.',
          body:
            'Ci affidi il lavoro, paghi i deliverable concordati: documentazione consolidata, requisiti, analisi di impatto, verifiche dell’implementazione. Perimetro, tempi, costi e criteri di accettazione definiti prima di iniziare.',
        },
        {
          title: 'Facciamo ricerca insieme.',
          body:
            'Tesi, articoli, interventi a eventi, esperimenti condivisi sulla memoria per AI e agenti. Siamo incubati al Politecnico di Milano e cerchiamo chi studia gli stessi problemi.',
        },
      ],
      cta: {
        label: 'Parliamo del tuo progetto',
        href: 'mailto:info@deep4it.com?subject=Il%20mio%20progetto',
      },
      tagline: 'Ricordare tutto ciò che serve. Poterlo dimostrare.',
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
      { label: 'The technology', href: '#tecnologia' },
      { label: 'How we verify it', href: '#verifica' },
      { label: 'Products', href: '#prodotti' },
      { label: 'The path', href: '#percorso' },
      { label: 'Deep4IT', href: '#deep4it' },
    ],
    navCta: 'Get in touch',
    marquee: 'Remember, with the source',
    hero: {
      audience: ['Research lab', 'Monza · Politecnico di Milano'],
      titleLines: ['Memory for AI,', 'with the source.'],
      lead: 'Deep4IT builds the technology that lets AI systems and agents remember.',
      intro:
        'Retrieving what was said in previous conversations and what is written in documents: with maximum coverage, in an auditable way, and tied to the source.',
      compass: [
        {
          label: 'Memory of the interaction',
          body: 'what was asked, answered, decided and promised with a person or an agent.',
        },
        {
          label: 'Memory of documents and code',
          body: 'what the written sources say: specifications, minutes, manuals, code.',
        },
      ],
      outro:
        'We are a small research lab. Two products apply our technology: Juno and Ormentis, each with its own site.',
      cta: { label: 'What we study', href: '#tecnologia' },
      ctaSecondary: { label: 'The products', href: '#prodotti' },
      scrollHint: 'Scroll',
    },
    problem: {
      index: '01',
      label: 'The question',
      title: 'The problem is memory, not the model.',
      items: [
        {
          question: 'What does an AI remember between sessions?',
          body:
            'Nothing. Every conversation starts from zero. What a person asked, decided or promised last week no longer exists, unless someone saved it the right way.',
        },
        {
          question: 'What happens with documents dumped into the context?',
          body:
            'Different answers on every run. Two builds of the same knowledge base, with the same model, share only a third of their elements. A relevant piece gets found; all the necessary pieces do not.',
        },
        {
          question: 'Who can check what it used?',
          body:
            'Almost no one. Without the link to the source, an answer that sounds right and an answer that is right are indistinguishable. In regulated industries that is not acceptable.',
        },
      ],
      closing:
        'Our research question: how does an AI remember everything it needs, and prove where each memory comes from?',
    },
    interactionMemory: {
      index: '02',
      label: 'The technology',
      title: 'Two memories, one engine.',
      kicker: 'Memory of the interaction',
      subtitle: 'What was said, decided and promised.',
      items: [
        {
          title: 'Extract the facts that matter.',
          body:
            'A conversation yields a few durable facts: a preference, a decision, a commitment. They must be extracted, tagged and stored apart from the raw message history.',
        },
        {
          title: 'Know which task is open.',
          body:
            'A “yes” attaches to the wrong question when several are open, and an abandoned task must not weigh as much as an active one. So every message carries a structured intent: topic, task, whether it continues the previous turn.',
        },
        {
          title: 'Keep the commitments.',
          body:
            'If the assistant asked for a document and the person changed subject, on return it must remember, not start over. We observed this on real cases, measured it and fixed it.',
        },
      ],
    },
    documentMemory: {
      index: '02',
      label: 'The technology',
      title: 'Two memories, one engine.',
      kicker: 'Memory of documents and code',
      subtitle: 'What the written sources say.',
      items: [
        {
          title: 'Atomic units, not pages.',
          body:
            'Every sentence of a specification, a set of minutes or a manual becomes atomic claims: who must do what, under which condition. Code enters the same base.',
        },
        {
          title: 'Every unit keeps its source and its weight.',
          body:
            'The link to the document, the paragraph and the line always remains. And sources are not all equal: an approved specification outweighs meeting minutes, and retrieval knows it.',
        },
        {
          title: 'The same graph from the same documents.',
          body:
            'The knowledge base is built deterministically. When a document changes, you see exactly what changes and where.',
        },
        {
          title: 'Conflicts and gaps surface.',
          body:
            'When two sources disagree, the engine says so instead of silently picking one. When a piece is missing, it flags it.',
        },
      ],
    },
    promises: {
      index: '03',
      label: 'The four promises',
      title: 'Remember everything that matters. And be able to prove it.',
      kicker: 'What we demand of our technology',
      subtitle: 'Remember, organise, retrieve: every step with evidence.',
      items: [
        {
          title: 'Remember, not just search.',
          body:
            'Extract the units that matter, organise them by subject and relation, retrieve them at the right moment. A failure in any of the three steps makes the other two useless.',
        },
        {
          title: 'Maximum coverage.',
          body:
            'Finding a relevant piece is not enough: you need all the necessary pieces, including exceptions and conditions stated elsewhere. We measure coverage on questions with known answers, not plausibility.',
        },
        {
          title: 'Auditable.',
          body:
            'Every answer can be reconstructed step by step: what was retrieved, why, in which order. And the same data always yields the same memory.',
        },
        {
          title: 'Tied to the source.',
          body:
            'Every memory points to the message, the paragraph or the line of code it comes from. Readers use it to verify; the engine uses it to notice conflicts.',
        },
      ],
    },
    indexable: {
      index: '04',
      label: 'How we verify it',
      title: 'How we verify that the memory is right.',
      intro:
        'Ormentis is our technology for the memory of documents and code. Here we use it to show the method: how sources become a knowledge base, how coverage is measured, and how every answer leaves its trail.',
      capabilities: [
        {
          title: 'From sources to a knowledge base.',
          body:
            'Specifications, minutes, manuals and code become a graph of atomic claims, each with its source. Conversations enter the same graph, as facts and commitments.',
        },
        {
          title: 'The measure: coverage, not plausibility.',
          body:
            'We compare an agent with the memory and an agent with documents alone on the same questions, counting how many of the necessary claims each one retrieved.',
        },
        {
          title: 'The trail of every answer.',
          body: 'Which claims were retrieved, why those, with citations from the original text.',
        },
      ],
      diagram: {
        sources: 'Conversations · Specifications · Minutes · Manuals · Procedures · Code',
        name: 'Ormentis',
        ops: 'Connects information and traces it back to its sources.',
        output: 'Facts · Rules · Requirements · Dependencies · Commitments',
        consumers: 'A memory people and AI agents can query.',
      },
      motion: {
        label: 'How it works',
        ariaLabel: 'Animation: how Ormentis works, from grammatical extraction to code verification',
        controls: { play: 'Play', pause: 'Pause', replay: 'Replay', goTo: 'Go to step', fullscreen: 'Watch full screen', close: 'Close' },
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
            title: 'Ormentis in your agents',
            caption: 'Ormentis augments your agents: compared with just uploading documents, more complete answers with sources, and changes written with the right requirements.',
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
            eyebrow: '07 / 07 · Repeatable and auditable',
            title: 'Repeatable and auditable',
            caption: 'The same documents always give the same graph. And every answer leaves a trail of what was retrieved and why, with citations.',
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
          header: 'ORMENTIS PLUGIN',
          q1: 'When must a mandate be rejected?',
          call1: 'querying the knowledge base',
          answer: 'When the signature date is missing.',
          source: 'SOURCE  ·  SPEC v2.3  §4.5',
          q2: 'Add the check to MandateValidator.java',
          call2: 'linked requirements: REQ-014, REQ-022',
          done: 'The agent writes the change with the right requirements.',
          versus: ['Agent + Ormentis', '  beats  ', 'agent + uploaded documents'],
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
        outroLine: 'Explainable, auditable memory for regulated industries.',
        outroChain: 'FOR PEOPLE AND AGENTS  ·  REPEATABLE  ·  AUDITABLE',
        proof: {
          questionLabel: 'THE SAME DOCUMENTS, THREE GRAPH BUILDS',
          question: 'Is the knowledge graph always the same?',
          leftLabel: 'BUILT BY AN LLM, THREE TIMES',
          rightLabel: 'BUILT BY ORMENTIS, THREE TIMES',
          leftTags: ['RUN 1', 'RUN 2', 'RUN 3'],
          rightTags: ['RUN 1', 'RUN 2', 'RUN 3'],
          leftVerdict: 'A different graph every time',
          leftSources: [
            'SAME LLM: ONLY 1/3 OF ELEMENTS MATCH BETWEEN TWO RUNS (GIORDANO AND RAZNIEWSKI, 2025)',
            'DIFFERENT LLMS: ONLY 6-11% OF RELATIONS IN COMMON (FRONTIERS IN IMMUNOLOGY, 2026)',
          ],
          rightVerdict: 'Always the same graph',
          traceLabel: 'AUDIT TRAIL  ·  WHY THIS ANSWER',
          steps: [
            { label: 'QUESTION', text: 'When must a mandate be rejected?' },
            {
              label: 'RETRIEVED  [1]',
              text: 'Spec v2.3 §4.5: “The debtor bank shall reject the mandate if the signature date is missing.”',
              why: 'Why: same object (the mandate) and same condition (the signature date).',
            },
            {
              label: 'RETRIEVED  [2]',
              text: 'Minutes, 12 Mar 2026: “Operators may accept mandates without a signature date.”',
              why: 'Why: it covers the same case, and conflicts with [1].',
            },
            { label: 'ANSWER', text: 'Reject it if the signature date is missing [1]. Note: the minutes say otherwise [2].' },
          ],
        },
      },
      trust: {
        label: 'Why you can trust it',
        title: 'Explainable, auditable memory for regulated industries.',
        lead:
          'Many tools build a “company brain” entirely with generative AI: the knowledge base changes with every build, even with the same model, and it is not always clear why a given answer comes back. We build the memory deterministically and make it available to people and agents: more complete answers, with a verifiable trail of every step.',
        pillars: [
          {
            title: 'Repeatable.',
            body:
              'From the same documents, Ormentis always rebuilds the same knowledge graph. When a document changes, you see exactly what changes and why.',
          },
          {
            title: 'Auditable.',
            body:
              'Every answer leaves a step-by-step trail: which statements were retrieved, why those, with citations from the original text.',
          },
          {
            title: 'Augments your agents.',
            body:
              'Claude Code, Codex and other agents work on the memory instead of uploaded documents alone: more complete answers, within the bounds of what is written.',
          },
          {
            title: 'Built for regulated industries.',
            body:
              'Born on specifications for central banks, payment systems and defence systems, where an answer that cannot be explained has no value.',
          },
        ],
        table: {
          caption: 'The comparison',
          head: ['', 'Generative AI only', 'With Ormentis'],
          rows: [
            ['Rebuilding the knowledge base', 'A different graph every build', 'Always the same graph'],
            ['Where the answer comes from', 'Not always stated', 'Exact citations, for every statement'],
            ['Why the system answered that way', 'Hard to reconstruct', 'Step-by-step trail'],
            ['Checking requirements', 'Probabilistic', 'Deterministic, with explicit rules'],
            ['A document changes', 'Start over', 'See what changes, and where'],
          ],
        },
      },
    },
    products: {
      index: '05',
      label: 'The products',
      title: 'Two products apply our technology.',
      intro:
        'This site is about the technology. The product story, the use cases and the evidence live on the product sites.',
      items: [
        {
          name: 'Juno',
          kicker: 'Memory of the interaction',
          body:
            'A team of AI assistants for employees’ financial wellbeing, on WhatsApp, Teams, email and voice. It remembers what each person asked and decided, and picks up the thread from there.',
          bullets: ['For companies and advisory firms', 'No app, no IT integration'],
          cta: { label: 'Go to ojuno.ai', href: JUNO_URL, external: true },
        },
        {
          name: 'Ormentis',
          kicker: 'Memory of documents and code',
          body:
            'Turns specifications, minutes, manuals and code into a repeatable, auditable knowledge base for people and agents. Born on specifications for central banks, payment systems and defence systems. Formerly known as Indexable.',
          bullets: ['Plugin for Claude Code and Codex', 'Change impact, conflicts, tests from requirements'],
          cta: { label: 'Site coming soon: write to us', href: ORMENTIS_URL, external: false },
        },
      ],
    },
    path: {
      index: '06',
      label: 'The path',
      title: 'Every project taught us something about memory.',
      intro:
        'The method was not designed at a desk: it is the sum of what we built, measured and corrected in real projects.',
      steps: [
        {
          when: '2025',
          title: 'Juno: the memory of the interaction',
          body:
            'A conversational assistant for employees. Saved messages, facts extracted per person, periodic summaries. Then the discovery that raw history is not enough: you need to know which task is open and what was promised.',
        },
        {
          when: '2026',
          title: 'National payment system',
          body:
            'Consolidated specifications for a payment system, with every requirement linked to its source. The first repeatable knowledge base.',
        },
        {
          when: '2026',
          title: 'Central bank anti-money-laundering',
          body:
            'Rules, features and integrations of an AML platform in a verifiable, updatable knowledge base.',
        },
        {
          when: '2026',
          title: 'Control systems',
          body:
            'Manuals and technical documentation created with the help of the memory, reviewed and validated by domain experts.',
        },
        {
          when: 'Today',
          title: 'Ormentis: the graph with provenance',
          body:
            'Atomic claims, deterministic construction, plugins for agents, coverage measurement. The memory of documents and code, turned into a product.',
        },
      ],
    },
    credibility: {
      index: '07',
      label: 'Where we work',
      title: 'Where mistakes are expensive.',
      body:
        'We work where an answer that cannot be explained has no value: payments, anti-money-laundering, critical systems. These contexts shaped the method: the same formal verification methods born in aerospace, code analysis that always gives the same result, and the latest research on knowledge graphs.',
      clientsLabel: 'Our clients include',
      clients: clientLogos,
      innovationLabel: 'Innovation track record',
      innovation:
        'Our innovation track record includes a grant and the win of a competition awarded by Deloitte, incubation at Politecnico di Milano and acceleration with Le Village.',
      logos: innovationLogos,
    },
    about: {
      index: '08',
      label: 'Working with us',
      headline: 'Try a product. Hand us a project. Or do research with us.',
      choices: [
        {
          title: 'Try a product.',
          body:
            'Juno for the memory of the interaction, Ormentis for the memory of documents and code. Each has its own site and its own trial path.',
        },
        {
          title: 'Hand us a project.',
          body:
            'We do the work, you pay for the agreed deliverables: consolidated documentation, requirements, impact assessments, implementation verification. Scope, timelines, pricing and acceptance criteria are agreed before work begins.',
        },
        {
          title: 'Do research with us.',
          body:
            'Theses, papers, talks, shared experiments on memory for AI and agents. We are incubated at Politecnico di Milano and we look for people studying the same problems.',
        },
      ],
      cta: {
        label: 'Let’s talk about your project',
        href: 'mailto:info@deep4it.com?subject=My%20project',
      },
      tagline: 'Remember everything that matters. Be able to prove it.',
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
