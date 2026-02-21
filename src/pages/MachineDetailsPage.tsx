import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { machines } from '../data/machines';
import SEO from '../components/SEO';
import RevealSection from '../components/RevealSection';
import Machine3DViewer from '../components/3d/Machine3DViewer';
import { ArrowRight, CheckCircle, Shield, Zap, Settings, Activity, Server, Droplet, Cpu } from 'lucide-react';

// Map icon strings to Lucide components
const iconMap: Record<string, any> = {
    Shield, Zap, Settings, Activity, Server, Droplet, CheckCircle, Cpu
};

const MachineDetailsPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const machine = machines.find(m => m.slug === slug);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!machine) {
        return <Navigate to="/machines" replace />;
    }

    return (
        <>
            <SEO
                title={machine.hero.title}
                description={machine.hero.description}
                image={machine.hero.image}
            />

            <div className="pt-24 pb-20 bg-bvm-navy min-h-screen">
                {/* Hero Section */}
                <RevealSection className="px-4 sm:px-8 lg:px-[8vw] mb-20">
                    <span className="text-bvm-blue font-medium tracking-wider uppercase">{machine.hero.subtitle}</span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                        {machine.hero.title.replace(machine.hero.highlight, '')}
                        <span className="text-bvm-blue">{machine.hero.highlight}</span>
                    </h1>
                    <p className="text-xl text-bvm-gray max-w-3xl leading-relaxed mb-8">
                        {machine.hero.description}
                    </p>
                    <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                        <span>{machine.hero.brochureText}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </RevealSection>

                {/* Main Content Grid */}
                <RevealSection className="px-4 sm:px-8 lg:px-[8vw] grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <div>
                        {machine.features.map((feature, idx) => {
                            const Icon = iconMap[feature.icon] || CheckCircle;
                            return (
                                <div key={idx} className={idx > 0 ? "mt-12" : ""}>
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                        <Icon className="text-bvm-blue" />
                                        {feature.title}
                                    </h2>
                                    <ul className="space-y-4 text-bvm-text-muted">
                                        {feature.items.map((item, i) => (
                                            <li key={i} className="flex gap-3">
                                                <CheckCircle className="w-5 h-5 text-bvm-blue shrink-0 mt-1" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>

                    <RevealSection className="space-y-8" delay={200}>
                        <Machine3DViewer />

                        {machine.processCapabilities && (
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-white mb-6">{machine.processCapabilities.title}</h3>
                                <div className="space-y-6">
                                    {machine.processCapabilities.items.map((item, idx) => {
                                        const ItemIcon = iconMap[item.icon] || Activity;
                                        return (
                                            <div key={idx}>
                                                <div className="flex items-center gap-3 mb-2 text-bvm-blue">
                                                    <ItemIcon className="w-5 h-5" />
                                                    <span className="font-semibold text-white">{item.title}</span>
                                                </div>
                                                <p
                                                    className="text-bvm-text-muted pl-8"
                                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {machine.constructionStandards && (
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-white mb-6">{machine.constructionStandards.title}</h3>
                                <p
                                    className="text-bvm-text-muted leading-relaxed mb-4"
                                    dangerouslySetInnerHTML={{ __html: machine.constructionStandards.description }}
                                />
                            </div>
                        )}
                    </RevealSection>
                </RevealSection>

                {/* Specifications Tables */}
                {machine.specTables.map((table, tblIdx) => (
                    <RevealSection key={tblIdx} className="px-4 sm:px-8 lg:px-[8vw] mb-20">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-bvm-blue pl-4">
                            {table.title}
                        </h2>
                        <div className="overflow-x-auto rounded-xl border border-white/10">
                            <table className="w-full text-left text-sm text-bvm-text-muted">
                                <thead className="bg-white/10 text-white uppercase text-xs font-semibold">
                                    <tr>
                                        {table.headers.map((header, hIdx) => (
                                            <th key={hIdx} className={`px-6 py-4 ${hIdx > 0 ? 'text-center' : ''}`}>{header.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 bg-white/5">
                                    {table.rows.map((row, rIdx) => (
                                        <tr key={rIdx} className={row.model.startsWith('MODEL') ? 'bg-white/5' : ''}>
                                            <td className="px-6 py-4 font-medium text-white">{row.model}</td>
                                            {table.headers.slice(1).map((header, dIdx) => (
                                                <td key={dIdx} className={`px-6 py-4 text-center ${row.isHighlight ? 'text-bvm-blue font-bold' : ''}`}>
                                                    {row.data[header.key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {table.note && (
                            <p className="mt-4 text-sm text-bvm-text-muted italic">
                                {table.note}
                            </p>
                        )}
                    </RevealSection>
                ))}

                <div className="px-4 sm:px-8 lg:px-[8vw] mb-12 flex justify-center">
                    <Link to="/machines" className="text-bvm-blue hover:text-white transition-colors flex items-center gap-2 font-medium">
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        Back to All Machines
                    </Link>
                </div>
            </div>
        </>
    );
};

export default MachineDetailsPage;
