'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Maximize, Zap, DollarSign, Award, Gauge, ArrowRight } from 'lucide-react';
import type { CapWeldingModel } from '@/types/machine';

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


export default function CapWeldingCard({ model, machineSlug }: { model: CapWeldingModel, machineSlug: string }) {
    const [activeMode, setActiveMode] = useState(model.modes[model.modes.length - 1]); // Default to highest automation

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-bvm-blue/50 transition-colors flex flex-col h-full">
            <div className="p-6 border-b border-white/10 flex-1">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{model.modelNo}</h3>
                    {model.badges?.map(b => <Badge key={b} text={b} />)}
                </div>
                <div className="text-sm font-medium text-bvm-gray flex items-center gap-2 mb-6">
                    <Maximize className="w-4 h-4" /> Range: {model.capacityRange}
                </div>

                {/* Output Display */}
                <div className="p-8 text-center bg-black/20 rounded-xl border border-white/5">
                    <span className="block text-xs text-bvm-gray uppercase font-semibold tracking-wider mb-2">Sealing Speed</span>
                    <span className="text-white font-display font-bold text-5xl">
                        {activeMode.speed} <span className="text-2xl text-bvm-blue">{activeMode.unit}</span>
                    </span>
                </div>
            </div>

            {/* Mode Switches */}
            <div className="flex bg-black/40 border-t border-white/10">
                {model.modes.map((mode) => (
                    <button
                        key={mode.mode}
                        onClick={() => setActiveMode(mode)}
                        className={`flex-1 py-4 text-sm font-semibold transition-colors border-b-2 ${
                            activeMode.mode === mode.mode
                                ? 'bg-bvm-blue/10 text-bvm-blue border-bvm-blue'
                                : 'text-bvm-gray border-transparent hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        {mode.mode}
                    </button>
                ))}
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
