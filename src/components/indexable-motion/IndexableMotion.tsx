import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n/LanguageProvider';
import { DURATION, STEPS, mountMotion, type Motion } from './engine';

const stepAt = (t: number) => {
  let s = 0;
  STEPS.forEach(([a], i) => {
    if (t >= a) s = i;
  });
  return s;
};

/**
 * "How Indexable works" motion graphic: five steps from grammatical
 * extraction to code verification. Plays while on screen, pauses when
 * scrolled away; static frame (with a play button) for reduced motion.
 */
export default function IndexableMotion() {
  const { t: tr } = useLang();
  const copy = tr.indexable.motion;

  const svgRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const motion = useRef<Motion | null>(null);
  const time = useRef(0);
  const visible = useRef(false);
  const userPaused = useRef(false);
  const raf = useRef(0);
  const last = useRef<number | null>(null);
  const stepRef = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  // phones: the stage opens full screen, turned sideways when the phone is upright
  const [theater, setTheater] = useState(false);

  const paint = useCallback((t: number) => {
    motion.current?.render(t);
    STEPS.forEach(([a, b], i) => {
      const el = barRefs.current[i];
      if (el) el.style.transform = `scaleX(${Math.max(0, Math.min(1, (t - a) / (b - a)))})`;
    });
    const s = stepAt(t);
    if (s !== stepRef.current) {
      stepRef.current = s;
      setStep(s);
    }
  }, []);

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    last.current = null;
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    cancelAnimationFrame(raf.current);
    last.current = null;
    setPlaying(true);
    const tick = (now: number) => {
      if (last.current != null) {
        time.current += (now - last.current) / 1000;
        if (time.current >= DURATION) time.current = 0;
      }
      last.current = now;
      paint(time.current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [paint]);

  // mount (and re-mount on language change) once fonts are ready,
  // since scene 1 measures the words of the sentence
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let cancelled = false;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce && time.current === 0) {
      time.current = 24.5;
      userPaused.current = true;
    }
    document.fonts.ready.then(() => {
      if (cancelled) return;
      motion.current?.destroy();
      motion.current = mountMotion(svg, copy);
      paint(time.current);
    });
    return () => {
      cancelled = true;
      motion.current?.destroy();
      motion.current = null;
    };
  }, [copy, paint]);

  // play only while on screen
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting && !userPaused.current) start();
        else if (!e.isIntersecting) stop();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [start, stop]);

  const toggle = () => {
    if (playing) {
      userPaused.current = true;
      stop();
    } else {
      userPaused.current = false;
      start();
    }
  };
  const seek = (t: number) => {
    time.current = t;
    paint(t);
    if (!userPaused.current && visible.current) start();
  };

  const openTheater = () => {
    setTheater(true);
    userPaused.current = false;
    start();
  };
  const closeTheater = () => setTheater(false);

  useEffect(() => {
    if (!theater) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setTheater(false);
    window.addEventListener('keydown', onKey);
    // where the browser allows it (Android), also hide its own bars
    const root = document.documentElement as HTMLElement & { requestFullscreen?: () => Promise<void> };
    root.requestFullscreen?.().catch(() => {});
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [theater]);

  const mono = 'font-mono text-[10px] uppercase tracking-[0.22em] md:text-[11px]';

  return (
    <div className="mx-auto mt-16 max-w-[1600px] px-5 md:mt-28 md:px-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
        <span className={`${mono} text-[hsl(var(--brand-1))]`}>{copy.label}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className={`${mono} rounded-full border border-white/15 px-4 py-1.5 text-white/75 transition-colors hover:border-[hsl(var(--brand-1))] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--brand-1))]`}
          >
            {playing ? copy.controls.pause : copy.controls.play}
          </button>
          <button
            type="button"
            onClick={() => {
              userPaused.current = false;
              time.current = 0;
              paint(0);
              start();
            }}
            className={`${mono} rounded-full border border-white/15 px-4 py-1.5 text-white/75 transition-colors hover:border-[hsl(var(--brand-1))] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--brand-1))]`}
          >
            {copy.controls.replay}
          </button>
        </div>
      </div>

      <div className={theater ? 'ixm-theater' : ''} role={theater ? 'dialog' : undefined} aria-modal={theater || undefined} aria-label={theater ? copy.ariaLabel : undefined}>
        <div className={theater ? 'ixm-theater-box' : ''}>
          {theater && (
            <div className="flex items-center justify-between gap-4">
              <p className="min-w-0 truncate">
                <span className={`${mono} mr-3 text-[hsl(var(--brand-1))]`}>{String(step + 1).padStart(2, '0')} / 0{copy.steps.length}</span>
                <span className="font-display text-sm font-semibold uppercase tracking-tight text-white">{copy.steps[step]?.title}</span>
              </p>
              <button
                type="button"
                onClick={closeTheater}
                className={`${mono} shrink-0 rounded-full border border-white/25 px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--brand-1))]`}
              >
                {copy.controls.close} ✕
              </button>
            </div>
          )}
          <div
            ref={frameRef}
            role="img"
            aria-label={copy.ariaLabel}
            className={`relative overflow-hidden bg-[#07070b] [aspect-ratio:1920/700] ${
              theater ? 'mx-auto max-h-full w-full border border-white/15' : '-mx-5 border-y border-white/15 md:mx-0 md:border-x'
            }`}
          >
            <svg
              ref={svgRef}
              viewBox="0 120 1920 700"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            />
            {!theater && (
              <button
                type="button"
                onClick={openTheater}
                className="absolute inset-0 flex items-end justify-end p-3 md:hidden"
              >
                <span className={`${mono} flex items-center gap-2 rounded-full border border-white/30 bg-black/70 px-3 py-2 text-white backdrop-blur-sm`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="text-[hsl(var(--brand-1))]">
                    <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="currentColor" strokeWidth="1.6" fill="none" />
                  </svg>
                  {copy.controls.fullscreen}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        {/* all captions share one grid cell, so the block keeps the height of the longest */}
        <div className="grid lg:col-span-7" aria-live="polite">
          {copy.steps.map((s, i) => (
            <div
              key={i}
              className="[grid-area:1/1] transition-opacity duration-500"
              style={{ opacity: i === step ? 1 : 0 }}
              aria-hidden={i !== step}
            >
              <p className={`${mono} text-[hsl(var(--brand-1))]`}>{s.eyebrow}</p>
              <h3 className="font-display mt-3 text-2xl font-semibold uppercase leading-tight tracking-tight text-white md:text-4xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#B7B7B7] md:text-lg">{s.caption}</p>
            </div>
          ))}
        </div>

        <ol className="grid grid-cols-7 gap-2 lg:col-span-5">
          {copy.steps.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => seek(STEPS[i][0] + 0.01)}
                aria-current={i === step ? 'step' : undefined}
                className="group flex w-full flex-col gap-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--brand-1))]"
              >
                <span className={`flex flex-col gap-1 transition-colors ${i === step ? 'text-white' : 'text-white/60 group-hover:text-white/85'}`}>
                  <span className={mono}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.1em] sm:block">{s.short}</span>
                  <span className="sr-only">{`: ${s.title}`}</span>
                </span>
                <span className="relative block h-[3px] w-full overflow-hidden bg-white/15">
                  <span
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    className="absolute inset-0 origin-left bg-[hsl(var(--brand-1))]"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
