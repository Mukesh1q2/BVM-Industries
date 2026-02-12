import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    id: 1,
    title: 'Pharma & Biotech',
    description: 'Sterile filling for SVP (Eye drops, Respules) and LVP (IV Fluids).',
    image: '/industry_pharma.jpg'
  },
  {
    id: 2,
    title: 'Healthcare & Cosmetics',
    description: 'High-quality aesthetic packaging for lotions, serums, and oils.',
    image: '/industry_healthcare.jpg'
  },
  {
    id: 3,
    title: 'Industrial Packaging',
    description: 'Robust containers for chemicals, lubricants, and household products.',
    image: '/industry_industrial.jpg'
  }
];

const IndustriesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        }
      });

      // ENTRANCE (0-30%)
      // Heading slides in
      scrollTl.fromTo(headingRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Cards slide up with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        scrollTl.fromTo(card,
          { y: '70vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05 + index * 0.05
        );
      });

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(headingRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      const exitDirections = [
        { x: '-18vw', y: 0 },
        { x: 0, y: '-18vh' },
        { x: '18vw', y: 0 }
      ];

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const dir = exitDirections[index];
        scrollTl.fromTo(card,
          { x: 0, y: 0, opacity: 1 },
          { x: dir.x, y: dir.y, opacity: 0, ease: 'power2.in' },
          0.72 + index * 0.02
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="section-pinned bg-bvm-navy flex flex-col justify-center"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="headline-md text-white px-4 sm:px-8 lg:px-[8vw] mb-12"
      >
        Industries We Serve
      </h2>

      {/* Industry cards */}
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[3vw]">
          {industries.map((industry, index) => (
            <div
              key={industry.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="group relative overflow-hidden rounded-xl"
              style={{
                width: '100%',
                height: '54vh',
              }}
            >
              {/* Image with diagonal mask */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
                }}
              >
                <img
                  src={industry.image}
                  alt={industry.title}
                  width={400}
                  height={500}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bvm-navy via-bvm-navy/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-display font-semibold text-xl mb-2">
                  {industry.title}
                </h3>
                <p className="text-bvm-gray text-sm">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
