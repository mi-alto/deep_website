# Deep4it — sito

One-pager di Deep4IT (IT/EN), costruito con React 19 + TypeScript + Vite e Tailwind CSS.
Il racconto parte dal cambiamento da realizzare: problema, business & IT, le quattro domande, Indexable, progetti, credibilità.
Lo sfondo è un particle field WebGL (three.js) e il wordmark del footer è composto dalle stesse particelle.

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # tsc -b && vite build → dist/
npm run preview  # serve dist/ in locale
```

L'output è statico: il contenuto di `dist/` può essere pubblicato su qualsiasi hosting statico.

## Struttura

- `index.html` — entry point, meta e font (Archivo + IBM Plex Mono da Google Fonts)
- `src/pages/Home.tsx` — composizione delle sezioni della pagina
- `src/components/` — sezioni (`Hero`, `Manifesto`, `Problem`, `Audiences`, `Questions`, `Layer`, `Projects`, `Credibility`, `AboutFooter`), effetti (`ParticleField`, `ParticleWord`, `Reveal`), l'intestazione condivisa `SectionHeading` e le primitive shadcn/ui in `ui/`
- `src/i18n/content.ts` — **tutti i testi del sito**, in italiano e inglese; `LanguageProvider` sceglie la lingua dal browser e la memorizza in `localStorage`
- `public/` — asset serviti così come sono (`favicon.ico`, `michele/` + `michele.vcf`, `images/`)

Per modificare i contenuti si interviene su `src/i18n/content.ts`, non sui componenti.
