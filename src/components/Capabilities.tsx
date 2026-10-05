import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

type Variant = 'interaction' | 'documents' | 'promises';

/** One block of titled cards. The two memories share section 02: the first
    carries the section heading, the second only its own kicker and cards. */
export default function Capabilities({ variant }: { variant: Variant }) {
  const { t } = useLang();
  const data =
    variant === 'interaction' ? t.interactionMemory : variant === 'documents' ? t.documentMemory : t.promises;
  const withHeading = variant !== 'documents';
  const id = variant === 'interaction' ? 'tecnologia' : variant === 'documents' ? 'documenti' : 'promesse';

  return (
    <section className={`relative bg-black/35 pb-20 md:pb-36 ${withHeading ? '' : '-mt-6 md:-mt-16'}`}>
      {withHeading ? (
        <SectionHeading index={data.index} label={data.label} title={data.title} id={id} />
      ) : (
        <div id={id} className="scroll-mt-24" />
      )}

      <div className={`mx-auto max-w-[1600px] px-5 md:px-10 ${withHeading ? 'mt-10 md:mt-16' : ''}`}>
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--brand-3))] md:text-xs">
            {data.kicker}
          </span>
          <p className="font-display mt-3 max-w-3xl text-xl font-semibold leading-snug text-white md:text-3xl">
            {data.subtitle}
          </p>
        </Reveal>

        <div
          className={`mt-10 grid grid-cols-1 gap-px border border-white/15 bg-white/10 ${
            data.items.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'
          }`}
        >
          {data.items.map((item, i) => (
            <Reveal key={i} delay={100 + i * 110} className="h-full">
              <article className="group spot flex h-full flex-col bg-black/80 p-7 transition-colors duration-500 hover:bg-black/70 md:p-9">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                  {String(i + 1).padStart(2, '0')} / {String(data.items.length).padStart(2, '0')}
                </span>
                <h3 className="font-display mt-5 text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-5 border-l-2 border-[hsl(var(--brand-1)/0.6)] pl-4 text-[15px] leading-relaxed text-[#B7B7B7] md:text-base">
                  {item.body}
                </p>
                <span className="mt-auto block h-px w-16 accent-line pt-0 transition-all duration-700 group-hover:w-32" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
