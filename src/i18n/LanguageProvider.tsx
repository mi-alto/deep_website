import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { content, type Content, type Lang } from './content';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Content;
}

const Ctx = createContext<LangCtx>({ lang: 'it', setLang: () => {}, t: content.it });

function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'en';
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const l of langs) {
    if (l?.toLowerCase().startsWith('it')) return 'it';
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Starts as 'it' both in the prerendered HTML and on the first client render
  // (hydration needs them equal); the saved or browser language kicks in after mount.
  const [lang, setLangState] = useState<Lang>('it');

  useEffect(() => {
    let l = detectLang();
    try {
      const saved = localStorage.getItem('d4it-lang');
      if (saved === 'it' || saved === 'en') l = saved;
    } catch {
      /* ignore */
    }
    if (l !== 'it') setLangState(l);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('d4it-lang', l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang, t: content[lang] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
