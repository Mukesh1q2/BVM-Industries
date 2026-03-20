import HeroSection from '@/sections/HeroSection';
import TrustBar from '@/components/TrustBar';
import EngineeredSection from '@/sections/EngineeredSection';
import ProductsSection from '@/sections/ProductsSection';
import ServicesSection from '@/sections/ServicesSection';
import CapabilitiesSection from '@/sections/CapabilitiesSection';
import IndustriesSection from '@/sections/IndustriesSection';
import QualitySection from '@/sections/QualitySection';
import ContactSection from '@/sections/ContactSection';
import ClientStripSection from '@/sections/ClientStripSection';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <TrustBar />
      <ProductsSection />
      <EngineeredSection />
      <ClientStripSection />
      <ServicesSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <QualitySection />
      <ContactSection />
    </div>
  );
}
