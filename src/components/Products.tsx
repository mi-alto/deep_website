import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

/** Section 02: the two products, one card each, both pointing to their own site. */
export default function Products() {
  const { t } = useLang();
  const p = t.products;

  return (
    <section className="relative bg-black/35 pb-20 md:pb-32">
      <SectionHeading index={p.index} label={p.label} title={p.title} id="prodotti" />

      <div className="mx-auto mt-10 max-w-[1600px] px-5 md:mt-14 md:px-10">
        <div className="grid grid-cols-1 gap-px border border-white/15 bg-white/10 md:grid-cols-2">
          {p.items.map((item, i) => (
            <Reveal key={item.name} delay={100 + i * 120} className="h-full">
              <a
                href={item.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group spot flex h-full flex-col bg-black/80 p-7 transition-colors duration-500 hover:bg-black/70 md:p-10"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--brand-3))]">
                  {item.kicker}
                </span>
                <h3 className="font-display mt-4 text-3xl font-semibold uppercase leading-none tracking-tight text-white md:text-5xl">
                  {item.name}
                </h3>
                <p className="mt-6 max-w-xl border-l-2 border-[hsl(var(--brand-1)/0.6)] pl-4 text-[15px] leading-relaxed text-[#B7B7B7] md:text-base">
                  {item.body}
                </p>
                <span className="mt-auto inline-flex items-baseline gap-2 pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-white">
                  <span className="border-b border-white/40 pb-1 transition-colors duration-300 group-hover:border-[hsl(var(--brand-1))]">
                    {item.cta.label}
                  </span>
                  <span className="text-white/50 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    ↗
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
