import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Clock, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const qualityPoints = [
  {
    id: 1,
    title: 'cGMP-Aligned Design',
    description: 'Cleanroom-ready layouts, CIP/SIP-friendly forms, and documentation support.',
    icon: Shield
  },
  {
    id: 2,
    title: 'Timely Delivery',
    description: 'Milestone tracking, in-house machining, and committed schedules.',
    icon: Clock
  },
  {
    id: 3,
    title: 'After-Sales Support',
    description: 'Spare parts, troubleshooting, and on-site assistance.',
    icon: Headphones
  }
];

const QualitySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      // Heading fades in
      scrollTl.fromTo(headingRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Cards scale in with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        scrollTl.fromTo(card,
          { scale: 0.92, rotate: -2, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, ease: 'none' },
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

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        scrollTl.fromTo(card,
          { y: 0, opacity: 1 },
          { y: '-16vh', opacity: 0, ease: 'power2.in' },
          0.72 + index * 0.02
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pinned bg-bvm-navy flex flex-col justify-center"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="headline-md text-white px-4 sm:px-8 lg:px-[8vw] mb-12"
      >
        Quality & Trust
      </h2>

      {/* Quality cards */}
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[3vw]">
          {qualityPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={point.id}
                ref={el => { cardsRef.current[index] = el; }}
                className="group relative bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-bvm-blue/30 transition-all duration-300"
                style={{
                  width: '100%',
                  height: '46vh',
                }}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-bvm-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-bvm-blue/20 transition-colors">
                  <Icon className="w-7 h-7 text-bvm-blue" />
                </div>

                {/* Content */}
                <h3 className="text-white font-display font-semibold text-xl mb-4">
                  {point.title}
                </h3>
                <p className="text-bvm-gray text-sm leading-relaxed">
                  {point.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-4 right-4 w-8 h-px bg-bvm-blue/50" />
                  <div className="absolute top-4 right-4 w-px h-8 bg-bvm-blue/50" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
