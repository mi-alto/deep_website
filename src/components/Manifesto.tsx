export default function Manifesto() {
  const m = { marquee: 'Accelerate and de-risk change' };

  return (
    <section className="relative bg-black/30 px-0 py-8 md:py-20">
      {/* kinetic marquee band */}
      <div className="overflow-hidden border-y border-white/10 py-5" aria-hidden="true">
        <div className="marquee-track flex w-max items-center whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  <span
                    className={`font-display mx-6 text-3xl font-bold uppercase tracking-tight md:mx-8 md:text-7xl ${
                      i % 2 === 0 ? 'text-white/90' : 'text-transparent [-webkit-text-stroke:1px_hsl(var(--brand-1)/0.7)]'
                    }`}
                  >
                    {m.marquee}
                  </span>
                  <svg width="22" height="22" viewBox="0 0 22 22" className="text-[hsl(var(--brand-1))]" aria-hidden="true">
                    <g stroke="currentColor" strokeWidth="1.3">
                      <circle cx="11" cy="11" r="2.2" fill="currentColor" stroke="none" />
                      {Array.from({ length: 8 }).map((_, j) => {
                        const ang = (j * Math.PI) / 4;
                        return (
                          <line
                            key={j}
                            x1={11 + Math.cos(ang) * 5}
                            y1={11 + Math.sin(ang) * 5}
                            x2={11 + Math.cos(ang) * 10}
                            y2={11 + Math.sin(ang) * 10}
                          />
                        );
                      })}
                    </g>
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
