import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
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

  // Switching language: fade the text out, swap it, keep the reader on the
  // same spot (the two languages have different lengths), fade back in.
  const anchor = useRef<{ el: Element; top: number } | null>(null);
  const busy = useRef(false);

  const findAnchor = () => {
    const y = window.innerHeight * 0.4;
    let el = document.elementFromPoint(window.innerWidth / 2, y);
    // climb to a block that is part of the page flow (not the fixed header)
    while (el && el.parentElement && el.getBoundingClientRect().height < 40) el = el.parentElement;
    if (!el || el.closest('header')) return null;
    return { el, top: el.getBoundingClientRect().top };
  };

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem('d4it-lang', l);
    } catch {
      /* ignore */
    }
    if (l === lang || busy.current) return;
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      anchor.current = findAnchor();
      setLangState(l);
      return;
    }
    busy.current = true;
    root.classList.add('lang-out');
    window.setTimeout(() => {
      anchor.current = findAnchor();
      setLangState(l);
    }, 200);
  };

  useLayoutEffect(() => {
    const a = anchor.current;
    anchor.current = null;
    if (a && a.el.isConnected) {
      const diff = a.el.getBoundingClientRect().top - a.top;
      if (Math.abs(diff) > 1) {
        const root = document.documentElement;
        const prev = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        window.scrollBy(0, diff);
        root.style.scrollBehavior = prev;
      }
    }
    if (busy.current) {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('lang-out');
        busy.current = false;
      });
    }
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang, t: content[lang] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
