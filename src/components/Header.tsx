import { useEffect, useState, type CSSProperties } from 'react';
import { useLang } from '../i18n/LanguageProvider';
import LogoMark from './LogoMark';

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md bg-black/55 border-b border-white/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="progress" style={{ '--p': progress } as CSSProperties} aria-hidden="true" />
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        {/* mark + wordmark */}
        <a href="#top" className="group flex items-center gap-2.5">
          <LogoMark className="h-[26px] w-[26px] shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5" />
          <span className="font-display text-[19px] font-semibold uppercase leading-none tracking-[0.12em] text-white">
            Deep4IT
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {t.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="nav-link relative font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          {/* language switch */}
          <div className="flex items-center rounded-full border border-white/15 p-[3px] font-mono text-[10px] uppercase tracking-[0.18em]">
            {(['it', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 transition-all duration-300 ${
                  lang === l ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                }`}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="#contatti"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/80 underline-offset-4 hover:underline"
          >
            {t.navCta} ↗
          </a>
        </div>
      </div>
    </header>
  );
}
