import { useEffect } from 'react';
import { RefreshCw, ShieldCheck, Cpu, DollarSign, Clock, Leaf } from 'lucide-react';
import SEO from '../components/SEO';
import RevealSection from '../components/RevealSection';

const RefurbishmentPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const processSteps = [
        { title: "Inspection", desc: "Complete mechanical inspection and overhaul.", icon: <ShieldCheck className="w-6 h-6 text-bvm-blue" /> },
        { title: "Restoration", desc: "Replacement of worn/obsolete components.", icon: <RefreshCw className="w-6 h-6 text-bvm-blue" /> },
        { title: "Upgrades", desc: "PLC, HMI, and control system modernization.", icon: <Cpu className="w-6 h-6 text-bvm-blue" /> },
        { title: "Validation", desc: "Performance validation & compliance testing.", icon: <ShieldCheck className="w-6 h-6 text-bvm-blue" /> }
    ];

    return (
        <>
            <SEO
                title="Refurbishment & Resale Services"
                description="Expert refurbishment of FFS and BFS machines. Cost-effective solutions with performance guarantees and PLC upgrades."
            />
            <div className="pt-24 pb-20 bg-bvm-navy min-h-screen">
                {/* Hero */}
                <RevealSection className="px-4 sm:px-8 lg:px-[8vw] mb-20 text-center">
                    <span className="text-bvm-blue font-medium tracking-wider uppercase">Lifecycle Solutions</span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                        Refurbishment & <span className="text-bvm-blue">Resale</span>
                    </h1>
                    <p className="text-xl text-bvm-gray max-w-3xl mx-auto leading-relaxed">
                        Extending the operational life of your machinery. We specialize in the professional refurbishment of F.F.S and B.F.S machines, delivering reliable, cost-effective solutions.
                    </p>
                </RevealSection>

                {/* Benefits Grid */}
                <RevealSection className="px-4 sm:px-8 lg:px-[8vw] grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-bvm-blue/50 transition-colors">
                        <DollarSign className="w-10 h-10 text-bvm-blue mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Significant Cost Savings</h3>
                        <p className="text-bvm-text-muted">A practical alternative to new equipment without compromising on performance.</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-bvm-blue/50 transition-colors">
                        <Clock className="w-10 h-10 text-bvm-blue mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Reduced Lead Times</h3>
                        <p className="text-bvm-text-muted">Get your production line running faster with our ready-to-deploy refurbished units.</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-bvm-blue/50 transition-colors">
                        <Leaf className="w-10 h-10 text-bvm-blue mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Sustainable Choice</h3>
                        <p className="text-bvm-text-muted">Promoting the sustainable reuse of industrial assets and reducing carbon footprint.</p>
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
                            <button className="bg-bvm-blue hover:bg-white hover:text-bvm-blue text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                                Contact Sales Team
                            </button>
                        </div>
                    </div>
                </RevealSection>
            </div>
        </>
    );
};

export default RefurbishmentPage;
