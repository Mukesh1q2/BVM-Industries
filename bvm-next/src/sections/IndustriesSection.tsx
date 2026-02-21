const industries = [
  {
    id: 1,
    title: 'Pharmaceuticals',
    description: 'Sterile filling for Injectables (SVP/LVP), Ophthalmic, and Respiratory solutions.',
    image: '/industry_pharma.webp'
  },
  {
    id: 2,
    title: 'Food & Nutraceuticals',
    description: 'Hygiene-focused packaging for Edible Oils, Beverages, Liquid Supplements, and Nano Shots.',
    image: '/industry_industrial.webp'
  },
  {
    id: 3,
    title: 'Cosmetics & Personal Care',
    description: 'Aesthetic precision for Lotions, Serums, Essential Oils, and small-dose applicators.',
    image: '/industry_healthcare.webp'
  },
  {
    id: 4,
    title: 'Chemicals & Agrochemicals',
    description: 'Robust, leak-proof containers for Industrial Liquids, Lab Solutions, and Pheromones.',
    image: '/new_assets/optimized/ffs-machine.webp'
  }
];

const IndustriesSection = () => {
  return (
    <section
      id="industries"
      className="relative bg-bvm-navy py-24 lg:py-32"
    >
      {/* Heading */}
      <h2 className="headline-md text-white px-4 sm:px-8 lg:px-[8vw] mb-12">
        Industries We Serve
      </h2>

      {/* Industry cards */}
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-[2vw]">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="group relative overflow-hidden rounded-xl aspect-[4/5]"
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
