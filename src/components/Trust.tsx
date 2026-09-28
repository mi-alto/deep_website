import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './Reveal';

/** "Why you can trust it": repeatable, auditable, built for regulated industries. */
export default function Trust() {
  const { t } = useLang();
  const tr = t.indexable.trust;

  return (
    <div id="affidabilita" className="mx-auto mt-20 max-w-[1600px] scroll-mt-24 px-5 md:mt-32 md:px-10">
      <Reveal>
        <div className="border-t border-white/15 pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--brand-3))] md:text-[11px]">
            {tr.label}
          </span>
        </div>
        <p className="font-display mt-6 max-w-5xl text-3xl font-semibold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
          {tr.title}
        </p>
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[#B7B7B7] md:text-lg">{tr.lead}</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-px border border-white/15 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {tr.pillars.map((p, i) => (
          <Reveal key={i} delay={100 + i * 110} className="h-full">
            <article className="group spot flex h-full flex-col bg-black/80 p-7 transition-colors duration-500 hover:bg-black/70 md:p-9">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                {String(i + 1).padStart(2, '0')} / {String(tr.pillars.length).padStart(2, '0')}
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-5 border-l-2 border-[hsl(var(--brand-3)/0.6)] pl-4 text-[15px] leading-relaxed text-[#B7B7B7] md:text-base">
                {p.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={150}>
        {/* phones: one card per row of the comparison, no sideways scrolling */}
        <div className="mt-12 md:hidden">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">{tr.table.caption}</p>
          <ul className="flex flex-col gap-px border border-white/15 bg-white/10">
            {tr.table.rows.map((r, i) => (
              <li key={i} className="bg-black/85 px-5 py-4">
                <p className="text-[15px] font-semibold text-white">{r[0]}</p>
                <p className="mt-2 text-[14px] leading-snug text-white/60">
                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">{tr.table.head[1]}</span>
                  {r[1]}
                </p>
                <p className="mt-1.5 text-[15px] font-medium leading-snug text-white">
                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--brand-3))]">{tr.table.head[2]}</span>
                  {r[2]}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <caption className="mb-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 md:text-[11px]">
              {tr.table.caption}
            </caption>
            <thead>
              <tr className="border-b border-white/15">
                {tr.table.head.map((hd, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={`py-3 pr-6 font-mono text-[10px] font-medium uppercase tracking-[0.22em] md:text-[11px] ${
                      i === 2 ? 'text-[hsl(var(--brand-3))]' : i === 1 ? 'text-white/55' : 'text-transparent'
                    }`}
                  >
                    {hd || '\u00a0'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tr.table.rows.map((r, i) => (
                <tr key={i} className="border-b border-white/10">
                  <th scope="row" className="py-4 pr-6 align-top text-[15px] font-medium text-white md:text-base">
                    {r[0]}
                  </th>
                  <td className="py-4 pr-6 align-top text-[15px] text-white/50 md:text-base">{r[1]}</td>
                  <td className="bg-[hsl(var(--brand-3)/0.06)] px-4 py-4 align-top text-[15px] font-medium text-white md:text-base">
                    <span className="mr-2 text-[hsl(var(--brand-3))]" aria-hidden="true">✓</span>
                    {r[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}
