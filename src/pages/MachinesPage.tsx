import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Filter } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const machineCategories = [
    {
        id: 'ffs',
        title: 'F.F.S Machines',
        subtitle: 'Form-Fill-Seal Systems',
        description: 'Fully indigenous, cost-effective aseptic filling systems for pharmaceutical liquids. Designed for sterility and performance.',
        image: '/new_assets/optimized/ffs-machine.webp',
        link: '/machines/ffs',
        categories: ['injectables', 'ophthalmic', 'respiratory']
    },
    {
        id: 'bfs',
        title: 'B.F.S Machines',
        subtitle: 'Blow-Fill-Seal Technology',
        description: 'Advanced cGMP compliant systems for continuous aseptic filling of small and large volume parenterals.',
        image: '/new_assets/optimized/bfs-machine.webp',
        link: '/machines/bfs',
        categories: ['injectables', 'ophthalmic', 'respiratory']
    },
    {
        id: 'cap-sealing',
        title: 'Euro Cap Sealing',
        subtitle: '400 Series Sealers',
        description: 'High-speed, servo-controlled cap sealing solutions with precision repeatablity for various bottle sizes.',
        image: '/new_assets/optimized/cap-sealing-machine.webp',
        link: '/machines/euro-cap-sealing',
        categories: ['oral', 'ophthalmic']
    }
];

const filters = [
    { id: 'all', label: 'All Applications' },
    { id: 'injectables', label: 'Injectables (LVP/SVP)' },
    { id: 'ophthalmic', label: 'Ophthalmic' },
    { id: 'respiratory', label: 'Respiratory' },
    { id: 'oral', label: 'Oral Liquids' }
];

const MachinesPage = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();
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
        setSearchParams(filterId === 'all' ? {} : { filter: filterId });
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation (only on first mount)
            gsap.from(headerRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    // Separate effect for card animations — runs on every filter change
    useLayoutEffect(() => {
        const cards = gsap.utils.toArray('.machine-card') as HTMLElement[];
        if (cards.length === 0) return;

        const ctx = gsap.context(() => {
            // Directly animate cards in (no ScrollTrigger) so they always become visible
            gsap.fromTo(cards,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    clearProps: "all" // Clean up inline styles after animation completes
                }
            );
        });

        return () => ctx.revert();
    }, [activeFilter]); // Re-run animation on filter change

    const filteredMachines = activeFilter === 'all'
        ? machineCategories
        : machineCategories.filter(m => m.categories.includes(activeFilter));

    return (
        <div className="pt-24 pb-20 bg-bvm-navy min-h-screen">
            {/* Header Section */}
            <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-12 px-4">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                    Advanced Pharmaceutical <span className="text-bvm-blue">Solutions</span>
                </h1>
                <p className="text-xl text-bvm-gray max-w-2xl mx-auto leading-relaxed">
                    Discover our range of precision machinery designed for aseptic integrity and high-speed performance.
                </p>
            </div>

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
            <div ref={categoriesRef} className="grid grid-cols-1 gap-12 px-4 sm:px-8 lg:px-[8vw]">
                {filteredMachines.length > 0 ? (
                    filteredMachines.map((category, index) => (
                        <div key={category.id} className={`machine-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-bvm-blue/50 transition-all duration-500`}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                {/* Image Section */}
                                <div className={`relative h-64 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <img src={category.image} alt={category.title} width={600} height={400} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                {/* Content Section */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {category.categories.map(cat => (
                                            <span key={cat} className="text-xs font-bold uppercase tracking-wider text-bvm-blue/80 bg-bvm-blue/10 px-2 py-1 rounded">
                                                {filters.find(f => f.id === cat)?.label}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-bvm-blue font-medium mb-2 block">{category.subtitle}</span>
                                    <h2 className="text-3xl font-display font-bold text-white mb-4">{category.title}</h2>
                                    <p className="text-bvm-text-muted text-lg mb-8 leading-relaxed">{category.description}</p>
                                    <Link to={category.link} className="inline-flex items-center gap-2 text-white bg-bvm-blue px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors self-start">
                                        Explore Features
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20">
                        <p className="text-bvm-gray text-lg">No machines found for this application.</p>
                        <button onClick={() => handleFilterChange('all')} className="text-bvm-blue mt-4 hover:underline">View All Machines</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MachinesPage;
