'use client';

import React, { useState, useMemo } from 'react';
import { svpData, lvpData, capWeldingData } from '@/data/modelsData';
import { Search, Filter, ChevronDown, ChevronUp, Zap, DollarSign, Award, Gauge, Package, Settings, Maximize, Activity } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/sections/Footer';

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

const SVPCard = ({ model }: { model: typeof svpData[0] }) => {
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
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'} overflow-hidden bg-black/20`}>
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
            </div>
        </div>
    );
};

const LVPVariantCard = ({ model }: { model: typeof lvpData[0] }) => {
    const [activeVariant, setActiveVariant] = useState(model.variants[0]);

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-bvm-blue/50 transition-colors flex flex-col h-full">
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
            <div className="flex flex-wrap gap-2 mb-8">
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
            <div className="mt-auto bg-black/30 rounded-xl p-5 border border-white/5 flex items-center justify-between">
                <div>
                    <span className="block text-xs text-bvm-gray uppercase font-semibold tracking-wider mb-1">Daily Output</span>
                    <span className="text-bvm-blue font-bold text-3xl">{activeVariant.production}<span className="text-xl ml-1">{activeVariant.unit}</span></span>
                </div>
                <Activity className="w-8 h-8 text-white/20" />
            </div>
        </div>
    );
};

const CapWeldingCard = ({ model }: { model: typeof capWeldingData[0] }) => {
    const [activeMode, setActiveMode] = useState(model.modes[model.modes.length - 1]); // Default to highest automation

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-bvm-blue/50 transition-colors">
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{model.modelNo}</h3>
                    {model.badges?.map(b => <Badge key={b} text={b} />)}
                </div>
                <div className="text-sm font-medium text-bvm-gray flex items-center gap-2">
                    <Maximize className="w-4 h-4" /> Range: {model.capacityRange}
                </div>
            </div>

            {/* Mode Switches */}
            <div className="flex bg-black/40">
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

            {/* Output Display */}
            <div className="p-8 text-center bg-black/20">
                <span className="block text-xs text-bvm-gray uppercase font-semibold tracking-wider mb-2">Sealing Speed</span>
                <span className="text-white font-display font-bold text-5xl">
                    {activeMode.speed} <span className="text-2xl text-bvm-blue">{activeMode.unit}</span>
                </span>
            </div>
        </div>
    );
};

export default function ModelsExperimentPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'ALL' | 'SVP' | 'LVP' | 'CAP'>('ALL');

    const filteredSVP = useMemo(() => svpData.filter(m => m.modelNo.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery]);
    const filteredLVP = useMemo(() => lvpData.filter(m => m.modelNo.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery]);
    const filteredCap = useMemo(() => capWeldingData.filter(m => m.modelNo.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery]);

    return (
        <div className="min-h-screen bg-bvm-navy flex flex-col font-body">
            <Navigation />
            
            <main className="flex-1 pt-32 pb-24 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="text-bvm-blue font-medium tracking-wider uppercase mb-4 block">Experimental UI</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                            Interactive Model Explorer
                        </h1>
                        <p className="text-lg text-bvm-gray max-w-2xl mx-auto">
                            Switching from static spreadsheets to dynamic, variant-driven analytical cards for rapid model evaluation.
                        </p>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-16 sticky top-24 z-30 backdrop-blur-xl">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-[2]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-bvm-gray" />
                                <input 
                                    type="text" 
                                    placeholder="Search model number..." 
                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-bvm-blue transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            
                            {/* Tabs */}
                            <div className="flex bg-black/30 border border-white/10 rounded-xl p-1 flex-[3] overflow-x-auto no-scrollbar">
                                {['ALL', 'SVP', 'LVP', 'CAP'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={`flex-1 min-w-[100px] py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                            activeTab === tab ? 'bg-bvm-blue text-white shadow-lg' : 'text-bvm-gray hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {tab === 'CAP' ? 'Cap Welding' : tab}
                                    </button>
                                ))}
                            </div>

                            {/* Dropdowns (Visual Only for Layout Replica) */}
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 px-5 bg-black/30 border border-white/10 rounded-xl text-white/70 hover:bg-white/5 transition-colors whitespace-nowrap">
                                    <Filter className="w-4 h-4" /> Filters <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Modules Container */}
                    <div className="space-y-24">
                        
                        {/* SVP Section */}
                        {(activeTab === 'ALL' || activeTab === 'SVP') && filteredSVP.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-lg bg-bvm-blue/20 flex items-center justify-center">
                                        <Activity className="w-4 h-4 text-bvm-blue" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-white">SVP Performance Matrix</h2>
                                </div>
                                <div className="space-y-4">
                                    {filteredSVP.map(model => <SVPCard key={model.modelNo} model={model} />)}
                                </div>
                            </section>
                        )}

                        {/* LVP Section */}
                        {(activeTab === 'ALL' || activeTab === 'LVP') && filteredLVP.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                        <Maximize className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-white">LVP Variant Comparison</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredLVP.map(model => <LVPVariantCard key={model.modelNo} model={model} />)}
                                </div>
                            </section>
                        )}

                        {/* Cap Welding Section */}
                        {(activeTab === 'ALL' || activeTab === 'CAP') && filteredCap.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                        <Zap className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-white">Cap Welding Mode Switch</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {filteredCap.map(model => <CapWeldingCard key={model.modelNo} model={model} />)}
                                </div>
                            </section>
                        )}

                        {/* Empty State */}
                        {filteredSVP.length === 0 && filteredLVP.length === 0 && filteredCap.length === 0 && (
                            <div className="text-center py-24">
                                <Search className="w-12 h-12 text-white/10 mx-auto mb-4" />
                                <p className="text-xl text-bvm-gray">No models found for "{searchQuery}"</p>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
