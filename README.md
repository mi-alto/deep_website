# Deep4it — sito

One-pager di Deep4IT (IT/EN), costruito con React 19 + TypeScript + Vite e Tailwind CSS.
Deep4IT si presenta come piccolo laboratorio di ricerca sulla memoria per AI e agenti. Il racconto: la domanda (01), le due memorie (02), le quattro promesse (03), come si verifica con Ormentis (04), i due prodotti Juno e Ormentis con rimando ai loro siti (05), il percorso (06), dove lavoriamo (07), lavorare con noi (08).
Lo sfondo è un particle field WebGL (three.js) colorato con la palette del brand.

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # tsc -b, build client, build SSR, prerender → dist/
npm run preview  # serve dist/ in locale
```

L'output è statico: il contenuto di `dist/` può essere pubblicato su qualsiasi hosting statico.

### Come è ottimizzata la consegna

- **Pre-render**: `scripts/prerender.mjs` esegue `src/entry-server.tsx` in build e scrive l'HTML dell'intera pagina in `dist/index.html`; il browser dipinge il testo prima del JS, che poi si limita a idratare (`hydrateRoot` in `main.tsx`). `Reveal`/`WordReveal` partono visibili e nascondono solo ciò che è sotto la piega.
- **three.js fuori dal percorso critico**: `ParticleField` è importato con `lazy()` e montato solo dopo il primo paint, in idle time; saltato con `prefers-reduced-motion` o `saveData`. Sui telefoni usa meno particelle.
- **Font self-hosted** in `public/fonts/` (Archivo variabile, IBM Plex Mono), precaricati da `index.html`.
- **Chunk vendor stabile** (`react`) e cache immutabile per `assets/` e `fonts/` in `vercel.json`.

## Struttura

- `index.html` — entry point, meta e font (Archivo + IBM Plex Mono da Google Fonts)
- `src/pages/Home.tsx` — composizione delle sezioni della pagina
- `src/components/` — sezioni (`Hero`, `Manifesto`, `Problem`, `Capabilities` per le due memorie e le quattro promesse, `Layer` con l'animazione di Ormentis e `Trust`, `Products`, `Projects` per la linea del tempo, `Credibility`, `AboutFooter`), effetti (`ParticleField`, `Reveal`), il simbolo `LogoMark`, l'intestazione condivisa `SectionHeading` e le primitive shadcn/ui in `ui/`
- `src/i18n/content.ts` — **tutti i testi del sito**, in italiano e inglese; `LanguageProvider` sceglie la lingua dal browser e la memorizza in `localStorage`
- `public/` — asset serviti così come sono (`favicon.ico`, `michele/` + `michele.vcf`, `images/`)

Per modificare i contenuti si interviene su `src/i18n/content.ts`, non sui componenti.
