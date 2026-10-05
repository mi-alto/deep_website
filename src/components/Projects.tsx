import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

/** Section 06, "Il percorso": the lab's projects as a timeline, one lesson about memory per stop.
    (The file keeps its historical name: this is still the projects section.) */
export default function Projects() {
  const { t } = useLang();
  const p = t.path;

  return (
    <section className="relative bg-black/35 pb-20 md:pb-36">
      <SectionHeading index={p.index} label={p.label} title={p.title} id="percorso" />

      <div className="mx-auto mt-10 max-w-[1600px] px-5 md:mt-16 md:px-10">
        <Reveal>
          <p className="max-w-3xl text-[15px] leading-relaxed text-[#B7B7B7] md:text-lg">{p.intro}</p>
        </Reveal>

        <ol className="relative mt-12 border-l border-white/20 md:mt-16">
          {p.steps.map((s, i) => {
            const last = i === p.steps.length - 1;
            return (
              <li key={i} className="relative pb-12 pl-8 last:pb-0 md:pl-14">
                {/* the marker on the line; the last stop (today) is lit */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-[7px] top-1.5 h-[13px] w-[13px] rounded-full border ${
                    last
                      ? 'border-[hsl(var(--brand-1))] bg-[hsl(var(--brand-1))] shadow-[0_0_18px_hsl(var(--brand-1)/0.6)]'
                      : 'border-white/50 bg-black'
                  }`}
                />
                <Reveal delay={80 + i * 90}>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-8">
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--brand-3))] md:col-span-2 md:pt-1">
                      {s.when}
                    </span>
                    <div className="md:col-span-10">
                      <h3 className="font-display text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#B7B7B7] md:text-base">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
