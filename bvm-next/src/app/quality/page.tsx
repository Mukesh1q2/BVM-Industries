"use client";
import { useEffect } from 'react';
import { Shield, Clock, Headphones, Award, FileCheck, CheckCircle } from 'lucide-react';

import RevealSection from '@/components/RevealSection';

const QualityPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const qualityPoints = [
        {
            title: 'cGMP-Aligned Design',
            description: 'Cleanroom-ready layouts, CIP/SIP-friendly forms, and documentation support.',
            icon: Shield
        },
        {
            title: 'Timely Delivery',
            description: 'Milestone tracking, in-house machining, and committed schedules.',
            icon: Clock
        },
        {
            title: 'After-Sales Support',
            description: 'Spare parts, troubleshooting, and on-site assistance.',
            icon: Headphones
        },
        {
            title: 'Rigorous Testing',
            description: 'Factory Acceptance Testing (FAT) and Site Acceptance Testing (SAT) for every machine.',
            icon: CheckCircle
        },
        {
            title: 'Documentation',
            description: 'Comprehensive DQ, IQ, OQ, PQ manuals provided to ensure regulatory compliance.',
            icon: FileCheck
        },
        {
            title: 'ISO Certification',
            description: 'Manufacturing processes certified to ISO 9001:2015 standards.',
            icon: Award
        }
    ];

    return (
        <>
            <div className="pt-24 pb-20 bg-bvm-navy min-h-screen">
                {/* Hero */}
                <RevealSection className="px-4 sm:px-8 lg:px-[8vw] mb-20 text-center">
                    <span className="text-bvm-blue font-medium tracking-wider uppercase">Our Commitment</span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                        Quality <span className="text-bvm-blue">Assurance</span>
                    </h1>
                    <p className="text-xl text-bvm-gray max-w-3xl mx-auto leading-relaxed">
                        At BVM Industries, quality assurance is an uncompromising protocol.
                        From the metallurgical integrity of our SS316L manifolds to the final
                        software validation of Siemens PLC systems, we mandate zero-defect
                        execution across our entire 7.0-Ton manufacturing footprint.
                    </p>
                </RevealSection>

                {/* Quality Grid */}
                <RevealSection className="px-4 sm:px-8 lg:px-[8vw]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {qualityPoints.map((point, idx) => {
                            const Icon = point.icon;
                            return (
                                <div key={idx} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-bvm-blue/50 transition-colors group">
                                    <div className="w-14 h-14 bg-bvm-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-bvm-blue/20 transition-colors">
                                        <Icon className="w-7 h-7 text-bvm-blue" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                                    <p className="text-bvm-text-muted leading-relaxed">{point.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </RevealSection>

                {/* Compliance Statement */}
                <RevealSection className="px-4 sm:px-8 lg:px-[8vw] mt-24">
                    <div className="bg-gradient-to-r from-bvm-blue/20 to-bvm-navy border border-bvm-blue/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-white mb-4">Regulatory Compliance</h2>
                            <p className="text-bvm-gray mb-6">
                                BVM machinery is manufactured to exceed the industry's most stringent
                                global standards. Our engineering team provides comprehensive
                                DQ, IQ, OQ, and PQ validation protocols to ensure frictionless
                                compliance with US FDA 21 CFR Part 11, MHRA, and EU GMP mandates.
                            </p>
                            <div className="flex gap-4">
                                <div className="px-4 py-2 bg-white/10 rounded-lg text-white font-semibold text-sm">US FDA</div>
                                <div className="px-4 py-2 bg-white/10 rounded-lg text-white font-semibold text-sm">WHO-GMP</div>
                                <div className="px-4 py-2 bg-white/10 rounded-lg text-white font-semibold text-sm">EU GMP</div>
                            </div>
                        </div>
                        <div className="w-full md:w-auto flex justify-center">
                            <Shield className="w-32 h-32 text-bvm-blue/20" />
                        </div>
                    </div>
                </RevealSection>
            </div>
        </>
    );
};

export default QualityPage;
