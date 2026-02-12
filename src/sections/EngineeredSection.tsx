import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EngineeredSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        }
      });

      // ENTRANCE (0-30%)
      // Image panel slides in from right
      scrollTl.fromTo(imagePanelRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline words stagger in from left
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        );
      }

      // Body and CTA fade in
      scrollTl.fromTo(bodyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.10
      );

      scrollTl.fromTo(ctaRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(imagePanelRef.current,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(words,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.70
        );
      }

      scrollTl.fromTo(bodyRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0.2, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0.2, ease: 'power2.in' },
        0.74
      );

    }, sectionRef);

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
      ref={sectionRef}
      className="section-pinned bg-bvm-navy flex items-center"
    >
      {/* Diagonal image panel */}
      <div
        ref={imagePanelRef}
        className="absolute right-0 top-0 h-full overflow-hidden"
        style={{
          width: '55vw',
          clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
          zIndex: 2,
          opacity: 0
        }}
      >
        <img
          src="/engineered_for_panel.jpg"
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
      <div className="relative z-10 px-4 sm:px-8 lg:px-[8vw] max-w-[50vw]" style={{ opacity: 0 }}>
        <h2
          ref={headlineRef}
          className="headline-lg text-white mb-8"
        >
          <span className="word inline-block">Engineered</span>{' '}
          <span className="word inline-block">for</span>{' '}
          <span className="word inline-block">Reliability,</span>
          <br />
          <span className="word inline-block">Built</span>{' '}
          <span className="word inline-block">for</span>{' '}
          <span className="word inline-block">Scale.</span>
        </h2>

        <p
          ref={bodyRef}
          className="body-text max-w-[32vw] mb-8"
        >
          From custom moulds to complete blow-fill-seal integrations, we optimize
          for output, repeatability, and cleanroom-ready performance. Our machines
          are designed to meet cGMP norms and deliver consistent results.
        </p>

        <button
          ref={ctaRef}
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
