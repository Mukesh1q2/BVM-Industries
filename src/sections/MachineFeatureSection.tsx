import { ArrowRight } from 'lucide-react';

const MachineFeatureSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32 min-h-[70vh] flex items-center"
    >
      {/* Full-bleed background image */}
      <img
        src="/machine_feature_bg.webp"
        alt="Blow moulding production line"
        width={1920}
        height={1080}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(11,15,23,0.92) 0%, rgba(11,15,23,0.50) 55%, rgba(11,15,23,0.20) 100%)'
        }}
      />

      {/* Text block */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-[8vw]">
        <h2 className="headline-lg text-white max-w-full lg:max-w-[44vw] mb-6">
          High-Output<br />
          Moulding<br />
          Systems
        </h2>

        <p className="body-text max-w-full lg:max-w-[34vw] mb-8">
          Robust extrusion blow moulding and blow-fill-seal solutions—designed
          for continuous production, quick changeovers, and aseptic-ready environments.
        </p>

        <button
          onClick={() => scrollToSection('#contact')}
          className="btn-primary w-fit"
        >
          Explore Machines
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </section>
  );
};

export default MachineFeatureSection;
