import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Truck, Send, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const CareerPage = () => {
    const [role, setRole] = useState<'employee' | 'supplier'>('employee');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(mainRef.current!.children, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const form = formRef.current!;
            const formData = new FormData(form);
            formData.append('access_key', 'af13ac37-e44c-49ce-8fbd-ea80932a48a8');
            formData.append('subject', `New ${role === 'employee' ? 'Career Application' : 'Supplier Enquiry'} — BVM Website`);
            formData.append('application_type', role);

            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                setSubmitted(true);
                toast.success('Application submitted successfully!');
            } else {
                toast.error('Something went wrong. Please email us at sales@bvmindustries.com');
            }
        } catch {
            toast.error('Network error. Please email us at sales@bvmindustries.com');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div ref={mainRef} className="pt-24 pb-20 bg-bvm-navy min-h-screen px-4 sm:px-8 lg:px-[8vw]">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <span className="text-bvm-blue font-medium tracking-wider uppercase">Join Our Network</span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                    Grow With <span className="text-bvm-blue">BVM</span>
                </h1>
                <p className="text-xl text-bvm-gray max-w-2xl mx-auto leading-relaxed">
                    Whether you're looking for a career or a partnership, we're always looking for talented individuals and reliable suppliers.
                </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                {/* Role Toggle */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => { setRole('employee'); setSubmitted(false); }}
                        className={`flex-1 py-6 flex items-center justify-center gap-3 transition-colors ${role === 'employee' ? 'bg-bvm-blue text-white' : 'text-bvm-gray hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Briefcase className="w-5 h-5" />
                        <span className="font-semibold">Career Application</span>
                    </button>
                    <button
                        onClick={() => { setRole('supplier'); setSubmitted(false); }}
                        className={`flex-1 py-6 flex items-center justify-center gap-3 transition-colors ${role === 'supplier' ? 'bg-bvm-blue text-white' : 'text-bvm-gray hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Truck className="w-5 h-5" />
                        <span className="font-semibold">Supplier / Dealer</span>
                    </button>
                </div>

                <div className="p-8 md:p-10">
                    {!submitted ? (
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-bvm-text-muted text-sm font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bvm-blue/50 focus:ring-1 focus:ring-bvm-blue/50 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-bvm-text-muted text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bvm-blue/50 focus:ring-1 focus:ring-bvm-blue/50 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-bvm-text-muted text-sm font-medium mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bvm-blue/50 focus:ring-1 focus:ring-bvm-blue/50 transition-all"
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>

                            {role === 'employee' ? (
                                <div>
                                    <label className="block text-bvm-text-muted text-sm font-medium mb-2">Position Applied For</label>
                                    <select name="position" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bvm-blue/50 focus:ring-1 focus:ring-bvm-blue/50 transition-all">
                                        <option className="bg-bvm-navy">Design Engineer</option>
                                        <option className="bg-bvm-navy">Sales Executive</option>
                                        <option className="bg-bvm-navy">Production Manager</option>
                                        <option className="bg-bvm-navy">Technician</option>
                                        <option className="bg-bvm-navy">Other</option>
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-bvm-text-muted text-sm font-medium mb-2">Business Type</label>
                                    <select name="business_type" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bvm-blue/50 focus:ring-1 focus:ring-bvm-blue/50 transition-all">
                                        <option className="bg-bvm-navy">Raw Material Supplier</option>
                                        <option className="bg-bvm-navy">Component Manufacturer</option>
                                        <option className="bg-bvm-navy">Regional Dealer/Distributor</option>
                                        <option className="bg-bvm-navy">Service Provider</option>
                                        <option className="bg-bvm-navy">Other</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-bvm-text-muted text-sm font-medium mb-2">
                                    {role === 'employee' ? 'Cover Letter / Message' : 'Company Profile / Proposal'}
                                </label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bvm-blue/50 focus:ring-1 focus:ring-bvm-blue/50 transition-all"
                                    placeholder={role === 'employee' ? "Tell us why you're a good fit..." : "Describe your offering..."}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-bvm-blue text-white font-bold py-4 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Application</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                            <p className="text-bvm-text-muted">
                                Thank you for your interest in partnering with BVM.
                                Our team will review your submission and get back to you shortly.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-8 text-bvm-blue hover:text-white transition-colors"
                            >
                                Submit another application
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CareerPage;
