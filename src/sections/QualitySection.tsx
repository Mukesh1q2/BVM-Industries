import { Shield, Clock, Headphones } from 'lucide-react';

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
  return (
    <section
      id="about"
      className="relative bg-bvm-navy py-24 lg:py-32"
    >
      {/* Heading */}
      <h2 className="headline-md text-white px-4 sm:px-8 lg:px-[8vw] mb-12">
        Quality & Trust
      </h2>

      {/* Quality cards */}
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[3vw]">
          {qualityPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.id}
                className="group relative bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-bvm-blue/30 transition-all duration-300 flex-1 min-h-[280px]"
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
