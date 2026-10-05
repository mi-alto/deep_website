import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

/** Section 05: the two products, one card each, both pointing to their own site.
    This page only says which memory each one applies; the product story lives elsewhere. */
export default function Products() {
  const { t } = useLang();
  const p = t.products;

  return (
    <section className="relative bg-black/35 pb-20 md:pb-36">
      <SectionHeading index={p.index} label={p.label} title={p.title} id="prodotti" />

      <div className="mx-auto mt-10 max-w-[1600px] px-5 md:mt-16 md:px-10">
        <Reveal>
          <p className="max-w-3xl text-[15px] leading-relaxed text-[#B7B7B7] md:text-lg">{p.intro}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-px border border-white/15 bg-white/10 md:grid-cols-2">
          {p.items.map((item, i) => (
            <Reveal key={item.name} delay={100 + i * 120} className="h-full">
              <article className="group spot flex h-full flex-col bg-black/80 p-7 transition-colors duration-500 hover:bg-black/70 md:p-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--brand-3))]">
                  {item.kicker}
                </span>
                <h3 className="font-display mt-4 text-3xl font-semibold uppercase leading-none tracking-tight text-white md:text-5xl">
                  {item.name}
                </h3>
                <p className="mt-6 border-l-2 border-[hsl(var(--brand-1)/0.6)] pl-4 text-[15px] leading-relaxed text-[#B7B7B7] md:text-base">
                  {item.body}
                </p>
                <ul className="mt-6 space-y-2">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 md:text-xs">
                      <span className="inline-block h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full bg-[hsl(var(--brand-1))]" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <a
                    href={item.cta.href}
                    target={item.cta.external ? '_blank' : undefined}
                    rel={item.cta.external ? 'noopener noreferrer' : undefined}
                    className="btn-accent inline-block px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em]"
                  >
                    {item.cta.label} ↗
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
