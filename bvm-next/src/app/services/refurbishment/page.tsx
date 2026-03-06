import { RefreshCw, ShieldCheck, Cpu, DollarSign, Clock, Leaf } from 'lucide-react';
import RevealSection from '@/components/RevealSection';

export const metadata = {
    title: "Refurbishment & Resale Services | BVM Industries",
    description: "Expert refurbishment of FFS and BFS machines. Cost-effective solutions with performance guarantees and PLC upgrades."
};

const processSteps = [
    { title: "Comprehensive Inspection", desc: "We conduct a thorough evaluation of your machine to identify areas for improvement and necessary repairs.", icon: <ShieldCheck className="w-6 h-6 text-bvm-blue" /> },
    { title: "Quality Upgrades", desc: "We replace worn-out parts with high-quality components and integrate advanced automation systems.", icon: <Cpu className="w-6 h-6 text-bvm-blue" /> },
    { title: "Rigorous Testing", desc: "Stringent testing to ensure it meets our quality and safety benchmarks before re-entering production.", icon: <ShieldCheck className="w-6 h-6 text-bvm-blue" /> },
    { title: "Restoration", desc: "Detailed mechanical restoration and modernization to current operational standards.", icon: <RefreshCw className="w-6 h-6 text-bvm-blue" /> }
];

export default function RefurbishmentPage() {
    return (
        <div className="pt-24 pb-20 bg-bvm-navy min-h-screen">
            {/* Hero */}
            <RevealSection className="px-4 sm:px-8 lg:px-[8vw] mb-20 text-center">
                <span className="text-bvm-blue font-medium tracking-wider uppercase">Lifecycle Solutions</span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                    Refurbishing <span className="text-bvm-blue">& Resale</span>
                </h1>
                <p className="text-xl text-bvm-gray max-w-3xl mx-auto leading-relaxed">
                    Unlocking Value through Expert Refurbishment. We recognize that investing in packaging machinery is a significant commitment. That’s why we offer specialized refurbishing services for Form Fill Seal (F.F.S) and Blow Fill Seal (B.F.S) machines, providing a cost-effective alternative to purchasing new equipment while maintaining high performance and reliability standards.
                </p>
            </RevealSection>

            {/* Benefits Grid */}
            <RevealSection className="px-4 sm:px-8 lg:px-[8vw] grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-bvm-blue/50 transition-colors">
                    <DollarSign className="w-10 h-10 text-bvm-blue mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Cost Efficiency</h3>
                    <p className="text-bvm-text-muted">Refurbishing extends the life of your existing machinery at a fraction of the cost of new equipment, maximizing ROI.</p>
                </div>
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-bvm-blue/50 transition-colors">
                    <Clock className="w-10 h-10 text-bvm-blue mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Enhanced Performance</h3>
                    <p className="text-bvm-text-muted">Meticulously inspecting and upgrading vital components, integrating the latest tech to improve efficiency and output.</p>
                </div>
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-bvm-blue/50 transition-colors">
                    <Leaf className="w-10 h-10 text-bvm-blue mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Sustainability</h3>
                    <p className="text-bvm-text-muted">By choosing to refurbish, you contribute to a more sustainable packaging industry by reducing waste and conserving resources.</p>
                </div>
            </RevealSection>

            {/* Process Section */}
            <RevealSection className="px-4 sm:px-8 lg:px-[8vw] mb-24">
                <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-bvm-blue pl-4">Our Refurbishment Process</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {processSteps.map((step, idx) => (
                        <div key={idx} className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center text-center">
                            <div className="bg-white/10 p-4 rounded-full mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-bvm-text-muted text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </RevealSection>

            {/* Resale & Buyback */}
            <RevealSection className="px-4 sm:px-8 lg:px-[8vw]">
                <div className="bg-gradient-to-br from-bvm-blue/20 to-bvm-navy border border-bvm-blue/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-6">Resale & Buyback Services</h2>
                        <p className="text-bvm-gray mb-8 max-w-2xl">
                            We assist clients in reselling surplus or idle F.F.S and B.F.S machines. Our team evaluates equipment condition, manages refurbishment, and connects sellers with qualified buyers throughout our industry network.
                        </p>
                        <a href="/contact?intent=resale" className="inline-block bg-bvm-blue hover:bg-white hover:text-bvm-blue text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                            Contact Sales Team
                        </a>
                    </div>
                </div>
            </RevealSection>
        </div>
    );
}
