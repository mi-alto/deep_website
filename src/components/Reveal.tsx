import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** Scroll-triggered reveal: opacity + translate, once. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Visible by default so the prerendered HTML paints at once; only what
  // starts below the fold gets hidden (before paint, in a layout effect)
  // and revealed on scroll.
  const [on, setOn] = useState(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setOn(false);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : `translateY(${y}px)`,
        transition: on ? `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms` : 'none',
      }}
    >
      {children}
    </div>
  );
}

/** Masked word-by-word reveal for display headlines. */
export function WordReveal({
  text,
  className = '',
  baseDelay = 0,
  step = 55,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
  as?: 'span' | 'div';
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(true); // same visible-first logic as Reveal

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setOn(false);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(' ');
  const Wrapper = Tag as 'span';

  return (
    <Wrapper ref={ref} className={`glitch ${className}`} data-text={text} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          className="word-float inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
          style={{ '--i': i } as CSSProperties}
          aria-hidden="true"
        >
          <span
            className="inline-block will-change-transform"
            style={{
              transform: on ? 'translateY(0)' : 'translateY(110%)',
              transition: on ? `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * step}ms` : 'none',
            }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Wrapper>
  );
}
