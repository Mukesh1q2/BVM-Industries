"use client";
import React, { useState } from 'react';
import { useConfigurator } from './ConfiguratorContext';
import RevealSection from '../RevealSection';
import { ArrowLeft, CheckCircle2, ChevronRight, Share2, Mail, FileDown, Rocket, Layers, Droplet, Gauge, Box, Scissors, Settings2, PackagePlus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const getRecommendation = (machineType: string | null) => {
    if (machineType === 'FFS') {
        return {
            name: "BVM Advanced FFS Unit",
            desc: "High-speed Form-Fill-Seal platform optimized for small volume parenterals.",
            slug: "ffs",
            image: "/new_assets/optimized/ampoule pack -small unit dose single sterile.png"
        };
    }
    return {
        name: "BVM Enterprise BFS Line",
        desc: "Robust Blow-Fill-Seal architecture built for continuous, high-volume production.",
        slug: "bfs",
        image: "/new_assets/optimized/Iv infusion bottle standard mold sizes ffs .png"
    };
};

const ConfiguratorResults = () => {
    const { state, resetConfigurator } = useConfigurator();
    const [submitting, setSubmitting] = useState(false);

    if (state.step !== 9) return null;

    const recommendation = getRecommendation(state.machineType);

    const handleSubmitQuoteRequest = async () => {
        setSubmitting(true);
        try {
            const formData = {
                name: 'Auto-Lead (Configurator)',
                email: 'sales@mybvm.in',
                company: 'Configurator Session User',
                phone: 'N/A',
                intent: 'configurator',
                productInterest: `Configurator Lead: ${recommendation.name}`,
                message: `
[MACHINE TYPE]: ${state.machineType}
[PRODUCT CATEGORY]: ${state.productCategory}
[FILL VOLUME]: ${state.fillVolume}
[MATERIAL]: ${state.material}
[DEFLASHING SYSTEM]: ${state.deflashing}
[STATION CONFIG]: ${state.stationType}
[CAPACITY]: ${state.capacity}
[ADDONS]: ${state.addons.length > 0 ? state.addons.join(', ') : 'None'}
                `.trim()
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                toast.success('Configuration sent successfully! Our engineering team will review your specifications.');
            } else {
                toast.error('Failed to send configuration. Please try again or contact us directly.');
            }
        } catch (error) {
            console.error('Configurator Submission Error:', error);
            toast.error('An unexpected error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <RevealSection className="w-full max-w-[1200px] mx-auto mt-8 relative z-20">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full font-medium text-sm mb-6 border border-green-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    Configuration Complete
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Your Custom Production Line</h2>
                <p className="text-bvm-text-muted text-lg max-w-2xl mx-auto">
                    We&apos;ve analyzed your requirements and generated a recommended system architecture tailored to your operation.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
                {/* Left Column: Spec Summary */}
                <div className="space-y-8">
                    {/* The Spec Blueprint */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                            <Settings2 className="w-5 h-5 text-bvm-blue" />
                            System Blueprint
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                            {[
                                { label: 'Machine Type', value: state.machineType, icon: <Layers /> },
                                { label: 'Product Category', value: state.productCategory, icon: <PackagePlus /> },
                                { label: 'Fill Volume', value: state.fillVolume, icon: <Droplet /> },
                                { label: 'Material', value: state.material, icon: <Box /> },
                                { label: 'Deflashing System', value: state.deflashing, icon: <Scissors /> },
                                { label: 'Machine Config', value: state.stationType, icon: <Settings2 /> },
                                { label: 'Target Output', value: state.capacity, icon: <Gauge /> }
                            ].map((spec, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-bvm-navy/50 border border-white/5">
                                    <div className="text-bvm-blue shrink-0 mt-1">
                                        {React.cloneElement(spec.icon, { className: 'w-5 h-5' })}
                                    </div>
                                    <div>
                                        <div className="text-xs text-bvm-text-muted uppercase tracking-wider mb-1">{spec.label}</div>
                                        <div className="text-white font-medium">{spec.value || 'Not specified'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Addons Section */}
                        <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Selected Integrations</h4>
                            {state.addons.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {state.addons.map((addon, i) => (
                                        <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-bvm-blue/10 border border-bvm-blue/20 text-bvm-blue text-sm font-medium">
                                            {addon}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-bvm-text-muted italic">No optional integrations selected.</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Recommendation & Actions */}
                <div className="space-y-6">
                    {/* Top Recommendation Card */}
                    <div className="bg-gradient-to-br from-bvm-blue/20 to-bvm-navy border-2 border-bvm-blue/50 rounded-3xl p-8 backdrop-blur-sm shadow-[0_0_40px_rgba(47,143,255,0.15)]">
                        <div className="text-bvm-blue font-bold tracking-widest uppercase text-xs mb-4">Recommended Architecture</div>
                        <h3 className="text-3xl font-display font-bold text-white mb-2 leading-tight">
                            {recommendation.name}
                        </h3>
                        <p className="text-bvm-text-muted text-sm mb-6 leading-relaxed">
                            {recommendation.desc}
                        </p>

                        <div className="aspect-video relative rounded-xl overflow-hidden mb-6 bg-bvm-navy/80 border border-white/10 flex items-center justify-center p-4">
                            <img
                                src={recommendation.image}
                                alt={recommendation.name}
                                className="w-full h-full object-contain filter drop-shadow-2xl"
                            />
                        </div>

                        <Link
                            href={`/machines/${recommendation.slug}`}
                            className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-colors group"
                        >
                            <span>View Full Specifications</span>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={handleSubmitQuoteRequest}
                            disabled={submitting}
                            className="col-span-2 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-bvm-navy hover:bg-gray-100 font-bold transition-all shadow-xl hover:-translate-y-1 disabled:opacity-75 disabled:hover:translate-y-0"
                        >
                            {submitting ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-bvm-navy/30 border-t-bvm-navy rounded-full animate-spin" />
                                    Sending...
                                </span>
                            ) : (
                                <>
                                    <Mail className="w-5 h-5" />
                                    Request Formal Quote
                                </>
                            )}
                        </button>
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex justify-center border-t border-white/10 pt-6 mt-6">
                        <button
                            onClick={resetConfigurator}
                            className="flex items-center gap-2 text-bvm-text-muted hover:text-white transition-colors text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" /> Start New Configuration
                        </button>
                    </div>
                </div>
            </div>
        </RevealSection>
    );
};

export default ConfiguratorResults;
