import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    title: 'F.F.S Machines',
    image: '/new_assets/optimized/ffs-machine.webp',
    description: 'Advanced Form-Fill-Seal systems for sterile packaging.',
    link: '/machines/ffs',
  },
  {
    id: 2,
    title: 'B.F.S Machines',
    image: '/new_assets/optimized/bfs-machine.webp',
    description: 'Blow-Fill-Seal technology for SVP & LVP applications.',
    link: '/machines/bfs',
  },
  {
    id: 3,
    title: 'Euro Cap Sealing',
    image: '/new_assets/optimized/cap-sealing-machine.webp',
    description: 'High-speed sealing & welding for plastic bottles.',
    link: '/machines/euro-cap-sealing',
  },
  {
    id: 4,
    title: 'Precision Moulds',
    image: '/new_assets/optimized/mould-lvp.webp',
    description: 'High-quality moulds for BFS, PET, and Injection.',
    link: '/moulds',
  }
];

const ProductsSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="products"
      className="relative bg-bvm-navy py-24 lg:py-32"
    >
      {/* Title */}
      <h2 className="headline-md text-white px-4 sm:px-8 lg:px-[8vw] mb-8">
        Our Expertise
      </h2>

      {/* Product cards */}
      <div className="relative px-4 sm:px-8 lg:px-[8vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-[1.5vw]">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer shadow-card hover:shadow-glow-blue transition-shadow duration-500 aspect-[4/5]"
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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bvm-navy via-bvm-navy/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-display font-semibold text-xl mb-2">
                  {product.title}
                </h3>
                <p className="text-bvm-gray text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 text-bvm-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <button
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
