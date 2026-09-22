import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';
import ParticleWord from './ParticleWord';

export default function AboutFooter() {
  const { t } = useLang();
  const a = t.about;

  return (
    <footer className="relative overflow-hidden bg-black/60 pb-14 pt-20 md:pb-20 md:pt-36">
      <SectionHeading index={a.index} label={a.label} title={a.headline} id="deep4it" />

      <div className="mx-auto mt-10 max-w-[1600px] px-5 md:mt-16 md:px-10">
        {/* the two ways to work with us */}
        <div className="grid grid-cols-1 gap-px border border-white/15 bg-white/10 sm:grid-cols-2">
          {a.choices.map((c, i) => (
            <Reveal key={i} delay={i * 110} className="h-full">
              <article className="group flex h-full flex-col bg-black/90 p-7 transition-colors duration-500 hover:bg-[#0b0b0b] md:p-9">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                  {String(i + 1).padStart(2, '0')} / {String(a.choices.length).padStart(2, '0')}
                </span>
                <h3 className="font-display mt-5 text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl">
                  {c.title}
                </h3>
                <p className="mt-5 border-l-2 border-white/30 pl-4 text-[15px] leading-relaxed text-[#B7B7B7] md:text-base">
                  {c.body}
                </p>
                <span className="mt-auto block h-px w-16 bg-white/50 pt-0 transition-all duration-700 group-hover:w-32 group-hover:bg-white" />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={260}>
          <a
            href={a.cta.href}
            className="mt-10 inline-block bg-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black transition-colors duration-300 hover:bg-white/85"
          >
            {a.cta.label} ↗
          </a>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.28em] text-white/55 md:text-[12px]">
            {a.tagline}
          </p>
        </Reveal>

        {/* contacts */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-white/15 pt-10 md:mt-28 md:grid-cols-3">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
              {a.contacts.label}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <address className="font-display text-xl font-medium not-italic leading-snug text-white md:text-2xl">
              {a.contacts.lines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </address>
          </Reveal>
          <Reveal delay={200}>
            <a
              href={`mailto:${a.contacts.email}`}
              className="group inline-flex items-baseline gap-2 font-display text-xl font-medium text-white md:text-2xl"
            >
              <span className="border-b border-white/40 pb-1 transition-colors duration-300 group-hover:border-white">
                {a.contacts.email}
              </span>
              <span className="text-white/50 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      {/* oversized wordmark — assembled from live particles */}
      <div className="relative mt-10 select-none px-2">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(62% 88% at 50% 50%, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.72) 52%, rgba(0,0,0,0) 100%)',
          }}
        />
        <ParticleWord key={a.wordmark} word={a.wordmark} />
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-5 pb-8 pt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:flex-row md:items-center md:px-10">
        <span className="normal-case tracking-[0.08em]">{a.contacts.legal}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />
          Accelerate and de-risk change
        </span>
      </div>
    </footer>
  );
}
