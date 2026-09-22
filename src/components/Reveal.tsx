import { useEffect, useRef, useState, type ReactNode } from 'react';

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
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
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
  wordClassName = '',
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
  as?: 'span' | 'div';
  /** applied to each word — background-clip:text must live on the glyph's own box */
  wordClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]" aria-hidden="true">
          <span
            className={`inline-block will-change-transform ${wordClassName}`}
            style={{
              transform: on ? 'translateY(0)' : 'translateY(110%)',
              transition: `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * step}ms`,
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
