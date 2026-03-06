import { Factory, CheckSquare, Settings, BadgeCheck } from 'lucide-react';
import RevealSection from '@/components/RevealSection';

export const metadata = {
    title: "Turnkey Plant Installation | BVM Industries",
    description: "World-class turnkey solutions for Parenteral Manufacturing Plants. From blueprint to batch production, ensuring global regulatory compliance.",
};

const services = [
    "Conceptual Design & Master Planning",
    "Cleanroom Engineering & HVAC Systems",
    "Water Systems (PW / WFI / Clean Steam)",
    "Sterile Filling & Lyophilization Lines",
    "Autoclaves, Depyrogenation & Sterilization Systems",
    "Isolator & RABS Technology",
    "Electrical, Automation & 21 CFR Part 11 Compliance",
    "Validation (DQ, IQ, OQ, PQ) & Regulatory Documentation",
    "Audit Preparation & Compliance Support"
];

const standards = ["WHO-GMP", "cGMP Standards", "EU GMP Guidelines", "US FDA Regulations", "Other Int'l Authorities", "Data Integrity"];

export default function TurnkeyPage() {
    return (
        <div className="pt-24 pb-20 bg-bvm-navy min-h-screen">
            {/* Hero */}
            <RevealSection className="px-4 sm:px-8 lg:px-[8vw] mb-20">
                <span className="text-bvm-blue font-medium tracking-wider uppercase">Project Execution</span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                    Parenteral Manufacturing <span className="text-bvm-blue">Plant Installation</span>
                </h1>
                <p className="text-xl text-bvm-gray max-w-3xl leading-relaxed mb-8">
                    We deliver complete turnkey solutions for Parenteral (Sterile Injectable) Manufacturing Facilities — engineered for performance, designed for compliance, and built for global regulatory approval. From concept to commissioning, we take full responsibility for transforming your vision into a fully operational, internationally compliant sterile manufacturing facility.
                </p>
            </RevealSection>

            {/* End-to-End Execution */}
            <RevealSection className="px-4 sm:px-8 lg:px-[8vw] grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Factory className="text-bvm-blue" />
                        End-to-End Execution
                    </h2>
                    <ul className="space-y-4">
                        {services.map((service, idx) => (
                            <li key={idx} className="flex gap-4 items-start text-bvm-text-muted">
                                <div className="mt-1 bg-white/10 p-1 rounded">
                                    <Settings className="w-4 h-4 text-bvm-blue" />
                                </div>
                                <span>{service}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <BadgeCheck className="text-bvm-blue" />
                        Built to Meet Global Standards
                    </h3>
                    <p className="text-bvm-gray mb-6">
                        Our projects are executed in strict accordance with international regulatory authorities. Every facility is designed to meet the highest expectations for sterility assurance, contamination control, quality systems, and data integrity.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {standards.map((std, idx) => (
                            <div key={idx} className="bg-bvm-navy/50 p-4 rounded-lg border border-white/5 text-center">
                                <span className="text-white font-semibold">{std}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </RevealSection>

            {/* Value Proposition */}
            <RevealSection className="px-4 sm:px-8 lg:px-[8vw]">
                <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-bvm-blue pl-4">Precision. Compliance. Performance.</h2>
                <p className="text-bvm-gray mb-8">We do not just build facilities — we deliver regulatory-approved, future-ready sterile manufacturing environments that empower pharmaceutical companies to compete confidently in global markets. With deep pharmaceutical engineering expertise and global compliance knowledge, we stand as a reliable partner.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <CheckSquare className="w-8 h-8 text-bvm-blue mb-4" />
                        <h4 className="text-white font-bold mb-2">Optimized Layouts</h4>
                        <p className="text-sm text-bvm-text-muted">Efficient facility design focusing on strict contamination control strategies.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <CheckSquare className="w-8 h-8 text-bvm-blue mb-4" />
                        <h4 className="text-white font-bold mb-2">Validated Systems</h4>
                        <p className="text-sm text-bvm-text-muted">Fully validated sterile processing utilities built to international quality engineering standards.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <CheckSquare className="w-8 h-8 text-bvm-blue mb-4" />
                        <h4 className="text-white font-bold mb-2">On-Time Delivery</h4>
                        <p className="text-sm text-bvm-text-muted">From blueprint to batch production, providing regulatory-ready documentation at every stage.</p>
                    </div>
                </div>
            </RevealSection>
        </div>
    );
}
