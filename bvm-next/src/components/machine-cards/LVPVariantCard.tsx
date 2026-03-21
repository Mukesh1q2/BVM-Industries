'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Package, Maximize, Activity, Zap, DollarSign, Award, Gauge, ArrowRight } from 'lucide-react';
import type { LVPModel } from '@/types/machine';

const Badge = ({ text }: { text: string }) => {
    let bgColor = 'bg-bvm-blue/20 text-bvm-blue border-bvm-blue/30';
    let Icon = Gauge;
    if (text.toLowerCase().includes('fast')) {
        bgColor = 'bg-amber-500/20 text-amber-500 border-amber-500/30';
        Icon = Zap;
    } else if (text.toLowerCase().includes('cost')) {
        bgColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
        Icon = DollarSign;
    } else if (text.toLowerCase().includes('output') || text.toLowerCase().includes('large')) {
        bgColor = 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        Icon = Award;
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${bgColor}`}>
            <Icon className="w-3.5 h-3.5" />
            {text}
        </span>
    );
};

export default function LVPVariantCard({ model, machineSlug }: { model: LVPModel, machineSlug: string }) {
    const [activeVariant, setActiveVariant] = useState(model.variants[0]);

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col h-full hover:border-bvm-blue/50 transition-colors overflow-hidden">
            <div className="p-6 pb-2">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{model.modelNo}</h3>
                        <div className="flex items-center gap-3 text-bvm-gray text-sm">
                            <span className="flex items-center gap-1.5"><Package className="w-4 h-4" /> {model.cavity}</span>
                            <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" /> {model.volume}</span>
                        </div>
                    </div>
                    {model.badges?.map(b => <Badge key={b} text={b} />)}
                </div>

                {/* Variant Toggles */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {model.variants.map((variant) => (
                        <button
                            key={variant.type}
                            onClick={() => setActiveVariant(variant)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                                activeVariant.type === variant.type
                                    ? 'bg-bvm-blue text-white border-bvm-blue'
                                    : 'bg-transparent text-bvm-gray border-white/20 hover:border-white/40'
                            }`}
                        >
                            {variant.type}
                        </button>
                    ))}
                </div>

                {/* Output Display */}
                <div className="bg-black/30 rounded-xl p-5 border border-white/5 flex items-center justify-between mb-6">
                    <div>
                        <span className="block text-xs text-bvm-gray uppercase font-semibold tracking-wider mb-1">Daily Output</span>
                        <span className="text-bvm-blue font-bold text-3xl">{activeVariant.production}<span className="text-xl ml-1">{activeVariant.unit}</span></span>
                    </div>
                    <Activity className="w-8 h-8 text-white/20" />
                </div>
            </div>

            {/* Request Quote Button */}
            <div className="p-4 bg-bvm-blue/5 border-t border-bvm-blue/20 mt-auto flex justify-center hover:bg-bvm-blue/10 transition-colors group cursor-pointer">
                <Link 
                    href={`/quotation?model=${model.modelNo}&title=${machineSlug}`} 
                    className="text-bvm-blue hover:text-white font-semibold flex items-center gap-2 w-full justify-center transition-colors"
                >
                    Request Custom Quote <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
