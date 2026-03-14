"use client";
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { machineSeries } from '@/data/products';

const ProductsSection = () => {
  const navigate = useRouter();

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
          {machineSeries.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer shadow-card hover:shadow-glow-blue transition-shadow duration-500 aspect-[4/5]"
              onClick={() => navigate.push(product.link)}
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
                  {product.shortDescription}
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
          onClick={() => navigate.push('/machines')}
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
