import { WordReveal } from './Reveal';

export default function SectionHeading({
  index,
  label,
  title,
  id,
}: {
  index: string;
  label: string;
  title: string;
  id?: string;
}) {
  return (
    <div id={id} className="relative scroll-mt-24 px-5 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-baseline gap-5 border-t border-white/15 pt-6 md:gap-6">
          <span className="font-display shrink-0 text-[11vw] font-bold leading-none text-transparent md:text-[9vw] [-webkit-text-stroke:1px_hsl(var(--brand-1)/0.55)] [text-shadow:0_0_48px_hsl(var(--brand-1)/0.35)]">
            {index}
          </span>
          <div className="flex min-w-0 flex-col gap-3 pb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--brand-1))] md:text-[11px]">
              {label}
            </span>
            <h2 className="font-display max-w-4xl break-words pr-2 text-[6.4vw] font-semibold uppercase leading-[1.06] tracking-tight text-white sm:text-3xl md:text-5xl lg:text-6xl">
              <WordReveal text={title} step={24} />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
