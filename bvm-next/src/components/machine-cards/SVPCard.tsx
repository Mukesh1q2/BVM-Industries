'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Zap, DollarSign, Award, Gauge, Package, Settings, ArrowRight } from 'lucide-react';
import type { SVPModel } from '@/types/machine';

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

const MiniBarGraph = ({ value, max }: { value: number, max: number }) => {
    const percentage = Math.min(100, Math.max(10, (value / max) * 100));
    return (
        <div className="flex items-center gap-4 w-full max-w-[200px]">
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-bvm-blue to-blue-400 rounded-full" 
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default function SVPCard({ model, machineSlug }: { model: SVPModel, machineSlug: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const maxProd = Math.max(...model.performance.map(p => p.production));

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-bvm-blue/50 transition-colors">
            {/* Header */}
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{model.modelNo}</h3>
                        {model.badges?.map(b => <Badge key={b} text={b} />)}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-bvm-gray text-sm font-medium">
                        <span className="flex items-center gap-1.5"><Package className="w-4 h-4" /> {model.cavity}</span>
                        <span className="flex items-center gap-1.5"><Settings className="w-4 h-4" /> {model.stationDetails}</span>
                    </div>
                </div>
                
                <button className="flex items-center gap-2 px-5 py-2.5 bg-bvm-blue/10 text-bvm-blue border border-bvm-blue/30 rounded-lg hover:bg-bvm-blue hover:text-white transition-colors self-start md:self-auto font-medium">
                    View Performance
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>

            {/* Expandable Body */}
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'} overflow-hidden bg-black/20`}>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-[100px_1fr_120px] gap-4 text-xs font-semibold text-bvm-gray uppercase tracking-wider mb-2">
                        <div>Volume</div>
                        <div>Output Benchmark</div>
                        <div className="text-right">Prod / Day</div>
                    </div>
                    {model.performance.map((perf, idx) => (
                        <div key={idx} className="grid grid-cols-[100px_1fr_120px] gap-4 items-center py-2 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors">
                            <span className="text-white font-medium">{perf.volume}</span>
                            <MiniBarGraph value={perf.production} max={maxProd + 1} />
                            <span className="text-right text-bvm-blue font-bold text-lg">{perf.production} {perf.unit}</span>
                        </div>
                    ))}
                </div>
                
                {/* Quotation Flywheel Integration */}
                <div className="p-4 bg-bvm-blue/5 border-t border-bvm-blue/20 flex justify-end">
                    <Link 
                        href={`/quotation?model=${model.modelNo}&title=${machineSlug}`} 
                        className="text-bvm-blue hover:text-white font-semibold flex items-center gap-2 transition-colors group"
                    >
                        Request Official Quote <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
