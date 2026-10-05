import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './Reveal';

/** Footer: contacts and legal line, nothing else. */
export default function AboutFooter() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="relative overflow-hidden bg-black/40 pb-10 pt-16 md:pb-14 md:pt-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div id="contatti" className="grid scroll-mt-28 grid-cols-1 gap-10 border-t border-white/15 pt-10 md:grid-cols-3">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">{f.contactsLabel}</span>
          </Reveal>
          <Reveal delay={100}>
            <address className="font-display text-xl font-medium not-italic leading-snug text-white md:text-2xl">
              {f.lines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </address>
          </Reveal>
          <Reveal delay={200}>
            <a
              href={`mailto:${f.email}`}
              className="group inline-flex items-baseline gap-2 font-display text-xl font-medium text-white md:text-2xl"
            >
              <span className="border-b border-white/40 pb-1 transition-colors duration-300 group-hover:border-white">
                {f.email}
              </span>
              <span className="text-white/50 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pb-4 pt-14 font-mono text-[10px] normal-case tracking-[0.08em] text-white/60 md:px-10">
        {f.legal}
      </div>
    </footer>
  );
}
