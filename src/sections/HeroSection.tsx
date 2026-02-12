import { useEffect, useRef, useLayoutEffect } from 'react';
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

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Slash panel entrance
      tl.fromTo(slashRef.current,
        { opacity: 0, x: '-12vw' },
        { opacity: 1, x: 0, duration: 0.8 },
        0
      );

      // Product image entrance
      tl.fromTo(imageRef.current,
        { opacity: 0, x: '10vw', rotate: -18, scale: 0.96 },
        { opacity: 1, x: 0, rotate: -12, scale: 1, duration: 0.9 },
        0.1
      );

      // Eyebrow entrance
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.3
      );

      // Headline word-by-word entrance
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.03 },
          0.35
        );
      }

      // Body entrance
      tl.fromTo(bodyRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );

      // CTA entrance
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([slashRef.current, imageRef.current, eyebrowRef.current, bodyRef.current, ctaRef.current], {
              opacity: 1, x: 0, y: 0
            });
            if (headlineRef.current) {
              gsap.set(headlineRef.current.querySelectorAll('.word'), { opacity: 1, y: 0 });
            }
          }
        }
      });

      // ENTRANCE (0-30%): Hold visible state (elements already visible from load)
      // Just subtle parallax on image
      scrollTl.fromTo(imageRef.current,
        { y: 0 },
        { y: -8, ease: 'none' },
        0
      );

      // SETTLE (30-70%): No movement

      // EXIT (70-100%): Elements exit
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(eyebrowRef.current,
        { x: 0, opacity: 1 },
        { x: '-30vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(bodyRef.current,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-25vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(imageRef.current,
        { x: 0, rotate: -12, opacity: 1 },
        { x: '40vw', rotate: -6, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(slashRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0.3, ease: 'power2.in' },
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
      className="section-pinned bg-bvm-navy flex items-center justify-center"
      style={{ marginTop: '80px' }}
    >
      {/* Diagonal slash panel */}
      <div
        ref={slashRef}
        className="absolute bg-bvm-navy-light"
        style={{
          left: '-10vw',
          top: '-20vh',
          width: '65vw',
          height: '140vh',
          transform: 'skewX(-12deg)',
          zIndex: 1,
          opacity: 0
        }}
      />

      {/* Hero product image */}
      <img
        ref={imageRef}
        src="/hero_bottle.webp"
        alt="BVM Industries precision pharmaceutical bottle produced by Blow-Fill-Seal technology"
        width={520}
        height={780}
        fetchPriority="high"
        className="absolute"
        style={{
          right: '6vw',
          top: '50%',
          transform: 'translateY(-50%) rotate(-12deg)',
          width: '34vw',
          maxWidth: '520px',
          aspectRatio: '520 / 780',
          zIndex: 3,
          opacity: 0
        }}
      />

      {/* Content block */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-[8vw]">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="eyebrow mb-4" style={{ opacity: 0 }}>
          F.F.S , B.F.S MACHINES & MOULDS
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="headline-xl text-white max-w-[44vw] mb-8"
          style={{ opacity: 0 }}
        >
          <span className="word inline-block">Precision</span>{' '}
          <span className="word inline-block">Engineering</span>{' '}
          <span className="word inline-block">for</span>{' '}
          <span className="word inline-block">Aseptic</span>{' '}
          <span className="word inline-block">Packaging</span>
        </h1>

        {/* Body */}
        <p
          ref={bodyRef}
          className="body-text max-w-[34vw] mb-8"
          style={{ opacity: 0 }}
        >
          BVM Industries designs and manufactures advanced F.F.S & B.F.S machines,
          Euro Cap Sealing systems, and precision moulds—built for pharma, healthcare,
          and aseptic packaging performance.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
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
