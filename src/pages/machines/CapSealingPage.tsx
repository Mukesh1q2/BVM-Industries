import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Zap, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CapSealingPage = () => {
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
                <span className="text-bvm-blue font-medium tracking-wider uppercase">High-Speed Sealing</span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                    Euro Cap Sealing <span className="text-bvm-blue">400 Series</span>
                </h1>
                <p className="text-xl text-bvm-gray max-w-3xl leading-relaxed mb-8">
                    Precision engineered cap sealing solutions available in semi-auto and fully-auto configurations.
                    Designed for high repeatability and minimum manpower requirements.
                </p>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <span>Download 400 Series Specs</span>
                    <Zap className="w-4 h-4" />
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="px-4 sm:px-8 lg:px-[8vw] grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 animate-section">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Cpu className="text-bvm-blue" />
                        Basic Settings & Features
                    </h2>
                    <ul className="space-y-4 text-bvm-text-muted">
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Available in both Semi-auto and Fully-auto options</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Product range: 50ml, 100ml, 250/300ml, 500ml and 1000ml</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Operator friendly with full coloured touch screen display</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Requires minimum manpower</span>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                        <Zap className="text-bvm-blue" />
                        Technical Highlights
                    </h2>
                    <ul className="space-y-4 text-bvm-text-muted">
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Machine motions are Electrical Servo Motor controlled</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Latest Siemens PLC S7-1200 integration</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Servo shuttle for precision bottle pick & place</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Precision cap dispense mechanism</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Entire machine constructed in Stainless Steel</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                            <span>Highest repeatability in cap sealing process</span>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center justify-center animate-section">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-2 w-full max-w-lg relative overflow-hidden group">
                        <img
                            src="/new_assets/optimized/cap-sealing-machine.webp"
                            alt="Cap Sealing Machine"
                            width={600}
                            height={450}
                            loading="lazy"
                            className="w-full h-auto rounded-xl shadow-lg"
                        />
                    </div>
                </div>            </div>

            {/* Series Specifications Table */}
            <div className="px-4 sm:px-8 lg:px-[8vw] mb-20 animate-section">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-bvm-blue pl-4">
                    400 Series Specifications
                </h2>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left text-sm text-bvm-text-muted">
                        <thead className="bg-white/10 text-white uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Model</th>
                                <th className="px-6 py-4">Bottle Range (ml)</th>
                                <th className="px-6 py-4 text-right">Capacity / Hr</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 bg-white/5">
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">MODEL - 416</td>
                                <td className="px-6 py-4">50 / 100 / 300 / 500 / 1000</td>
                                <td className="px-6 py-4 text-right text-bvm-blue font-bold">2000</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">MODEL - 421</td>
                                <td className="px-6 py-4">50 / 100 / 300 / 500</td>
                                <td className="px-6 py-4 text-right text-bvm-blue font-bold">2500</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-white">MODEL - 420</td>
                                <td className="px-6 py-4">50 / 100</td>
                                <td className="px-6 py-4 text-right text-bvm-blue font-bold">3200</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CapSealingPage;
