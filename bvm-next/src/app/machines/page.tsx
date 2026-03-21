"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ArrowRight, Filter } from 'lucide-react';
import Link from 'next/link';
import RevealSection from '@/components/RevealSection';

import { machineSeries } from '@/data/products';
const filters = [
    { id: 'all', label: 'All Applications' },
    { id: 'injectables', label: 'Injectables (LVP/SVP)' },
    { id: 'ophthalmic', label: 'Ophthalmic' },
    { id: 'respiratory', label: 'Respiratory' },
    { id: 'oral', label: 'Oral Liquids' }
];

const MachinesContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const filterParam = searchParams.get('filter');
        if (filterParam && filters.some(f => f.id === filterParam)) {
            setActiveFilter(filterParam);
        } else {
            setActiveFilter('all');
        }
    }, [searchParams]);

    const handleFilterChange = (filterId: string) => {
        setActiveFilter(filterId);
        if (filterId === 'all') { router.push(pathname, { scroll: false }); } else { router.push(`${pathname}?filter=${filterId}`, { scroll: false }); }
    };

    const machinesList = machineSeries.filter(m => m.id !== 'moulds');
    const filteredMachines = activeFilter === 'all'
        ? machinesList
        : machinesList.filter(m => m.categories.includes(activeFilter));

    return (
        <div className="pt-24 pb-20 bg-bvm-navy min-h-screen">
            {/* Header Section */}
            <RevealSection className="max-w-4xl mx-auto text-center mb-12 px-4">
                <span className="text-bvm-blue font-medium tracking-wider uppercase mb-4 block">Advanced Aseptic Machinery for Injectable Pharmaceutical Production</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                    Injectable Packaging Machinery
                </h1>
                <div className="space-y-4 text-lg text-bvm-gray max-w-3xl mx-auto leading-relaxed">
                    <p>
                        Our injectable packaging machines are engineered to deliver high-precision, contamination-free production of sterile pharmaceutical liquids. Designed for integration in aseptic manufacturing environments, these systems ensure reliable performance, consistent filling accuracy, and compliance with global pharmaceutical manufacturing standards.
                    </p>
                    <p>
                        From Blow-Fill-Seal (BFS) technology to Form-Fill-Seal (FFS) systems, our equipment enables pharmaceutical manufacturers to achieve efficient, automated, and sterile packaging processes for a wide range of injectable products.
                    </p>
                    <p>
                        Our machines are built with advanced engineering, precision tooling, and automated process control, making them suitable for modern pharmaceutical facilities operating under cGMP and international regulatory guidelines.
                    </p>
                </div>
            </RevealSection>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-16 px-4 sm:px-8 max-w-5xl mx-auto">
                <div className="flex flex-wrap justify-center gap-2 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-sm">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => handleFilterChange(filter.id)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter.id
                                ? 'bg-bvm-blue text-white shadow-lg'
                                : 'text-bvm-gray hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {activeFilter === filter.id && <Filter className="w-3 h-3" />}
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Machine Categories */}
            <div className="grid grid-cols-1 gap-12 px-4 sm:px-8 lg:px-[8vw]">
                {filteredMachines.length > 0 ? (
                    filteredMachines.map((category, index) => {
                        const dynamicContent = ('categoryContent' in category && activeFilter !== 'all')
                            ? (category.categoryContent as any)[activeFilter]
                            : null;

                        const displayDescription = dynamicContent?.description || category.description;
                        const displayApplications = dynamicContent?.applications || (category as any).applications;
                        const displayTags = dynamicContent?.tags
                            ? dynamicContent.tags
                            : category.categories.map(cat => filters.find(f => f.id === cat)?.label).filter(Boolean);

                        return (
                            <RevealSection
                                key={`${category.id}-${activeFilter}`}
                                delay={index * 150}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-bvm-blue/50 transition-colors duration-500"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                    {/* Image Section */}
                                    <div className={`relative h-64 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <img src={category.image} alt={category.title} width={600} height={400} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    {/* Content Section */}
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {displayTags.map((tag: any, idx: number) => (
                                                <span key={idx} className="text-xs font-bold uppercase tracking-wider text-bvm-blue/80 bg-bvm-blue/10 px-2 py-1 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-bvm-blue font-medium mb-2 block">{category.subtitle}</span>
                                        <h2 className="text-3xl font-display font-bold text-white mb-4">{category.title}</h2>
                                        <p className="text-bvm-text-muted text-lg mb-6 leading-relaxed">{displayDescription}</p>

                                        {/* Applications */}
                                        {displayApplications && Array.isArray(displayApplications) && (
                                            <div className="mb-8">
                                                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">End-Product Applications</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {displayApplications.map((app: any, appIdx: number) => (
                                                        <div key={appIdx} className="flex items-center gap-4 bg-[#0a0f18] rounded-xl p-3 border border-white/5 shadow-inner hover:border-bvm-blue/40 transition-all duration-300 group/app">
                                                            <div className="w-16 h-16 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 border border-white/10 group-hover/app:border-bvm-blue/50 transition-colors flex items-center justify-center p-1 bg-white/10 pb-2">
                                                                <img src={app.image} alt={app.title} loading="lazy" className="w-full h-full object-contain drop-shadow-lg" />
                                                            </div>
                                                            <span className="text-sm text-bvm-text-muted font-medium leading-snug group-hover/app:text-white transition-colors">{app.title}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <Link href={category.link} className="inline-flex items-center gap-2 text-white bg-bvm-blue px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors self-start">
                                            Explore Features
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </RevealSection>
                        );
                    })
                ) : (
                    <div className="text-center py-20">
                        <p className="text-bvm-gray text-lg">No machines found for this application.</p>
                        <button onClick={() => handleFilterChange('all')} className="text-bvm-blue mt-4 hover:underline">View All Machines</button>
                    </div>
                )}
            </div>

            {/* Extended Capabilities & Compliance Sections */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-32 space-y-24 mb-12">
                
                {/* Section 1: Why Choose */}
                <RevealSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-white mb-6">Why Choose Our Injectable Packaging Machines</h2>
                            <p className="text-bvm-gray text-lg mb-8 leading-relaxed">
                                Our machines are designed with a strong focus on precision engineering, operational reliability, and pharmaceutical compliance.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Designed for aseptic pharmaceutical manufacturing',
                                    'Built according to international engineering standards',
                                    'High accuracy filling systems',
                                    'Advanced automation and process monitoring',
                                    'Reduced contamination risk',
                                    'Long-term operational reliability',
                                    'Efficient and scalable production capability'
                                ].map((advantage, idx) => (
                                    <li key={idx} className="flex items-start gap-4 text-bvm-text-muted">
                                        <div className="mt-1.5 w-2 h-2 rounded-full bg-bvm-blue flex-shrink-0" />
                                        <span className="text-lg">{advantage}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
                            <img src="/new_assets/optimized/bfs-machine-dark.png" alt="Aseptic Manufacturing" className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-bvm-navy/30" />
                        </div>
                    </div>
                </RevealSection>

                {/* Section 2: Engineering & Standards */}
                <RevealSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 hover:border-bvm-blue/50 transition-colors">
                            <h3 className="text-2xl font-bold text-white mb-4">Engineering & Manufacturing Excellence</h3>
                            <p className="text-bvm-gray text-lg leading-relaxed mb-4">
                                All machinery is designed and manufactured using advanced CAD/CAM engineering, precision machining, and rigorous quality control processes. Our in-house tool room and manufacturing facilities enable us to deliver high-performance molds, filling systems, and critical machine components with exceptional accuracy.
                            </p>
                            <p className="text-bvm-gray text-lg leading-relaxed">
                                Our engineering team continuously works to develop innovative and reliable machinery solutions that meet the evolving needs of the pharmaceutical industry.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 hover:border-bvm-blue/50 transition-colors">
                            <h3 className="text-2xl font-bold text-white mb-4">Compliance & Quality Standards</h3>
                            <p className="text-bvm-gray text-lg leading-relaxed mb-6">
                                Our injectable packaging machinery is designed to meet the requirements of modern pharmaceutical manufacturing environments. Designed in accordance with:
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'cGMP manufacturing standards',
                                    'WHO-GMP pharmaceutical guidelines',
                                    'International sterile production practices',
                                    'Cleanroom compatible equipment design'
                                ].map((standard, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-bvm-text-muted">
                                        <div className="w-1.5 h-1.5 rounded-full bg-bvm-blue flex-shrink-0" />
                                        <span className="text-lg">{standard}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </RevealSection>

                {/* Section 3: CTA */}
                <RevealSection className="text-center bg-bvm-blue/10 border border-bvm-blue/20 rounded-3xl p-12 lg:p-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-bvm-blue/5 to-transparent pointer-events-none" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Request Technical Consultation</h2>
                        <p className="text-bvm-gray text-lg mb-10 leading-relaxed">
                            If you are planning to set up or upgrade your injectable pharmaceutical production line, our technical team can assist you in selecting the right machinery solution based on your product type, production capacity, and facility requirements.
                        </p>
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bvm-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-lg">
                            Contact Engineering Team
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </RevealSection>
            </div>
        </div>
    );
};

export default function MachinesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bvm-navy pt-32 pb-20 text-center text-bvm-gray">Loading machines...</div>}>
            <MachinesContent />
        </Suspense>
    );
}
