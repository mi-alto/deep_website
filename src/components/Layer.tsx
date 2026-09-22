import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

const DownArrow = () => (
  <div className="flex items-center justify-center py-1" aria-hidden="true">
    <svg width="14" height="30" viewBox="0 0 14 30" className="text-[hsl(var(--brand-3))]">
      <path className="flow-line" d="M7 0 V22" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M1 18 L7 24 L13 18" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  </div>
);

export default function Layer() {
  const { t } = useLang();
  const ix = t.indexable;

  return (
    <section className="relative bg-black/35 pb-20 md:pb-36">
      <SectionHeading index={ix.index} label={ix.label} title={ix.title} id="indexable" />

      <div className="mx-auto mt-10 grid max-w-[1600px] grid-cols-1 gap-14 px-5 md:mt-16 md:px-10 lg:grid-cols-12">
        {/* sources flow down through Indexable to the people and agents that use them */}
        <div className="lg:col-span-6">
          <Reveal delay={100}>
            <div className="flex flex-col">
              <div className="border border-white/15 bg-white/[0.015] px-6 py-5 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75 md:text-xs">
                  {ix.diagram.sources}
                </p>
              </div>
              <DownArrow />
              <div className="glow-box relative border border-[hsl(var(--brand-1)/0.7)] bg-[hsl(var(--brand-2)/0.12)] px-6 py-6 text-center">
                <span className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-[hsl(var(--brand-1))]" />
                <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-[hsl(var(--brand-1))]" />
                <p className="font-display text-3xl font-semibold uppercase tracking-tight text-white md:text-4xl">
                  {ix.diagram.name}
                </p>
                <p className="mt-2 text-[13px] leading-snug text-white/80 md:text-sm">{ix.diagram.ops}</p>
              </div>
              <DownArrow />
              <div className="border border-white/15 bg-white/[0.015] px-6 py-5 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/75 md:text-xs">
                  {ix.diagram.output}
                </p>
              </div>
              <DownArrow />
              <div className="border border-white/15 bg-white/[0.015] px-6 py-5 text-center">
                <p className="font-display text-lg font-semibold leading-tight tracking-tight text-white/90 md:text-xl">
                  {ix.diagram.consumers}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* narrative */}
        <div className="lg:col-span-6">
          <Reveal delay={120}>
            <p className="text-[15px] leading-relaxed text-[#B7B7B7] md:text-lg">{ix.intro}</p>
          </Reveal>

          <div className="mt-8 space-y-7">
            {ix.capabilities.map((c, i) => (
              <Reveal key={i} delay={220 + i * 100}>
                <div className="border-l-2 border-[hsl(var(--brand-1)/0.6)] pl-4">
                  <p className="font-display text-lg font-semibold leading-snug text-white md:text-xl">{c.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#B7B7B7] md:text-base">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
