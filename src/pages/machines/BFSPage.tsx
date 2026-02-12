import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Shield, Settings, Activity, Server, Droplet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BFSPage = () => {
    const mainRef = useRef<HTMLDivElement>(null);

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

    return (
        <div ref={mainRef} className="pt-24 pb-20 bg-bvm-navy min-h-screen">
            {/* Hero Section */}
            <div className="px-4 sm:px-8 lg:px-[8vw] mb-20 animate-section">
                <span className="text-bvm-blue font-medium tracking-wider uppercase">Advanced Liquid Filling</span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                    Blow-Fill-Seal (BFS) <span className="text-bvm-blue">Technology</span>
                </h1>
                <p className="text-xl text-bvm-gray max-w-3xl leading-relaxed mb-8">
                    The ultimate solution for sterile packaging. Our Blow-Fill-Seal systems integrate
                    container formation, filling, and sealing into a single machine cycle, eliminating contamination risks.
                </p>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <span>Download BFS Technology Brochure</span>
                    <Settings className="w-4 h-4" />
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="px-4 sm:px-8 lg:px-[8vw] grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 animate-section">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Shield className="text-bvm-blue" />
                        Key Advantages
                    </h2>
                    <ul className="space-y-4 text-bvm-text-muted">
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Minimizes cross-contamination risk & reduces manual interventions</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Leak-free, consistent operation with high sterility assurance</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Simple operation, quick changeovers, low maintenance</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Optional nitrogen purging during fill (controlled headspace)</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Time-and-pressure dosing (TPD) for accurate, repeatable fills</span>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                        <Server className="text-bvm-blue" />
                        Control & Monitoring
                    </h2>
                    <ul className="space-y-4 text-bvm-text-muted">
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Siemens S7-1500 PLC for reliable control & data logging</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Online velocity & differential pressure monitoring</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Active air sampling & passive particle counting options</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>FDA 21 CFR Part 11 compliant audit trails</span>
                        </li>
                    </ul>
                </div>

                <div className="space-y-8 animate-section">
                    <img
                        src="/new_assets/optimized/bfs-machine.webp"
                        alt="B.F.S System"
                        width={800}
                        height={600}
                        loading="lazy"
                        className="rounded-xl shadow-2xl border border-white/10 w-full object-cover"
                    />
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Applications & Range</h3>

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2 text-bvm-blue">
                                    <Droplet className="w-5 h-5" />
                                    <span className="font-semibold text-white">Small Volume Parenterals (SVP)</span>
                                </div>
                                <p className="text-bvm-text-muted pl-8">
                                    Eye/Ear drops: 0.2 mL to 30 mL
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-2 text-bvm-blue">
                                    <Activity className="w-5 h-5" />
                                    <span className="font-semibold text-white">Large Volume Parenterals (LVP)</span>
                                </div>
                                <p className="text-bvm-text-muted pl-8">
                                    IV fluids & irrigation water: 50 mL to 3,000 mL
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Construction Standards</h3>
                        <p className="text-bvm-text-muted leading-relaxed mb-4">
                            All product-contact components are fabricated from <span className="text-white font-semibold">Stainless Steel 316L</span>.
                            Non-contact structural parts use <span className="text-white font-semibold">Stainless Steel 304</span>.
                            The design minimizes dead legs and supports sanitary flow.
                        </p>
                    </div>
                </div>
            </div>

            {/* Representative Models Table */}
            <div className="px-4 sm:px-8 lg:px-[8vw] mb-20 animate-section">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-bvm-blue pl-4">
                    Representative Models & Performance
                </h2>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left text-sm text-bvm-text-muted">
                        <thead className="bg-white/10 text-white uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Model</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Key Features</th>
                                <th className="px-6 py-4">Capacity Range</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 bg-white/5">
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">BFS-8166</td>
                                <td className="px-6 py-4">SVP High-Speed</td>
                                <td className="px-6 py-4">Servo motions, auto CIP/SIP, online monitoring, 21 CFR Part 11</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">Up to 13,500/hr</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">BFS-540</td>
                                <td className="px-6 py-4">LVP Standard</td>
                                <td className="px-6 py-4">Hydraulic motion option, Siemens S7-1500, maintenance-friendly</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">~3,350/hr (12 Cav)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">940 Series</td>
                                <td className="px-6 py-4">LVP High-Output</td>
                                <td className="px-6 py-4">Multiple cavity configurations, high throughput capacity</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">Up to 6,700/hr</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-8 p-6 bg-bvm-blue/10 rounded-xl border border-bvm-blue/20">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Settings className="w-4 h-4" /> Service & Documentation
                    </h4>
                    <p className="text-bvm-text-muted text-sm">
                        Complete validation packages (DQ/IQ/OQ/PQ) and commissioning support included.
                        Spare parts and remote/online service available 24×7.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BFSPage;
