import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Layers, Zap, PenTool } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MouldsPage = () => {
    const mainRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.animate-card').forEach((card: any, i) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    }
                });
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const moulds = [
        {
            title: "Aluminium Bronze Moulds",
            description: "Premium material chosen for superior heat transfer, strength, and wear resistance. Ideal for high-speed FFS & BFS operations.",
            icon: <Box className="w-6 h-6" />,
            image: "/new_assets/optimized/mould-lvp.webp",
            features: ["Superior heat transfer (Faster cycle times)", "High corrosion resistance", "Excellent durability"]
        },
        {
            title: "Stavax (Stainless Tool Steel)",
            description: "High-grade stainless tool steel known for exceptional polishability. Recommended for sterile and hygienic pharmaceutical applications.",
            icon: <Layers className="w-6 h-6" />,
            image: "/products/pet-mould-100ml.jpg",
            features: ["Resistant to rust & chemicals", "High surface finish for clarity", "Strong dimensional stability"]
        },
        {
            title: "Custom Design & Development",
            description: "Complete customization for Bottles, Vials, and Ampoules. Our engineering team optimizes mould design for cycle time and quality.",
            icon: <Zap className="w-6 h-6" />,
            image: "/products/injection-mould.jpg",
            features: ["Reverse engineering capabilities", "Multi-cavity configurations", "Specialized neck & closure designs"]
        },
        {
            title: "Quality Assurance",
            description: "Every mould undergoes rigorous inspection for dimensional accuracy, leak-proof sealing, and smooth demoulding performance.",
            icon: <PenTool className="w-6 h-6" />,
            image: "/new_assets/optimized/mould-svp.webp",
            features: ["Strict dimensional validation", "Surface polishing options", "Long operational life"]
        }
    ];

    return (
        <div ref={mainRef} className="pt-24 pb-20 bg-bvm-navy min-h-screen">
            {/* Hero Section */}
            <div className="px-4 sm:px-8 lg:px-[8vw] mb-20 text-center">
                <span className="text-bvm-blue font-medium tracking-wider uppercase">Precision Tooling</span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                    Premium Quality <span className="text-bvm-blue">Moulds</span>
                </h1>
                <p className="text-xl text-bvm-gray max-w-2xl mx-auto leading-relaxed">
                    Engineered for performance and longevity. Our moulds deliver consistent product quality with minimal cycle times.
                </p>
            </div>

            {/* Moulds Grid */}
            <div className="px-4 sm:px-8 lg:px-[8vw] grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {moulds.map((mould, idx) => (
                    <div key={idx} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-bvm-blue/50 transition-all duration-300 animate-card">
                        <div className="h-64 overflow-hidden relative">
                            <div className="absolute inset-0 bg-bvm-navy/20 group-hover:bg-transparent transition-colors z-10" />
                            <img
                                src={mould.image}
                                alt={mould.title}
                                width={600}
                                height={256}
                                loading="lazy"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 right-4 bg-bvm-navy/80 p-3 rounded-lg backdrop-blur-sm z-20 text-bvm-blue border border-white/10">
                                {mould.icon}
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-white mb-3">{mould.title}</h3>
                            <p className="text-bvm-text-muted mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">
                                {mould.description}
                            </p>

                            <div className="space-y-3">
                                <h4 className="text-white/80 text-sm font-semibold uppercase tracking-wide">Key Features</h4>
                                <ul className="space-y-2">
                                    {mould.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2 text-bvm-text-muted text-sm">
                                            <span className="w-1.5 h-1.5 bg-bvm-blue rounded-full" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MouldsPage;
