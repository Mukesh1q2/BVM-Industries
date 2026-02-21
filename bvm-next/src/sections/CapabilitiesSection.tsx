import { Compass, Cog, ClipboardCheck } from 'lucide-react';

const capabilities = [
  {
    id: 1,
    title: 'Design & Engineering',
    description: 'CAD/CAM, mould flow, and prototyping.',
    image: '/capability_design.webp',
    icon: Compass
  },
  {
    id: 2,
    title: 'Precision Machining',
    description: 'CNC, EDM, and surface finishing.',
    image: '/capability_machining.webp',
    icon: Cog
  },
  {
    id: 3,
    title: 'Validation & Support',
    description: 'DQ/IQ/OQ/PQ documentation and 24/7 global support.',
    image: '/capability_assembly.webp',
    icon: ClipboardCheck
  }
];

const CapabilitiesSection = () => {
  return (
    <section
      id="capabilities"
      className="relative bg-bvm-navy py-20 lg:py-32"
    >
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        {/* Heading block */}
        <div className="mb-12">
          <h2 className="headline-md text-white mb-4">
            Capabilities
          </h2>
          <p className="text-bvm-gray max-w-[52ch] text-lg">
            Design, machining, assembly, and validation—under one roof.
          </p>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[3vw]">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.id}
                className="group relative bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-none hover:bg-white/10 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]">
                  <img
                    src={capability.image}
                    alt={capability.title}
                    width={400}
                    height={300}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bvm-navy to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-bvm-blue/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-bvm-blue" />
                    </div>
                    <h3 className="text-white font-display font-semibold text-lg">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="text-bvm-text-muted text-sm">
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
