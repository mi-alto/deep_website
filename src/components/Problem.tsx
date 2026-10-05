import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

/** Section 01: the three questions that define the problem, then the lab's research question. */
export default function Problem() {
  const { t } = useLang();
  const p = t.problem;

  return (
    <section className="relative bg-black/35 pb-20 pt-20 md:pb-36 md:pt-28">
      <SectionHeading index={p.index} label={p.label} title={p.title} id="domanda" />

      <div className="mx-auto mt-10 max-w-[1600px] px-5 md:mt-16 md:px-10">
        <div className="grid grid-cols-1 gap-px border border-white/15 bg-white/10 md:grid-cols-3">
          {p.items.map((item, i) => (
            <Reveal key={i} delay={100 + i * 110} className="h-full">
              <article className="group spot flex h-full flex-col bg-black/80 p-7 transition-colors duration-500 hover:bg-black/70 md:p-9">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                  {String(i + 1).padStart(2, '0')} / {String(p.items.length).padStart(2, '0')}
                </span>
                <h3 className="font-display mt-5 text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl">
                  {item.question}
                </h3>
                <p className="mt-5 border-l-2 border-[hsl(var(--brand-1)/0.6)] pl-4 text-[15px] leading-relaxed text-[#B7B7B7] md:text-base">
                  {item.body}
                </p>
                <span className="mt-auto block h-px w-16 accent-line pt-0 transition-all duration-700 group-hover:w-32" />
              </article>
            </Reveal>
          ))}
        </div>

        {/* the research question: the one sentence the whole site answers */}
        <Reveal delay={360}>
          <div className="glow-box relative mt-10 border border-[hsl(var(--brand-1)/0.7)] bg-[hsl(var(--brand-2)/0.12)] px-6 py-7 md:mt-14 md:px-10 md:py-9">
            <span className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-[hsl(var(--brand-1))]" />
            <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-[hsl(var(--brand-1))]" />
            <p className="font-display max-w-4xl text-xl font-semibold leading-snug text-white md:text-3xl">{p.closing}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
