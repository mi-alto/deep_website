import { LanguageProvider } from '../i18n/LanguageProvider';
import ParticleField from '../components/ParticleField';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import Problem from '../components/Problem';
import Capabilities from '../components/Capabilities';
import Layer from '../components/Layer';
import Projects from '../components/Projects';
import Credibility from '../components/Credibility';
import AboutFooter from '../components/AboutFooter';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-clip bg-black text-white antialiased">
        {/* living particle field — fixed behind the entire site */}
        <ParticleField className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
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
