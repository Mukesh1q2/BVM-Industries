import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    title: 'F.F.S Machines',
    image: '/new_assets/optimized/ffs-machine.webp',
    description: 'Advanced Form-Fill-Seal systems for sterile packaging.',
    link: '/machines/ffs'
  },
  {
    id: 2,
    title: 'B.F.S Machines',
    image: '/new_assets/optimized/bfs-machine.webp',
    description: 'Blow-Fill-Seal technology for SVP & LVP applications.',
    link: '/machines/bfs'
  },
  {
    id: 3,
    title: 'Precision Moulds',
    image: '/new_assets/optimized/mould-lvp.webp',
    description: 'High-quality moulds for BFS, PET, and Injection.',
    link: '/moulds'
  }
];

const ProductsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linkRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

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
      // Title fades in
      scrollTl.fromTo(titleRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Cards stagger in with different directions
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const directions = [
          { x: '-50vw', rotate: -6 },
          { y: '60vh', rotate: 0 },
          { x: '50vw', rotate: 6 }
        ];

        scrollTl.fromTo(card,
          {
            x: directions[index].x || 0,
            y: directions[index].y || 0,
            rotate: directions[index].rotate,
            opacity: 0
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            ease: 'none'
          },
          0.05 + index * 0.04
        );
      });

      // Link fades in
      scrollTl.fromTo(linkRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.20
      );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(titleRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        scrollTl.fromTo(card,
          { y: 0, opacity: 1 },
          { y: '-22vh', opacity: 0, ease: 'power2.in' },
          0.72 + index * 0.02
        );
      });

      scrollTl.fromTo(linkRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.78
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="section-pinned bg-bvm-navy flex flex-col justify-center"
    >
      {/* Title */}
      <h2
        ref={titleRef}
        className="headline-md text-white px-4 sm:px-8 lg:px-[8vw] mb-8"
      >
        Our Expertise
      </h2>

      {/* Product cards */}
      <div className="relative px-4 sm:px-8 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[3vw]">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              style={{
                width: '100%',
                height: '56vh',
              }}
              onClick={() => navigate(product.link)}
            >
              {/* Image with diagonal mask effect */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={500}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bvm-navy via-bvm-navy/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-display font-semibold text-xl mb-2">
                  {product.title}
                </h3>
                <p className="text-bvm-gray text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 text-bvm-blue opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <button
          ref={linkRef}
          onClick={() => navigate('/machines')}
          className="mt-8 text-bvm-blue hover:text-white font-medium flex items-center gap-2 transition-colors group"
        >
          View all machinery
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default ProductsSection;
