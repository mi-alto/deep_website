import { useEffect, useState, type CSSProperties } from 'react';
import { useLang } from '../i18n/LanguageProvider';

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
        {/* radiating mark + wordmark */}
        <a href="#top" className="group flex items-center gap-3">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="shrink-0" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="1.4" className="text-white/90">
              <circle cx="13" cy="13" r="2.6" fill="currentColor" stroke="none" />
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * Math.PI) / 6;
                const r1 = 6.5;
                const r2 = 12;
                return (
                  <line
                    key={i}
                    x1={13 + Math.cos(a) * r1}
                    y1={13 + Math.sin(a) * r1}
                    x2={13 + Math.cos(a) * r2}
                    y2={13 + Math.sin(a) * r2}
                    opacity={0.35 + (i % 3) * 0.3}
                  />
                );
              })}
            </g>
          </svg>
          <span className="font-mono text-[13px] font-medium uppercase tracking-[0.28em] text-white">
            Deep4
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
            href="#deep4it"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/80 underline-offset-4 hover:underline"
          >
            {t.navCta} ↗
          </a>
        </div>
      </div>
    </header>
  );
}
