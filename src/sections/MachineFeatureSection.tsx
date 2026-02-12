import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MachineFeatureSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

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
      // Background image scales in
      scrollTl.fromTo(bgImageRef.current,
        { scale: 1.08, opacity: 0.7 },
        { scale: 1.00, opacity: 1, ease: 'none' },
        0
      );

      // Text block slides in from left
      scrollTl.fromTo(textBlockRef.current,
        { x: '-45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(bgImageRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(textBlockRef.current,
        { y: 0, opacity: 1 },
        { y: '-16vh', opacity: 0, ease: 'power2.in' },
        0.70
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
      className="section-pinned relative overflow-hidden"
    >
      {/* Full-bleed background image */}
      <img
        ref={bgImageRef}
        src="/machine_feature_bg.jpg"
        alt="Blow moulding production line"
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0 }}
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(11,15,23,0.92) 0%, rgba(11,15,23,0.50) 55%, rgba(11,15,23,0.20) 100%)'
        }}
      />

      {/* Text block */}
      <div
        ref={textBlockRef}
        className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8 lg:px-[8vw]"
        style={{ opacity: 0 }}
      >
        <h2 className="headline-lg text-white max-w-[44vw] mb-6">
          High-Output<br />
          Moulding<br />
          Systems
        </h2>

        <p className="body-text max-w-[34vw] mb-8">
          Robust extrusion blow moulding and blow-fill-seal solutions—designed
          for continuous production, quick changeovers, and aseptic-ready environments.
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
