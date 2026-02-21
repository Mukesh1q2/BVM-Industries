"use client";
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EngineeredSection = () => {
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
      className="relative bg-bvm-navy py-24 lg:py-32 min-h-[70vh] flex items-center z-20 overflow-hidden"
    >
      {/* Diagonal image panel */}
      <div
        className="absolute right-0 top-0 h-full overflow-hidden"
        style={{
          width: '55vw',
          clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
          zIndex: 2,
        }}
      >
        <img
          src="/engineered_for_panel.webp"
          alt="Industrial machinery"
          width={1200}
          height={800}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            transform: 'scale(1.1) translateX(-5%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bvm-navy via-bvm-navy/50 to-transparent" />
      </div>

      {/* Text block */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-[8vw] max-w-full lg:max-w-[50vw]">
        <h2 ref={headlineRef} className="headline-lg text-white mb-8">
          <span className="word inline-block">Engineered</span>{' '}
          <span className="word inline-block">for</span>{' '}
          <span className="word inline-block">Reliability,</span>
          <br />
          <span className="word inline-block">Built</span>{' '}
          <span className="word inline-block">for</span>{' '}
          <span className="word inline-block">Scale.</span>
        </h2>

        <p className="body-text max-w-full lg:max-w-[32vw] mb-8">
          From custom moulds to complete blow-fill-seal integrations, we optimize
          for output, repeatability, and cleanroom-ready performance. Our machines
          are designed to meet cGMP norms and deliver consistent results.
        </p>

        <button
          onClick={() => scrollToSection('#capabilities')}
          className="text-bvm-blue hover:text-white font-medium flex items-center gap-2 transition-colors group"
        >
          See our capabilities
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default EngineeredSection;
