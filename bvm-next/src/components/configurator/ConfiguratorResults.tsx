"use client";
import { useConfigurator } from './ConfiguratorContext';
import RevealSection from '../RevealSection';
import { ArrowRight, Download, CheckCircle, Factory, X, Loader2, User, Building, Mail, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

const getRecommendation = (state: any) => {
    // Simple heuristic engine based on input
    let machine = { name: 'Full-Scale B.F.S Machine', link: '/machines/bfs', img: '/new_assets/optimized/bfs-machine.webp' };

    if (state.productType === 'iv_fluids' || state.productType === 'oral') {
        if (state.volumeRange === 'large' || state.speed === 'high') {
            machine = { name: 'High-Capacity F.F.S System', link: '/machines/ffs', img: '/new_assets/optimized/ffs-machine.webp' };
        } else {
            machine = { name: 'Standard B.F.S System (LVP)', link: '/machines/bfs', img: '/new_assets/optimized/bfs-machine.webp' };
        }
    } else if (state.productType === 'ampoule' || state.productType === 'ophthalmic') {
        if (state.speed === 'low') {
            machine = { name: 'Precision Euro Cap Sealer', link: '/machines/euro-cap-sealing', img: '/new_assets/optimized/cap-sealing-machine.webp' };
        } else {
            machine = { name: 'High-Speed B.F.S System (SVP)', link: '/machines/bfs', img: '/new_assets/optimized/bfs-machine.webp' };
        }
    }

    return machine;
};

const formatValue = (val: string | null) => {
    if (!val) return 'N/A';
    return val.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const ConfiguratorResults = () => {
    const { state, resetConfigurator } = useConfigurator();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
    });

    if (state.step !== 5) return null;

    const recommendation = getRecommendation(state);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleWeb3FormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                access_key: 'af13ac37-e44c-49ce-8fbd-ea80932a48a8',
                subject: `New Line Configurator Lead: ${formData.company || formData.name}`,
                from_name: formData.name,
                name: formData.name,
                email: formData.email,
                company: formData.company,
                phone: formData.phone,
                // Injecting the configurator state into the email body manually
                configuration_product: state.productType,
                configuration_volume: state.volumeRange,
                configuration_speed: state.speed,
                configuration_addons: state.addons.join(", "),
                recommended_machine: recommendation.name,
                message: `The user generated a Build-Your-Line configuration:\n\nProduct Domain: ${formatValue(state.productType)}\nVolume: ${formatValue(state.volumeRange)}\nSpeed: ${formatValue(state.speed)}\nAdd-ons: ${state.addons.join(', ')}\n\nRecommended: ${recommendation.name}`
            };

            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                toast.success('Configuration sent successfully! Our sales team will contact you shortly.');
                setIsModalOpen(false);
                setFormData({ name: '', company: '', email: '', phone: '' });
            } else {
                toast.error('Something went wrong. Please email us directly at sales@bvmindustries.com');
            }
        } catch {
            toast.error('Network error. Please email us directly at sales@bvmindustries.com');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <RevealSection className="w-full max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-bvm-blue/20 text-bvm-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <Factory className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Your Optimal Setup</h2>
                <p className="text-bvm-text-muted text-lg max-w-2xl mx-auto">
                    Based on your production requirements, we have engineered the perfect configuration for your facility.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Recommendation Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col items-center text-center">
                    <h3 className="text-sm font-bold text-bvm-blue uppercase tracking-widest mb-6 border-b border-white/10 pb-4 w-full">Primary Recommendation</h3>

                    <img
                        src={recommendation.img}
                        alt={recommendation.name}
                        className="w-full max-w-md h-auto object-cover rounded-2xl mb-6 shadow-xl"
                    />

                    <h4 className="text-2xl font-bold text-white mb-4">{recommendation.name}</h4>
                    <p className="text-bvm-text-muted mb-8 leading-relaxed">
                        Engineered precisely for {formatValue(state.volumeRange)} volumes of {formatValue(state.productType)} at {formatValue(state.speed)} throughput.
                    </p>

                    <div className="mt-auto w-full space-y-4">
                        <Link
                            href={recommendation.link}
                            className="w-full flex items-center justify-center gap-2 bg-bvm-blue hover:bg-blue-600 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg shadow-bvm-blue/20"
                        >
                            View Machine Specifications <ArrowRight className="w-5 h-5" />
                        </Link>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-xl font-bold transition-all border border-white/10"
                        >
                            <Download className="w-5 h-5" /> Request Quotation & BOM
                        </button>
                    </div>
                </div>

                {/* Requirements Summary */}
                <div className="bg-bvm-navy-light text-white rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-bvm-blue/10 blur-[100px] rounded-full"></div>

                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Configuration Summary</h3>

                    <div className="space-y-6 flex-grow relative z-10">
                        <div>
                            <p className="text-white/40 text-sm mb-1 uppercase tracking-wide">Product Domain</p>
                            <p className="text-xl font-medium">{formatValue(state.productType)}</p>
                        </div>
                        <div>
                            <p className="text-white/40 text-sm mb-1 uppercase tracking-wide">Target Volume</p>
                            <p className="text-xl font-medium">{formatValue(state.volumeRange)} Container</p>
                        </div>
                        <div>
                            <p className="text-white/40 text-sm mb-1 uppercase tracking-wide">Throughput Speed</p>
                            <p className="text-xl font-medium">{formatValue(state.speed)} Parts/Hour</p>
                        </div>
                        <div>
                            <p className="text-white/40 text-sm mb-1 uppercase tracking-wide">System Add-ons</p>
                            <div className="mt-2 flex flex-col gap-2">
                                {state.addons.length > 0 ? (
                                    state.addons.map((a) => (
                                        <div key={a} className="flex items-center gap-2 text-bvm-blue-light font-medium bg-bvm-blue/10 px-3 py-2 rounded-lg w-max">
                                            <CheckCircle className="w-4 h-4" /> {formatValue(a)}
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-white/40 italic">No add-ons selected</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={resetConfigurator}
                        className="mt-8 text-white/50 hover:text-white text-sm uppercase tracking-widest font-bold underline underline-offset-4 transition-colors text-center w-full"
                    >
                        Start Over
                    </button>
                </div>
            </div>

            {/* Lead Capture Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-bvm-navy/80 backdrop-blur-sm">
                    <div className="bg-bvm-navy-light border border-white/10 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-fade-in-up">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-bvm-gray hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h3 className="text-2xl font-bold text-white mb-2">Request Detailed BOM</h3>
                        <p className="text-bvm-text-muted text-sm mb-6">
                            Enter your details below and our engineering team will send you a tailored bill of materials and pricing estimate based on your configuration.
                        </p>

                        <form onSubmit={handleWeb3FormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-white text-sm font-medium mb-1.5"><User className="w-3.5 h-3.5 inline mr-1" /> Name *</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleInput} className="w-full px-4 py-2.5 bg-bvm-navy border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors" placeholder="Your full name" />
                            </div>
                            <div>
                                <label className="block text-white text-sm font-medium mb-1.5"><Building className="w-3.5 h-3.5 inline mr-1" /> Company</label>
                                <input type="text" name="company" value={formData.company} onChange={handleInput} className="w-full px-4 py-2.5 bg-bvm-navy border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors" placeholder="Your company name" />
                            </div>
                            <div>
                                <label className="block text-white text-sm font-medium mb-1.5"><Mail className="w-3.5 h-3.5 inline mr-1" /> Email *</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleInput} className="w-full px-4 py-2.5 bg-bvm-navy border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-white text-sm font-medium mb-1.5"><Phone className="w-3.5 h-3.5 inline mr-1" /> Phone</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInput} className="w-full px-4 py-2.5 bg-bvm-navy border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors" placeholder="+91..." />
                            </div>

                            <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                                ) : (
                                    <>Submit Request <Send className="w-4 h-4 ml-2" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </RevealSection>
    );
};

export default ConfiguratorResults;
