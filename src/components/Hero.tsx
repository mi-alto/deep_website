import { useLang } from '../i18n/LanguageProvider';
import { WordReveal } from './Reveal';

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="aurora" aria-hidden="true" />
      {/* vignette to keep type readable */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-6 pt-20 md:px-10 md:pt-24">
        {/* headline, with the audience line right under it */}
        <div className="mt-auto pt-6">
          <h1 className="font-display text-[9.5vw] font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-[8.2vw] lg:text-[5.6vw]">
            {t.hero.titleLines.map((line, i) => (
              <span key={i} className="block">
                <WordReveal text={line} baseDelay={150 + i * 160} />
              </span>
            ))}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 md:gap-4">
            {t.hero.audience.map((a, i) => (
              <span key={i} className="contents">
                {i > 0 && <span className="font-mono text-sm text-[hsl(var(--brand-1))] md:text-base">+</span>}
                <span className="border border-[hsl(var(--brand-1)/0.6)] bg-black/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-sm md:px-5 md:py-2.5 md:text-xs">
                  {a}
                </span>
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-lg font-medium leading-snug text-white md:text-2xl">{t.hero.lead}</p>
              <p className="mt-4 text-base leading-relaxed text-[#B7B7B7] md:text-lg">{t.hero.intro}</p>

              <div className="mt-4 space-y-1.5 border-l-2 border-[hsl(var(--brand-1)/0.6)] pl-4">
                {t.hero.compass.map((c, i) => (
                  <p key={i} className="text-[15px] leading-relaxed md:text-base">
                    <span className="font-display font-semibold text-white">{c.label}:</span>{' '}
                    <span className="text-[#B7B7B7]">{c.body}</span>
                  </p>
                ))}
              </div>

              <p className="mt-4 text-base leading-relaxed text-[#B7B7B7] md:text-lg">{t.hero.outro}</p>

              <div className="hero-fade mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href={t.hero.cta.href}
                    className="btn-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em]"
                  >
                    {t.hero.cta.label}
                  </a>
                  {t.hero.ctaSecondary && (
                    <a
                      href={t.hero.ctaSecondary.href}
                      className="border border-white/30 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-[hsl(var(--brand-1))]"
                    >
                      {t.hero.ctaSecondary.label}
                    </a>
                  )}
                </div>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
              <span className="line-flow inline-block h-8 w-px bg-white/50" />
              {t.hero.scrollHint}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
