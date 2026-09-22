import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './Reveal';
import SectionHeading from './SectionHeading';

/* per-logo classes: the source images differ wildly in padding, aspect ratio and
   colour. The two client marks are dark artwork on transparent (Villanova.AI is
   pure black, Nexi is #2D32AA), so they need inverting to survive a black page;
   the innovation logos already ship light or boxed. */
const CLIENT_STYLES = ['h-5 md:h-6 grayscale invert', 'h-6 md:h-7 grayscale invert'];
const INNOVATION_STYLES = ['h-14 md:h-16 grayscale', 'h-11 md:h-12 grayscale', 'h-10 md:h-12 grayscale'];

function LogoRow({ logos, styles }: { logos: { src: string; alt: string; note?: string }[]; styles: string[] }) {
  return (
    <div className="flex flex-wrap items-end gap-x-14 gap-y-9">
      {logos.map((logo, i) => (
        <figure key={logo.src} className="flex flex-col items-center gap-3">
          <img
            src={logo.src}
            alt={logo.alt}
            className={`w-auto opacity-85 transition-opacity duration-500 hover:opacity-100 ${styles[i] ?? 'h-10 grayscale'}`}
            loading="lazy"
          />
          <figcaption className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/65">
            {logo.note ?? logo.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Credibility() {
  const { t } = useLang();
  const c = t.credibility;

  return (
    <section className="relative bg-black/35 pb-20 md:pb-36">
      <SectionHeading index={c.index} label={c.label} title={c.title} id="credibilita" />

      <div className="mx-auto mt-10 max-w-[1600px] px-5 md:mt-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <p className="max-w-md text-[15px] leading-relaxed text-[#B7B7B7] md:text-base">{c.body}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={160}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">{c.clientsLabel}</p>
              <div className="mt-7">
                <LogoRow logos={c.clients} styles={CLIENT_STYLES} />
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-12 border-t border-white/15 pt-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                  {c.innovationLabel}
                </p>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#B7B7B7] md:text-base">
                  {c.innovation}
                </p>
                <div className="mt-9">
                  <LogoRow logos={c.logos} styles={INNOVATION_STYLES} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
