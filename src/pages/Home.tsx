import { lazy, Suspense, useEffect, useState } from 'react';
import { LanguageProvider } from '../i18n/LanguageProvider';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import Problem from '../components/Problem';
import Capabilities from '../components/Capabilities';
import Layer from '../components/Layer';
import Projects from '../components/Projects';
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
    if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 1200 });
    else setTimeout(go, 250);
  }, []);
  return on;
}

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
          <main>
            <Hero />
            <Manifesto />
            <Problem />
            <Capabilities variant="business" />
            <Capabilities variant="tech" />
            <Layer />
            <Projects />
            <Credibility />
          </main>
          <AboutFooter />
        </div>
      </div>
    </LanguageProvider>
  );
}
