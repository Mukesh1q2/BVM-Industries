import HeroSection from '../sections/HeroSection';
import TrustBar from '../components/TrustBar';
import EngineeredSection from '../sections/EngineeredSection';
import ProductsSection from '../sections/ProductsSection';
import MachineFeatureSection from '../sections/MachineFeatureSection';
import ServicesSection from '../sections/ServicesSection';
import CapabilitiesSection from '../sections/CapabilitiesSection';
import IndustriesSection from '../sections/IndustriesSection';
import QualitySection from '../sections/QualitySection';
import ContactSection from '../sections/ContactSection';

const HomePage = () => {
  return (
    <main className="relative">
      <HeroSection />
      <TrustBar />
      <EngineeredSection />
      <ProductsSection />
      <ServicesSection />
      <MachineFeatureSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <QualitySection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
