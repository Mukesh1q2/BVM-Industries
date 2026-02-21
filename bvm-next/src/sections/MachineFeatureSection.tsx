"use client";
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MachineFeatureSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!headlineRef.current) return;
      const words = headlineRef.current.querySelectorAll('.word');
      gsap.fromTo(words,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
          }
        }
      );
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32 min-h-[70vh] flex items-center"
    >
      {/* Full-bleed background image */}
      <img
        src="/machine_feature_bg.webp"
        alt="Blow moulding production line"
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(11,15,23,0.92) 0%, rgba(11,15,23,0.50) 55%, rgba(11,15,23,0.20) 100%)'
        }}
      />

      {/* Text block */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-[8vw]">
        <h2 ref={headlineRef} className="headline-lg text-white max-w-full lg:max-w-[44vw] mb-6">
          <span className="word inline-block">7.0-Ton</span><br />
          <span className="word inline-block">Aseptic</span><br />
          <span className="word inline-block">Integration</span>
        </h2>

        <p className="body-text max-w-full lg:max-w-[34vw] mb-8">
          The FSDS-XX/XX Form Fill Seal machine features an integrated Class 100 sterile
          chamber, HGH45HA linear carriage assemblies, and mirror-finish SS316L product
          contact lines—designed for continuous, high-output parenteral production.
        </p>

        <button
          onClick={() => scrollToSection('#contact')}
          className="btn-primary w-fit"
        >
          Explore Machines
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </section>
  );
};

export default MachineFeatureSection;
