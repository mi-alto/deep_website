import { lazy, Suspense, useEffect, useState } from 'react';
import { LanguageProvider } from '../i18n/LanguageProvider';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Capabilities from '../components/Capabilities';
import Products from '../components/Products';
import Credibility from '../components/Credibility';
import AboutFooter from '../components/AboutFooter';
import { useSpotlight } from '../hooks/use-spotlight';

// three.js (~600 kB) only powers the background: load it in its own chunk,
// after first paint, when the browser is idle — never on the critical path.
const ParticleField = lazy(() => import('../components/ParticleField'));

function useDeferredFx() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const go = () => setOn(true);
    // wait for the page to finish loading, then for a quiet moment; phones wait a little longer,
    // so the background never competes with the first reading of the page
    const small = window.innerWidth < 768;
    const idle = () => {
      if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: small ? 2500 : 1200 });
      else setTimeout(go, small ? 1200 : 250);
    };
    const later = () => setTimeout(idle, 0);
    if (small) {
      // phones: the field starts at the first touch or scroll, or after a few seconds
      let done = false;
      const kick = () => {
        if (done) return;
        done = true;
        window.removeEventListener('scroll', kick);
        window.removeEventListener('touchstart', kick);
        idle();
      };
      window.addEventListener('scroll', kick, { passive: true, once: true });
      window.addEventListener('touchstart', kick, { passive: true, once: true });
      const timer = setTimeout(kick, 6000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', kick);
        window.removeEventListener('touchstart', kick);
      };
    }
    if (document.readyState === 'complete') later();
    else window.addEventListener('load', later, { once: true });
  }, []);
  return on;
}

/* A landing page, nothing more: the technology (01), the two products (02),
   clients and innovation track record (03), contacts. Product stories live on
   ojuno.ai and ormentis.com. */
export default function Home() {
  useSpotlight();
  const fx = useDeferredFx();
  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-clip bg-black text-white antialiased">
        {/* living particle field — fixed behind the entire site */}
        {fx && (
          <Suspense fallback={null}>
            <ParticleField className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
          </Suspense>
        )}
        <div className="relative z-10">
          <Header />
          <main className="lang-fade">
            <Hero />
            <Capabilities />
            <Products />
            <Credibility />
          </main>
          <div className="lang-fade">
            <AboutFooter />
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
