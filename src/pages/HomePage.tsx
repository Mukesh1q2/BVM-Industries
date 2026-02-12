import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../sections/HeroSection';
import TrustBar from '../components/TrustBar';
import EngineeredSection from '../sections/EngineeredSection';
import ProductsSection from '../sections/ProductsSection';
import MachineFeatureSection from '../sections/MachineFeatureSection';
import CapabilitiesSection from '../sections/CapabilitiesSection';
import IndustriesSection from '../sections/IndustriesSection';
import QualitySection from '../sections/QualitySection';
import ContactSection from '../sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap configuration for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    };

    // Delay to allow all ScrollTriggers to initialize
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main ref={mainRef} className="relative">
      <HeroSection />
      <TrustBar />
      <EngineeredSection />
      <ProductsSection />
      <MachineFeatureSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <QualitySection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
