import { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Factory, CheckSquare, Settings, BadgeCheck } from 'lucide-react';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const TurnkeyPage = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.animate-section').forEach((section: any) => {
                gsap.from(section, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    }
                });
            });
        }, mainRef);
        return () => ctx.revert();
    }, []);

    const services = [
        "Conceptual Design & Master Planning",
        "Cleanroom Engineering & HVAC Systems",
        "Water Systems (PW / WFI / Clean Steam)",
        "Sterile Filling & Lyophilization Lines",
        "Autoclaves & Sterilization Systems",
        "Electrical, Automation & 21 CFR Part 11"
    ];

    const standards = ["WHO-GMP", "cGMP Standards", "EU GMP Guidelines", "US FDA Regulations"];

    return (
        <>
            <SEO
                title="Turnkey Plant Installation"
                description="World-class turnkey solutions for Parenteral Manufacturing Plants. From blueprint to batch production, ensuring global regulatory compliance."
            />
            <div ref={mainRef} className="pt-24 pb-20 bg-bvm-navy min-h-screen">
                {/* Hero */}
                <div className="px-4 sm:px-8 lg:px-[8vw] mb-20 animate-section">
                    <span className="text-bvm-blue font-medium tracking-wider uppercase">Project Execution</span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                        Turnkey <span className="text-bvm-blue">Solutions</span>
                    </h1>
                    <p className="text-xl text-bvm-gray max-w-3xl leading-relaxed mb-8">
                        We deliver complete turnkey solutions for Parenteral (Sterile Injectable) Manufacturing Facilities — engineered for performance, designed for compliance, and built for global regulatory approval.
                    </p>
                </div>

                {/* End-to-End Execution */}
                <div className="px-4 sm:px-8 lg:px-[8vw] grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 animate-section">
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
                            Global Compliance
                        </h3>
                        <p className="text-bvm-gray mb-6">
                            Our projects are executed in strict accordance with international regulatory standards, ensuring your facility is future-ready.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {standards.map((std, idx) => (
                                <div key={idx} className="bg-bvm-navy/50 p-4 rounded-lg border border-white/5 text-center">
                                    <span className="text-white font-semibold">{std}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Value Proposition */}
                <div className="px-4 sm:px-8 lg:px-[8vw] animate-section">
                    <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-bvm-blue pl-4">Precision. Compliance. Performance.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <CheckSquare className="w-8 h-8 text-bvm-blue mb-4" />
                            <h4 className="text-white font-bold mb-2">Optimized Layouts</h4>
                            <p className="text-sm text-bvm-text-muted">Efficient facility design focusing on contamination control strategies.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <CheckSquare className="w-8 h-8 text-bvm-blue mb-4" />
                            <h4 className="text-white font-bold mb-2">Validated Utilities</h4>
                            <p className="text-sm text-bvm-text-muted">Fully validated sterile processing systems and utility integrations.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <CheckSquare className="w-8 h-8 text-bvm-blue mb-4" />
                            <h4 className="text-white font-bold mb-2">On-Time Delivery</h4>
                            <p className="text-sm text-bvm-text-muted">From blueprint to batch production, we deliver excellence at every stage.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TurnkeyPage;
