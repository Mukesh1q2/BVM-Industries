import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Zap, Shield, Settings, Activity, Server, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FFSPage = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate sections on scroll
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
            <div className="px-4 sm:px-8 lg:px-[8vw] mb-20">
                <span className="text-bvm-blue font-medium tracking-wider uppercase">Advanced Aseptic Technology</span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                    Form–Fill–Seal (FFS) <span className="text-bvm-blue">System</span>
                </h1>
                <p className="text-xl text-bvm-gray max-w-3xl leading-relaxed mb-8">
                    A fully indigenous, cost-effective aseptic filling system for pharmaceutical liquids.
                    The FFS technology forms the container, fills it with liquid, and seals it in a continuous, sterile process.
                </p>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <span>Download 540/940 Series Brochure</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="px-4 sm:px-8 lg:px-[8vw] grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 animate-section">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Shield className="text-bvm-blue" />
                        Construction & Compliance
                    </h2>
                    <ul className="space-y-4 text-bvm-text-muted">
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Product-wetted parts: Stainless Steel 316L</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Non-contact parts: Stainless Steel 304</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Full DQ/IQ/OQ/PQ documentation support</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>FDA 21 CFR Part 11 Compliance support</span>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                        <Zap className="text-bvm-blue" />
                        Operational Highlights
                    </h2>
                    <ul className="space-y-4 text-bvm-text-muted">
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Time-and-pressure dosing (TPD) for accurate filling</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Sanitary zero-dead-leg valves</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Ultrasonic cutter or cold-knife parison cutting</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Fully servo-motor driven motion control</span>
                        </li>
                    </ul>
                </div>

                <img
                    src="/new_assets/optimized/ffs-machine.webp"
                    alt="F.F.S System"
                    width={800}
                    height={600}
                    loading="lazy"
                    className="rounded-xl shadow-2xl border border-white/10 w-full object-cover"
                />
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Process Capabilities</h3>

                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-3 text-bvm-blue">
                                <Settings className="w-5 h-5" />
                                <span className="font-semibold">Filling Ranges</span>
                            </div>
                            <p className="text-bvm-text-muted pl-8">
                                <strong className="text-white block mb-1">SVP / Eye/Ear drops:</strong> 0.2 mL to 30 mL
                                <br />
                                <strong className="text-white block mt-2 mb-1">LVP / IV fluids:</strong> 50 mL to 3,000 mL
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-3 text-bvm-blue">
                                <Activity className="w-5 h-5" />
                                <span className="font-semibold">Sterilization & Cleaning</span>
                            </div>
                            <p className="text-bvm-text-muted pl-8">
                                Integrated CIP (Cleaning-In-Place) and SIP (Sterilization-In-Place) with printed cycle records.
                                Optional nitrogen flushing for controlled headspace.
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-3 text-bvm-blue">
                                <Server className="w-5 h-5" />
                                <span className="font-semibold">Control System</span>
                            </div>
                            <p className="text-bvm-text-muted pl-8">
                                Siemens S7-1500 PLC platform with SCADA, data logging, and cloud connectivity options.
                                Real-time audit trails and batch reports.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Specifications - LVP Table */}
            <div className="px-4 sm:px-8 lg:px-[8vw] mb-20 animate-section">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-bvm-blue pl-4">
                    Large Volume Parenterals (LVP)
                </h2>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left text-sm text-bvm-text-muted">
                        <thead className="bg-white/10 text-white uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">IV Fluids (Small)</th>
                                <th className="px-6 py-4">IV Fluids (Medium)</th>
                                <th className="px-6 py-4">IV Fluids (Large)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 bg-white/5">
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">MODEL 540</td>
                                <td className="px-6 py-4">50ML/ 100ML</td>
                                <td className="px-6 py-4">100ML/ 300ML/ 500ML</td>
                                <td className="px-6 py-4">100/ 300/ 500/ 1000ML</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Cavities</td>
                                <td className="px-6 py-4">12</td>
                                <td className="px-6 py-4">8</td>
                                <td className="px-6 py-4">6</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Moulds</td>
                                <td className="px-6 py-4">100ML</td>
                                <td className="px-6 py-4">100ML/ 300+500ML</td>
                                <td className="px-6 py-4">300ML/ 300+500ML/ 1000ML</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Capacity / Hr</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">3350</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">2050</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">1500</td>
                            </tr>
                            <tr className="bg-white/10">
                                <td className="px-6 py-4 font-medium text-white">MODEL 940</td>
                                <td className="px-6 py-4">50ML/ 100ML</td>
                                <td className="px-6 py-4">100ML/ 300ML/ 500ML</td>
                                <td className="px-6 py-4">100/ 300/ 500/ 1000ML</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Cavities</td>
                                <td className="px-6 py-4">24</td>
                                <td className="px-6 py-4">16</td>
                                <td className="px-6 py-4">12</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Moulds</td>
                                <td className="px-6 py-4">100ML</td>
                                <td className="px-6 py-4">100ML/ 300+500ML</td>
                                <td className="px-6 py-4">300ML/ 300+500ML/ 1000ML</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Capacity / Hr</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">6700</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">4100</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">3000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Technical Specifications - SVP Table */}
            <div className="px-4 sm:px-8 lg:px-[8vw] mb-20 animate-section">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-bvm-blue pl-4">
                    Small Volume Parenterals (SVP)
                </h2>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left text-sm text-bvm-text-muted">
                        <thead className="bg-white/10 text-white uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">Units</th>
                                <th className="px-6 py-4">Respules</th>
                                <th className="px-6 py-4">WFI</th>
                                <th className="px-6 py-4">Eye Drops</th>
                                <th className="px-6 py-4">WFI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 bg-white/5">
                            {/* Model 3105 */}
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">MODEL 3105</td>
                                <td className="px-6 py-4">0.5ML</td>
                                <td className="px-6 py-4">3ML/ 5ML</td>
                                <td className="px-6 py-4">5ML/ 10ML</td>
                                <td className="px-6 py-4">5ML/ 10ML</td>
                                <td className="px-6 py-4">20ML/ 30ML</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Cavities</td>
                                <td className="px-6 py-4">30</td>
                                <td className="px-6 py-4">30</td>
                                <td className="px-6 py-4">25</td>
                                <td className="px-6 py-4">18</td>
                                <td className="px-6 py-4">18</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Moulds</td>
                                <td className="px-6 py-4">SINGLE</td>
                                <td className="px-6 py-4">COMBO</td>
                                <td className="px-6 py-4">COMBO</td>
                                <td className="px-6 py-4">COMBO</td>
                                <td className="px-6 py-4">COMBO</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Capacity / Hr</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">7500</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">7500</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">6500</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">4600</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">4600</td>
                            </tr>

                            {/* Model 9105 - Separator */}
                            <tr className="bg-white/10">
                                <td className="px-6 py-4 font-medium text-white">MODEL 9105</td>
                                <td className="px-6 py-4">DOUBLE</td>
                                <td className="px-6 py-4">DOUBLE COMBO</td>
                                <td className="px-6 py-4">DOUBLE COMBO</td>
                                <td className="px-6 py-4">DOUBLE COMBO</td>
                                <td className="px-6 py-4">DOUBLE COMBO</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Cavities</td>
                                <td className="px-6 py-4">60</td>
                                <td className="px-6 py-4">60</td>
                                <td className="px-6 py-4">50</td>
                                <td className="px-6 py-4">36</td>
                                <td className="px-6 py-4">36</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Capacity / Hr</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">15000</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">15000</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">13000</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">9200</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">9200</td>
                            </tr>

                            {/* Model 8166 */}
                            <tr className="bg-white/10">
                                <td className="px-6 py-4 font-medium text-white">MODEL 8166</td>
                                <td className="px-6 py-4">0.5ML</td>
                                <td className="px-6 py-4">3ML/ 5ML</td>
                                <td className="px-6 py-4">5ML/ 10ML</td>
                                <td className="px-6 py-4">5ML/ 10ML</td>
                                <td className="px-6 py-4">20ML/ 30ML</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Cavities</td>
                                <td className="px-6 py-4">50</td>
                                <td className="px-6 py-4">50</td>
                                <td className="px-6 py-4">40</td>
                                <td className="px-6 py-4">30</td>
                                <td className="px-6 py-4">30</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Capacity / Hr</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">13500</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">13500</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">11000</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">8000</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">8000</td>
                            </tr>

                            {/* Model 9166 */}
                            <tr className="bg-white/10">
                                <td className="px-6 py-4 font-medium text-white">MODEL 9166</td>
                                <td className="px-6 py-4">DOUBLE</td>
                                <td className="px-6 py-4">DOUBLE COMBO</td>
                                <td className="px-6 py-4">DOUBLE COMBO</td>
                                <td className="px-6 py-4">DOUBLE COMBO</td>
                                <td className="px-6 py-4">DOUBLE COMBO</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">Capacity / Hr</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">27000</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">27000</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">22000</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">16000</td>
                                <td className="px-6 py-4 text-bvm-blue font-bold">16000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-sm text-bvm-text-muted italic">
                    * Depending on model and mould/cavity configuration, hourly output ranges typically span from roughly 4,600 units/hour up to about 27,000 units/hour.
                </p>
            </div>

        </div>
    );
};

export default FFSPage;
