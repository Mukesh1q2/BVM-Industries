import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Cog, ClipboardCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: 1,
    title: 'Design & Engineering',
    description: 'CAD/CAM, mould flow, and prototyping.',
    image: '/capability_design.jpg',
    icon: Compass
  },
  {
    id: 2,
    title: 'Precision Machining',
    description: 'CNC, EDM, and surface finishing.',
    image: '/capability_machining.jpg',
    icon: Cog
  },
  {
    id: 3,
    title: 'Validation & Support',
    description: 'DQ/IQ/OQ/PQ documentation and 24/7 global support.',
    image: '/capability_assembly.jpg',
    icon: ClipboardCheck
  }
];

const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          { y: '10vh', rotate: -2, opacity: 0 },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative bg-bvm-light py-20 lg:py-32"
    >
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        {/* Heading block */}
        <div ref={headingRef} className="mb-12">
          <h2 className="headline-md text-bvm-navy mb-4">
            Capabilities
          </h2>
          <p className="text-bvm-navy/70 max-w-[52ch] text-lg">
            Design, machining, assembly, and validation—under one roof.
          </p>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[3vw]">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.id}
                ref={el => { cardsRef.current[index] = el; }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div
                  className="relative h-48 overflow-hidden"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
                  }}
                >
                  <img
                    src={capability.image}
                    alt={capability.title}
                    width={400}
                    height={300}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bvm-navy/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-bvm-blue/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-bvm-blue" />
                    </div>
                    <h3 className="text-bvm-navy font-display font-semibold text-lg">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="text-bvm-navy/60 text-sm">
                    {capability.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative diagonal line */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bvm-blue/30 to-transparent" />
      </div>
    </section>
  );
};

export default CapabilitiesSection;
