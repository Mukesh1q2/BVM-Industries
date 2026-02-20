import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slashRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ─── ENTRANCE ANIMATION (auto-plays on load) ───
      const entranceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      entranceTl.fromTo(slashRef.current,
        { opacity: 0, x: '-12vw' },
        { opacity: 1, x: 0, duration: 0.8 },
        0
      );

      entranceTl.fromTo(imageRef.current,
        { opacity: 0, x: '10vw', scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9 },
        0.1
      );

      entranceTl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.3
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        entranceTl.fromTo(words,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.03 },
          0.35
        );
      }

      entranceTl.fromTo(bodyRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );

      entranceTl.fromTo(ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.7
      );

      // ─── SCROLL-DRIVEN EXIT (pinned, scrubbed) ───
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        }
      });

      // Subtle image parallax during hold
      scrollTl.to(imageRef.current,
        { y: -8, ease: 'none', duration: 0.3 },
        0
      );

      // Exit phase (70-100%)
      scrollTl.to(headlineRef.current,
        { x: '-40vw', opacity: 0, ease: 'power2.in', duration: 0.3 },
        0.70
      );

      scrollTl.to(eyebrowRef.current,
        { x: '-30vw', opacity: 0, ease: 'power2.in', duration: 0.3 },
        0.70
      );

      scrollTl.to(bodyRef.current,
        { x: '-35vw', opacity: 0, ease: 'power2.in', duration: 0.3 },
        0.72
      );

      scrollTl.to(ctaRef.current,
        { x: '-25vw', opacity: 0, ease: 'power2.in', duration: 0.3 },
        0.74
      );

      scrollTl.to(imageRef.current,
        { x: '40vw', opacity: 0, ease: 'power2.in', duration: 0.3 },
        0.70
      );

      scrollTl.to(slashRef.current,
        { x: '-20vw', opacity: 0.3, ease: 'power2.in', duration: 0.3 },
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
      className="hero-section"
    >
      {/* Diagonal slash panel */}
      <div
        ref={slashRef}
        className="absolute"
        style={{
          left: '-10vw',
          top: '-20vh',
          width: '65vw',
          height: '140vh',
          transform: 'skewX(-12deg)',
          zIndex: 1,
          backgroundColor: 'var(--hero-slash-bg)',
        }}
      />

      {/* Hero product image */}
      <img
        ref={imageRef}
        src="/hero_bottle_large.png"
        alt="BVM Industries precision pharmaceutical bottles produced by Blow-Fill-Seal technology"
        width={520}
        height={780}
        fetchPriority="high"
        className="absolute"
        style={{
          right: '4vw',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '38vw',
          maxWidth: '600px',
          height: 'auto',
          zIndex: 3,
        }}
      />

      {/* Content block */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-[8vw]">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="hero-eyebrow mb-4">
          F.F.S, B.F.S, CAP SEALING & MOULDS
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="hero-headline max-w-[44vw] mb-8"
        >
          <span className="word inline-block">Precision</span>{' '}
          <span className="word inline-block">Engineering</span>{' '}
          <span className="word inline-block">for</span>{' '}
          <span className="word inline-block">Aseptic</span>{' '}
          <span className="word inline-block text-bvm-blue">Packaging</span>
        </h1>

        {/* Body */}
        <p
          ref={bodyRef}
          className="hero-body max-w-[34vw] mb-8"
        >
          BVM Industries designs and manufactures advanced F.F.S & B.F.S machines,
          Euro Cap Sealing systems, and precision moulds—built for pharma, healthcare,
          and aseptic packaging performance.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToSection('#products')}
            className="btn-primary"
          >
            Explore Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-secondary"
          >
            Request a Quote
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
