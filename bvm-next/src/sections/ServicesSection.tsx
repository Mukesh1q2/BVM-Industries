"use client";
import { ArrowRight, Factory, RefreshCw } from 'lucide-react';

import { useRouter } from 'next/navigation';

const ServicesSection = () => {
    const navigate = useRouter();

    const services = [
        {
            title: "Turnkey Projects",
            description: "End-to-end execution of Parenteral Manufacturing Plants. From blueprint to batch production, ensuring global compliance (WHO-GMP, US FDA).",
            icon: Factory,
            link: "/services/turnkey",
            color: "text-bvm-blue"
        },
        {
            title: "Refurbishment",
            description: "Complete overhaul and modernization of legacy FFS/BFS machines. Upgrade to latest HMI/PLC standards with resale & buyback options.",
            icon: RefreshCw,
            link: "/services/refurbishment",
            color: "text-emerald-400"
        }
    ];

    return (
        <section className="py-24 bg-bvm-navy-light relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute -left-[10%] top-[20%] w-[40%] h-[60%] bg-bvm-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-[8vw]">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-bvm-blue font-medium tracking-wider uppercase text-sm mb-2 block">Comprehensive Solutions</span>
                        <h2 className="headline-md text-white">
                            Beyond Machinery
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer"
                            onClick={() => navigate.push(service.link)}
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <service.icon className="w-32 h-32" />
                            </div>

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-8 ${service.color}`}>
                                    <service.icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-bvm-blue transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-bvm-text-muted text-lg mb-8 leading-relaxed max-w-md">
                                    {service.description}
                                </p>

                                <div className="flex items-center gap-3 text-white font-medium group-hover:gap-5 transition-all">
                                    Learn more
                                    <ArrowRight className="w-4 h-4 text-bvm-blue" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
